import alt from '../Alt.js';
import actionCreators from '../Actions/SearchActions.js';

export default alt.createStore({
  displayName: 'SearchResultsStore',
  bindListeners: {
    onPerformSearch: actionCreators.performSearch
  },
  state: {
    results: [],
    error: false
  },
  onPerformSearch(requestResult) {
    let newState = {};
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
