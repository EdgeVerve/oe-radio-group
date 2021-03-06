/* eslint-disable no-unused-vars*/

function validate() {
  document.getElementById('inputForValidation').validate();
}

function clearInput() {
  document.getElementById('inputWithButton').value = '';
}

function showDatePicker() {
  var dlg = document.getElementById('_dlg');
  dlg.open();
}

function dateIncrementValue() {
  var elem = document.getElementById('evdate');

  var value = new Date(elem.value);
  value.setDate(value.getDate() + 1);
  elem.set('value', value);
}

function dateSetText() {
  var elem = document.getElementById('evdate');
  elem.$.display.set('value', '5m');
  elem.inputElement.fire('change');
}

function decIncrementValue() {
  var elem = document.getElementById('evdec');
  elem.value += 100;
}

function decSetText() {
  var elem = document.getElementById('evdec');
  elem.set('value', '23232.545');
  elem.$.input.fire('change');
}

//var dummy = document.createElement('ev-hbox');
//document.body.appendChild(dummy);

function showSuccess() {
  var event = new CustomEvent('ev-show-success', {
    detail: 'Saved Successfully!'
  });
  window.dispatchEvent(event);
  //dummy.fire('ev-show-success', 'Saved Successfully!');
}

function showMessage() {
  var event = new CustomEvent('ev-show-message', {
    detail: 'Hello World!'
  });
  window.dispatchEvent(event);
  //dummy.fire('ev-show-message', 'Hello World!');
}

function showWarning() {
  var event = new CustomEvent('ev-show-warning', {
    detail: 'This is a warning message!'
  });
  window.dispatchEvent(event);
  //dummy.fire('ev-show-warning', 'This is a warning message!');
}

function showError() {
  var event = new CustomEvent('ev-show-error', {
    detail: 'Oh snap! something is terribly wrong here'
  });
  window.dispatchEvent(event);
  //dummy.fire('ev-show-error', 'Oh snap! something is terribly wrong here');
}


function showMessageForever() {
  var event = new CustomEvent('ev-show-message', {
    detail: {
      forever: true,
      message: 'This message stays forever!'
    }
  });
  window.dispatchEvent(event);
  //dummy.fire('ev-show-message', 'Hello World!');
}

function okPressed(evt) { // eslint-disable-line  no-unused-vars
  var event = new CustomEvent('ev-show-message', {
    detail: 'Great! Lets get started.'
  });
  window.dispatchEvent(event);
}

function cancelPressed(evt) { // eslint-disable-line  no-unused-vars
  var event = new CustomEvent('ev-show-warning', {
    detail: 'No problem, may be some other time!'
  });
  window.dispatchEvent(event);
}

function getConfirmation() {
  var event = new CustomEvent('ev-show-confirm', {
    detail: {
      message: 'Are you sure?',
      ok: okPressed,
      cancel: cancelPressed
    }
  });
  window.dispatchEvent(event);
}

function demoTranslatedMessage() {
  var event = new CustomEvent('ev-show-message', {
    detail: 'valueMissing'
  });
  window.dispatchEvent(event);
  //dummy.fire('ev-show-message', 'valueMissing');
}

function demoTranslationFallback() {
  var event = new CustomEvent('ev-show-message', {
    detail: {
      code: 'invalid-credentials',
      message: 'Fallback message for Invalid Credentials'
    }
  });
  window.dispatchEvent(event);
  //dummy.fire('ev-show-message', {code:'invalid-credentials',message:'Fallback message for Invalid Credentials'});
}

document.addEventListener('HTMLImportsLoaded', function () {
  if (typeof I18nMsg !== 'undefined') {
    I18nMsg.lang = window.navigator.userLanguage || window.navigator.language || 'en';
    Platform.performMicrotaskCheckpoint();
  }

  var selector = document.querySelector('#languageSelector');
  selector && selector.addEventListener('change', function () {
    I18nMsg.lang = this.value;
    Platform.performMicrotaskCheckpoint();
  });
});

window.addEventListener('WebComponentsReady', function () {

  var OEUtils = OEUtils || {};

  /* For Demo Application, Override getMetadataUrl to return static data */
  if (OEUtils && OEUtils.ComponentFactory && OEUtils.ComponentFactory.getMetadataUrl) {
    OEUtils.ComponentFactory.getMetadataUrl = function (metaName) {
      return 'data/' + metaName + '-metadata.json';
    };
  }

  if (OEUtils && OEUtils.geturl) {
    OEUtils.geturl = function (url) {
      return url;
    };
  }
});
