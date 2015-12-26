import alt from '../Alt.js';
import request from 'request';

export default alt.createActions({
  getSuggestions(preferencesState, query = '') {
    let source = preferencesState.autocompleteSourceStr;
    let instance = preferencesState.instance;
    let cookie = request.cookie('autocomplete=' + source);
    let jar = request.jar();
    jar.setCookie(cookie, 'http://' + instance);
    let url = 'http://' + instance + '/autocompleter?q=' + query;
    return dispatch => {
      let data = {
        query,
        error: true,
        results: []
      };
      request({
        method: 'GET',
        jar,
        url
      }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          try {
            let parsedBody = JSON.parse(body);
            if (Array.isArray(parsedBody)) {
              data.error = false;
              data.results = parsedBody.filter(value => {
                return (typeof value === 'string' && value.length > 0);
              });
            }
          } catch (_error) {
          }
        }
        dispatch(data);
      });
    };
  }
});

