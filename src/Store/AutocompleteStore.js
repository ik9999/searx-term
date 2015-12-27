import alt from '../Alt.js';
import actionCreators from '../Actions/AutocompleteActions.js';

export default alt.createStore({
  displayName: 'AutocompleteStore',
  bindListeners: {
    onGetSuggestions: actionCreators.getSuggestions
  },
  state: {
    suggestions: [],
    query: '',
    error: false,
    initial: true
  },
  onGetSuggestions(requestResult) {
    let newState = {
      query: requestResult.query
    };
    if (this.state.initial) {
      this.state.initial = false;
    }
    if (!requestResult.error) {
      newState.results = requestResult.results;
      newState.error = false;
    } else {
      newState.error = true;
    }
    this.setState(newState);
  }
});

