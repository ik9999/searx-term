import blessed from 'blessed';
import createSearchResults from './SearchResults/SearchResults.js';
import createStarting from './Starting.js';
import createPreferences from './Preferences/Preferences.js';
import createLoading from './Loading.js';
import * as MainContentName from '../../Constants/MainContentName.js';
import ApplicationActions from '../../Actions/ApplicationActions.js';

export default (windowBox, stores) => {
  let main = blessed.box({
    parent: windowBox,
    bottom: 3,
    left: 0,
    width: '100%-2',
    height: '100%-5'
  });
  let startingContent = createStarting(main);
  let preferencesContent = createPreferences(main, {
    PreferencesStore: stores.PreferencesStore,
    ApplicationStore: stores.ApplicationStore
  });
  preferencesContent.hide();
  let loadingContent = createLoading(main);
  loadingContent.hide();
  let searchResultsContent = createSearchResults(main, {
    SearchResultsStore: stores.SearchResultsStore,
    ApplicationStore: stores.ApplicationStore
  });
  searchResultsContent.hide();
  let currentMainContent = startingContent;
  stores.ApplicationStore.listen(state => {
    main.screen.debug(state);
    if (state.mainContentChanged) {
      currentMainContent.hide();
      switch (state.currentMainContent) {
        case MainContentName.PREFERENCES:
          currentMainContent = preferencesContent;
          break;
        case MainContentName.STARTING:
          currentMainContent = startingContent;
          break;
        case MainContentName.LOADING:
          currentMainContent = loadingContent;
          break;
        case MainContentName.SEARCH_RESULTS:
          currentMainContent = searchResultsContent;
          break;
      }
      currentMainContent.show();
      main.screen.render();
    }
  });
  stores.SearchResultsStore.listen(state => {
    if (!state.initial) {
      if (!state.error) {
        ApplicationActions.changeMainContent.defer(MainContentName.SEARCH_RESULTS);
      }
    }
  });
  return main;
};
