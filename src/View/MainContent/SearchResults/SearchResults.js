import blessed from 'blessed';
import createList from './List.js';
import * as MainContentName from '../../../Constants/MainContentName.js';
import * as ScreenPart from '../../../Constants/ScreenPart.js';
import ApplicationActions from '../../../Actions/ApplicationActions.js';

export default (parent, stores) => {
  let box = blessed.box({
    parent,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  });
  let list = createList(box, {
    SearchResultsStore: stores.SearchResultsStore,
    PreferencesStore: stores.PreferencesStore
  });
  stores.ApplicationStore.listen(state => {
    let mainContentSet = state.currentMainContent === MainContentName.SEARCH_RESULTS;
    let mainCotentChanged = state.mainContentChanged && mainContentSet;
    let focusedScreenPartChanged = state.focusedScreenPartChanged && state.focusedScreenPart === ScreenPart.MAIN_CONTENT && mainContentSet;
    if (mainCotentChanged || focusedScreenPartChanged) {
      list.focus();
    }
  });
  list.key('tab', () => {
    ApplicationActions.focusScreenPart(ScreenPart.BOTTOM_FORM);
  });
  return box;
};
