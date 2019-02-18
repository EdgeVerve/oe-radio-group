/**
 * @license
 * ©2018-2019 EdgeVerve Systems Limited (a fully owned Infosys subsidiary),
 * Bangalore, India. All Rights Reserved.
 */
import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import "@polymer/paper-radio-group/paper-radio-group.js";
import "@polymer/paper-radio-button/paper-radio-button.js";
import "@polymer/paper-input/paper-input-container.js";
import "@polymer/paper-input/paper-input-error.js";
import '@polymer/polymer/lib/elements/dom-repeat.js';
import { OEFieldMixin } from "oe-mixins/oe-field-mixin.js";
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { PaperInputBehavior } from '@polymer/paper-input/paper-input-behavior';
import { IronFormElementBehavior } from '@polymer/iron-form-element-behavior/iron-form-element-behavior';

/**
 * #oe-radio-group
 * A wrapper over `paper-radio-group` that auto-generates the underlying `paper-radio-button`s based on `choices` provided
 *
 * @customElement
 * @polymer
 * @appliesMixin OEFieldMixin
 * @demo demo/index.html
 */
class OeRadioGroup extends mixinBehaviors([IronFormElementBehavior, PaperInputBehavior], PolymerElement) {
  static get is() { return "oe-radio-group"; }
  static get template() {
    return html`
        <style>
          :host {
            display: block;
            --paper-radio-group-item-padding: 2px;
            --paper-input-container-underline: {
              display: none;
            }
            --paper-input-container-underline-focus: {
              display: none;
            }
            --paper-input-container-underline-disabled: {
              display: none;
            }
          }

          paper-radio-button {
            padding-right: var(--oe-radio-group-right-padding,12px);
          }

          span.required {
            color: var(--paper-input-container-invalid-color, --paper-deep-orange-a700);
          }

        </style>

        <paper-input-container always-float-label attr-for-value="selected">
          <label slot="label" hidden$="[[!label]]">
              <oe-i18n-msg msgid=[[label]]>[[label]]</oe-i18n-msg>
              <template is="dom-if" if={{required}}><span class="required"> *</span></template>
          </label>

          <paper-radio-group slot="input" class="paper-input-input" id="[[_inputId]]" disabled=[[disabled]] selected="{{value}}" attr-for-selected="x">
            <template is="dom-repeat" items={{listdata}}>
                <paper-radio-button x="[[_getValue(item)]]" disabled=[[disabled]]>
                  <oe-i18n-msg msgid=[[_getDisplay(item)]]>[[_getDisplay(item)]]</oe-i18n-msg>
                </paper-radio-button>
              </template>
          </paper-radio-group>
          <paper-input-error invalid={{invalid}} slot="add-on">
            <oe-i18n-msg id="i18n-error" msgid={{errorMessage}} placeholders={{placeholders}}></oe-i18n-msg>
          </paper-input-error>
        </paper-input-container>
    `;
  }

  static get properties() {
    return {
      /**
       * value, this control is bound to.
       */
      value: {
        type: Object,
        notify: true
      },

      /**
       * listdata to display as radio-button.
       * * When specified as array of premitives (string/number), leave displayproperty and valueproperty as undefined.
       * * When specified as array of Objects/{d:...,v:...}, specify displayproperty to control which property is displayed as label on the choices. When  valueproperty is not defined, enire member object is set as `value`, otherwise specified property reflects into `value`.
       */
      listdata: {
        type: Array,
        notify: true
      },

      /**
       * When `choice` is specified as array of Objects/{d:...,v:...}, displayproperty controls which property is displayed as label on the choices.
       */
      displayproperty: {
        type: String
      },

      /**
       * When `choice` is specified as array of Objects/{d:...,v:...}
       * * If valueproperty is not defined, enire member object is set as `value`,
       * * otherwise specified `valueproperty` reflects into `value`.
       */
      valueproperty: {
        type: String
      }
    };
  }

  constructor() {
    super();
    this.addEventListener('paper-radio-group-changed', this.validate.bind(this));
  }

  _validate() {
    if (this.required && this.value === undefined) {
      this.setValidity(false, 'valueMissing');
    } else {
      this.setValidity(true, undefined);
    }
    return true;
  }

  _getValue(choice) {
    var ret = choice;
    if (choice && this.valueproperty) {
      ret = choice[this.valueproperty];
    }
    return ret;
  }

  _getDisplay(choice) {
    var ret = choice;
    if (choice && this.displayproperty) {
      ret = choice[this.displayproperty];
    }
    return ret;
  }

}

window.customElements.define(OeRadioGroup.is, OEFieldMixin(OeRadioGroup));
