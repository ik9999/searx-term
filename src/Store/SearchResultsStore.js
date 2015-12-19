import alt from '../Alt.js';
import actionCreators from '../Actions/SearchActions.js';

export default alt.createStore({
  displayName: 'SearchResultsStore',
  bindListeners: {
    onPerformSearch: actionCreators.performSearch
  },
  state: {
    query: '',
    results: [],
    error: false,
    initial: true
  },
  onPerformSearch(requestResult) {
    let newState = {
      query: requestResult.query
    };
    if (this.state.initial) {
      this.state.initial = false;
    }
    if (!requestResult.error) {
      let results = [];
      requestResult.results.forEach(resultInfo => {
        results.push({
          engine: resultInfo.engine,
          engines: resultInfo.engines,
          title: resultInfo.title,
          url: resultInfo.url,
          prettyUrl: resultInfo.pretty_url,
          content: resultInfo.content
        });
      });
      newState.results = results;
    } else {
      newState.error = true;
    }
    this.setState(newState);
  }
});
