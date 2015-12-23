import alt from '../Alt.js';
import actionCreators from '../Actions/PreferencesActions.js';
import defaultPrefs from '../Constants/DefaultPreferences.js';
import * as SafeSearchStatus from '../Constants/SafeSearchStatus.js';

let checkSaveSearchStatus = value => {
  return value && Object.keys(SafeSearchStatus).indexOf(value) > -1;
};

let checkSearchResultWidth = value => {
  let searchResultsWidthCorrect = false;
  let searchResultsWidthInt;
  if (value) {
    searchResultsWidthInt = parseInt(value, 10);
    if (!Number.isNaN(searchResultsWidthInt) && searchResultsWidthInt >= 0 && searchResultsWidthInt <= 100) {
      searchResultsWidthCorrect = true;
    }
  }
  return searchResultsWidthCorrect;
};

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
    safeSearchStatus: '',
    searchResultsWidthPercents: ''
  },
  onLoadPreferences(jsonFileData) {
    if (jsonFileData === null || typeof jsonFileData !== 'object') {
      jsonFileData = {};
    }
    let searchResultsWidthPercents = defaultPrefs.search_results_width_prc;
    if (checkSearchResultWidth(jsonFileData.search_results_width_prc)) {
      searchResultsWidthPercents = parseInt(jsonFileData.search_results_width_prc, 10);
    }

    let newState = {
      savedToFile: true,
      instance: (jsonFileData.instance) ? jsonFileData.instance : defaultPrefs.instance,
      enginesStr: (jsonFileData.engines) ? jsonFileData.engines : defaultPrefs.engines,
      enableAutocomplete: (jsonFileData.autocomplete) ? jsonFileData.autocomplete : defaultPrefs.autocomplete,
      autocompleteSourceStr: (jsonFileData.autocomplete_source) ? jsonFileData.autocomplete_source : defaultPrefs.autocomplete_source,
      safeSearchStatus: checkSaveSearchStatus(jsonFileData.safesearch) ? jsonFileData.safesearch : defaultPrefs.safesearch,
      searchResultsWidthPercents
    };
    this.setState(newState);
  },
  onSavePreferences() {
    this.setState({savedToFile: true});
  },
  onUpdatePreferences(newData) {
    if (checkSearchResultWidth(newData.searchResultsWidthPercents)) {
      newData.searchResultsWidthPercents = parseInt(newData.searchResultsWidthPercents, 10);
    } else {
      newData.searchResultsWidthPercents = defaultPrefs.search_results_width_prc;
    }

    this.setState(Object.assign(this.state, newData));
    actionCreators.savePreferences.defer({
      instance: this.state.instance,
      engines: this.state.enginesStr,
      autocomplete: this.state.enableAutocomplete,
      autocomplete_source: this.state.autocompleteSourceStr,
      safesearch: checkSaveSearchStatus(this.state.safeSearchStatus) ? this.state.safeSearchStatus : defaultPrefs.safesearch,
      searchResultsWidthPercents: this.state.searchResultsWidthPercents
    });
  }
});
