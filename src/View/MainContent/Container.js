import blessed from 'blessed';
import createSearchResults from './SearchResults/SearchResults.js';
import createStarting from './Starting.js';
import createPreferences from './Preferences/Preferences.js';
import createLoading from './Loading.js';
import createAutocompletionBox from './AutocompletionBox/AutocompletionContainer.js';
import ApplicationActions from '../../Actions/ApplicationActions.js';
import * as MainContentName from '../../Constants/MainContentName.js';

export default (windowBox, stores) => {
  let mainContainer = blessed.box({
    parent: windowBox,
    bottom: 3,
    left: 0,
    width: '100%-2',
    height: '100%-5'
  });

  let startingContent = createStarting(mainContainer);
  let preferencesContent = createPreferences(mainContainer, {
    PreferencesStore: stores.PreferencesStore,
    ApplicationStore: stores.ApplicationStore
  });
  preferencesContent.hide();
  let loadingContent = createLoading(mainContainer);
  loadingContent.hide();
  let searchResultsContent = createSearchResults(mainContainer, {
    SearchResultsStore: stores.SearchResultsStore,
    ApplicationStore: stores.ApplicationStore,
    PreferencesStore: stores.PreferencesStore
  });
  searchResultsContent.hide();

  let autocompletionBox = createAutocompletionBox(mainContainer, {
    AutocompleteStore: stores.AutocompleteStore,
    ApplicationStore: stores.ApplicationStore
  });
  autocompletionBox.hide();

  let currentMainContent = startingContent;
  stores.ApplicationStore.listenChange(state => state.currentMainContent, state => {
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
    mainContainer.screen.render();
  });
  stores.ApplicationStore.listenChange(state => state.autoCompletionVisible, state => {
    if (state.autoCompletionVisible) {
      let contentHeight = mainContainer.height;
      let autoCompletionBoxHeight = autocompletionBox.height;
      currentMainContent.height = contentHeight - autoCompletionBoxHeight;
      currentMainContent.bottom = 3 + autoCompletionBoxHeight;
      autocompletionBox.show();
      mainContainer.screen.render();
    } else if (autocompletionBox.visible) {
      currentMainContent.height += autocompletionBox.height;
      currentMainContent.bottom = 3;
      autocompletionBox.hide();
      mainContainer.screen.render();
    }
  });
  stores.SearchResultsStore.listen(state => {
    if (!state.initial) {
      if (!state.error) {
        ApplicationActions.changeMainContent.defer(MainContentName.SEARCH_RESULTS);
      }
    }
  });
  return mainContainer;
};
