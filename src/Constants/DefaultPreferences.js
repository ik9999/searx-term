import * as SafeSearchStatus from './SafeSearchStatus.js';

const prefs = {
  instance: 'searx.me',
  engines: 'wikipedia,currency,ddg_definitions,wikidata,duckduckgo,google,startpage',
  autocomplete: true,
  safesearch: SafeSearchStatus.NONE,
  autocomplete_source: 'startpage',
  search_results_width_prc: 70
};
export default prefs;
