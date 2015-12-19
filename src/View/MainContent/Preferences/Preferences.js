import * as MainContentName from '../../../Constants/MainContentName.js';
import defaultPrefs from '../../../Constants/DefaultPreferences.js';
import PreferencesActions from '../../../Actions/PreferencesActions.js';
import ApplicationActions from '../../../Actions/ApplicationActions.js';
import createTextField from './TextField.js';
import createPropertiesContainer from './Container.js';
import createForm from './Form.js';
import createLabel from './Label.js';
import createSingleCheckbox from './SingleCheckbox.js';
import createSafeSearchRadioSet from './SafeSearchRadioSet.js';
import createSaveButton from './SaveButton.js';

export default (windowBox, stores) => {
  let preferencesContainer = createPropertiesContainer(windowBox);
  let form = createForm(preferencesContainer);
  let labelTitles = ['Instance url', 'Engines(comma-separated)', 'Enable autocomplete', 'Autocomplete source', 'Safe search'];
  let labelsSequence = [];
  let inputsSequence = [];
  let textFieldsIndexes = [0, 1, 3];
  let fieldsOffsets = [0, 3, 7, 9, 13, 16];
  let focusedInputIdx = 0;
  let onTabKey = () => {
    focusedInputIdx += 1;
    if (focusedInputIdx > inputsSequence.length - 1) {
      focusedInputIdx = 0;
    }
    inputsSequence[focusedInputIdx].focus();
    inputsSequence[0]._updateCursor();
    form.screen.render();
  };
  let onShiftTabKey = () => {
    focusedInputIdx -= 1;
    if (focusedInputIdx < 0) {
      focusedInputIdx = inputsSequence.length - 1;
    }
    inputsSequence[focusedInputIdx].focus();
    inputsSequence[0]._updateCursor();
    form.screen.render();
  };
  stores.PreferencesStore.listen(state => {
    inputsSequence[0].textBuf.setText(state.instance);
    windowBox.screen.render();
  });

  let offsetTop = 1;
  labelTitles.forEach(labelStr => {
    labelsSequence.push(createLabel(form, labelStr, offsetTop));
    offsetTop += 3;
  });
  textFieldsIndexes.forEach((textFieldIndex, index) => {
    inputsSequence[textFieldIndex] = createTextField(form, fieldsOffsets[textFieldIndex]);
  });
  inputsSequence[2] = createSingleCheckbox(form, fieldsOffsets[2]);
  let safeSearchRadioSet = createSafeSearchRadioSet(form, fieldsOffsets[4]);
  safeSearchRadioSet.children.forEach(radioButton => {
    inputsSequence.push(radioButton);
  });
  let saveButton = createSaveButton(form, fieldsOffsets[5]);
  inputsSequence.push(saveButton);
  inputsSequence.forEach(input => {
    input.key('S-tab', onShiftTabKey);
    input.key('tab', onTabKey);
  });

  let inputsObject = {
    'instance': {
      label: labelsSequence[0],
      control: inputsSequence[0]
    },
    'engines': {
      label: labelsSequence[1],
      control: inputsSequence[1]
    },
    'enableAutocomplete': {
      label: labelsSequence[2],
      control: inputsSequence[2]
    },
    'autocompleteSource': {
      label: labelsSequence[3],
      control: inputsSequence[3]
    },
    'safeSearchStatus': {
      label: labelsSequence[4],
      control: safeSearchRadioSet
    }
  };

  stores.ApplicationStore.listen(state => {
    if (state.currentMainContent === MainContentName.PREFERENCES) {
      inputsObject.instance.control.focus();
    }
  });
  stores.PreferencesStore.listen(state => {
    inputsObject.instance.control.textBuf.setText(state.instance);
    inputsObject.engines.control.textBuf.setText(state.enginesStr);
    inputsObject.autocompleteSource.control.textBuf.setText(state.autocompleteSourceStr);
    if (state.enableAutocomplete) {
      inputsObject.enableAutocomplete.control.check();
    } else {
      inputsObject.enableAutocomplete.control.uncheck();
    }
    let safeSearchRadioButtons = inputsObject.safeSearchStatus.control.children;
    safeSearchRadioButtons.forEach(radioButton => {
      if (radioButton.name === state.safeSearchStatus) {
        radioButton.check();
      }
    });
  });
  saveButton.on('press', () => {
    let enableAutocomplete = false;
    if (inputsObject.enableAutocomplete.control.checked) {
      enableAutocomplete = true;
    }
    let safeSearchStatus = defaultPrefs.safesearch;
    let safeSearchRadioButtons = inputsObject.safeSearchStatus.control.children;
    safeSearchRadioButtons.forEach(radioButton => {
      if (radioButton.checked) {
        safeSearchStatus = radioButton.name;
      }
    });
    PreferencesActions.updatePreferences({
      instance: inputsObject.instance.control.textBuf.getText(),
      enginesStr: inputsObject.engines.control.textBuf.getText(),
      enableAutocomplete,
      autocompleteSourceStr: inputsObject.autocompleteSource.control.textBuf.getText(),
      safeSearchStatus
    });
    ApplicationActions.changeMainContent(MainContentName.STARTING);
  });
  return preferencesContainer;
};
