import alt from '../Alt.js';
import actionCreators from '../Actions/PreferencesActions.js';
import defaultPrefs from '../Constants/DefaultPreferences.js';
import * as SafeSearchStatus from '../Constants/SafeSearchStatus.js';

export default alt.createStore({
  displayName: 'PreferencesStore',
  bindListeners: {
    onLoadPreferences: actionCreators.loadPreferences
  },
  state: {
    instance: '',
    enginesStr: '',
    enableAutocomplete: null,
    autocompleteSourceStr: '',
    safeSearchStatus: ''
  },
  onLoadPreferences(jsonFileData) {
    if (jsonFileData === null || typeof jsonFileData !== 'object') {
      jsonFileData = {};
    }
    let safeSearchStatusCorrect = jsonFileData.safesearch && Object.keys(SafeSearchStatus).indexOf(jsonFileData.safesearch) > -1;
    let newState = {
      instance: (jsonFileData.instance) ? jsonFileData.instance : defaultPrefs.instance,
      enginesStr: (jsonFileData.engines) ? jsonFileData.engines : defaultPrefs.engines,
      enableAutocomplete: (jsonFileData.autocomplete) ? jsonFileData.autocomplete : defaultPrefs.autocomplete,
      autocompleteSourceStr: (jsonFileData.autocomplete_source) ? jsonFileData.autocomplete_source : defaultPrefs.autocomplete_source,
      safeSearchStatus: (safeSearchStatusCorrect) ? jsonFileData.safesearch : defaultPrefs.safesearch
    };
    this.setState(newState);
  }
});
