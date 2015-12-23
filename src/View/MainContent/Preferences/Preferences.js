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
  let labelTitles = [
    'Instance url',
    'Engines(comma-separated)',
    'Enable autocomplete',
    'Autocomplete source',
    'Safe search',
    'Search result width(in percents)'
  ];
  let labelsList = [];
  let inputsList = [];
  let controlsList = [];
  let textControlsIndexes = [0, 1, 3, 5];
  let textInputsIndexes = [0, 1, 3, 7];
  let controlsOffsets = [0, 3, 7, 9, 13, 15, 18];
  let labelWidth = 35;

  let offsetTop = 1;
  labelTitles.forEach(labelStr => {
    labelsList.push(createLabel(form, labelStr, offsetTop, labelWidth));
    offsetTop += 3;
  });
  textControlsIndexes.forEach((textControlIndex, _index) => {
    controlsList[textControlIndex] = createTextField(form, controlsOffsets[textControlIndex], labelWidth + 5);
    inputsList[textInputsIndexes[_index]] = controlsList[textControlIndex];
  });

  controlsList[2] = createSingleCheckbox(form, controlsOffsets[2], labelWidth + 5);
  inputsList[2] = controlsList[2];

  let safeSearchRadioSet = createSafeSearchRadioSet(form, controlsOffsets[4], labelWidth + 5);
  let firstRadioIdx = 4;
  safeSearchRadioSet.children.forEach(radioButton => {
    inputsList[firstRadioIdx] = radioButton;
    firstRadioIdx += 1;
  });

  let saveButton = createSaveButton(form, controlsOffsets[controlsOffsets.length - 1], labelWidth + 5);
  inputsList.push(saveButton);

  let focusedInputIdx = 0;
  let onTabKey = () => {
    focusedInputIdx += 1;
    if (focusedInputIdx > inputsList.length - 1) {
      focusedInputIdx = 0;
    }
    form.screen.debug(Object.keys(inputsList));
    inputsList[focusedInputIdx].focus();
    inputsList[0]._updateCursor();
    form.screen.render();
  };
  let onShiftTabKey = () => {
    focusedInputIdx -= 1;
    if (focusedInputIdx < 0) {
      focusedInputIdx = inputsList.length - 1;
    }
    inputsList[focusedInputIdx].focus();
    inputsList[0]._updateCursor();
    form.screen.render();
  };
  inputsList.forEach(input => {
    input.key('S-tab', onShiftTabKey);
    input.key('tab', onTabKey);
  });

  let inputsObject = {
    'instance': {
      label: labelsList[0],
      control: controlsList[0]
    },
    'engines': {
      label: labelsList[1],
      control: controlsList[1]
    },
    'enableAutocomplete': {
      label: labelsList[2],
      control: controlsList[2]
    },
    'autocompleteSource': {
      label: labelsList[3],
      control: controlsList[3]
    },
    'safeSearchStatus': {
      label: labelsList[4],
      control: safeSearchRadioSet
    },
    'searchResultsWidthPercents': {
      label: labelsList[5],
      control: controlsList[5]
    }
  };

  stores.ApplicationStore.listen(state => {
    if (state.mainContentChanged && state.currentMainContent === MainContentName.PREFERENCES) {
      inputsObject.instance.control.focus();
    }
  });
  stores.PreferencesStore.listen(state => {
    inputsObject.instance.control.textBuf.setText(state.instance);
    inputsObject.engines.control.textBuf.setText(state.enginesStr);
    inputsObject.autocompleteSource.control.textBuf.setText(state.autocompleteSourceStr);
    form.screen.debug(state);
    inputsObject.searchResultsWidthPercents.control.textBuf.setText(String(state.searchResultsWidthPercents));
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
      searchResultsWidthPercents: inputsObject.searchResultsWidthPercents.control.textBuf.getText(),
      safeSearchStatus
    });
    ApplicationActions.changeMainContent(MainContentName.STARTING);
  });
  return preferencesContainer;
};
