import alt from '../Alt.js';
import request from 'request';
import * as SafeSearchStatusQueryId from '../Constants/SafeSearchStatusQueryId.js';

export default alt.createActions({
  performSearch(preferencesState, query = '', pageNo = 1) {
    let instance = preferencesState.instance;
    let url = 'http://' + instance + '/?category_general=1&format=json&pageno=' + pageNo + '&q=' + query;
    if (preferencesState.enginesStr) {
      url += '&engines=' + preferencesState.enginesStr;
    }
    let safeSearchStatus = preferencesState.safeSearchStatus;
    if (SafeSearchStatusQueryId[safeSearchStatus]) {
      url += '&safesearch=' + SafeSearchStatusQueryId[safeSearchStatus];
    }
    return dispatch => {
      let data = {
        error: true,
        results: []
      };
      request(url, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          try {
            let parsedBody = JSON.parse(body);
            if (Array.isArray(parsedBody.results)) {
              data.error = false;
              data.results = parsedBody.results;
            }
          } catch (_error) {
          }
        }
        dispatch(data);
      });
    };
  }
});
