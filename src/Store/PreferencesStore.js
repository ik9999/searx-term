import alt from '../Alt.js';
import actionCreators from '../Actions/PreferencesActions.js';
import defaultPrefs from '../Constants/DefaultPreferences.js';
import * as SafeSearchStatus from '../Constants/SafeSearchStatus.js';

export default alt.createStore({
  displayName: 'PreferencesStore',
  bindListeners: {
    onLoadPreferences: actionCreators.loadPreferences,
    onSavePreferences: actionCreators.savePreferences,
    onUpdatePreferences: actionCreators.updatePreferences
  },
  state: {
    savedToFile: false,
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
      savedToFile: true,
      instance: (jsonFileData.instance) ? jsonFileData.instance : defaultPrefs.instance,
      enginesStr: (jsonFileData.engines) ? jsonFileData.engines : defaultPrefs.engines,
      enableAutocomplete: (jsonFileData.autocomplete) ? jsonFileData.autocomplete : defaultPrefs.autocomplete,
      autocompleteSourceStr: (jsonFileData.autocomplete_source) ? jsonFileData.autocomplete_source : defaultPrefs.autocomplete_source,
      safeSearchStatus: (safeSearchStatusCorrect) ? jsonFileData.safesearch : defaultPrefs.safesearch
    };
    this.setState(newState);
  },
  onSavePreferences() {
    this.setState({savedToFile: true});
  },
  onUpdatePreferences(newData) {
    this.setState(Object.assign(this.state, newData));
    actionCreators.savePreferences.defer({
      instance: this.state.instance,
      engines: this.state.enginesStr,
      autocomplete: this.state.enableAutocomplete,
      autocomplete_source: this.state.autocompleteSourceStr,
      safesearch: this.state.safeSearchStatus
    });
  }
});
