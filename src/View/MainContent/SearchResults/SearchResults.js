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
  stores.ApplicationStore.listenChange(state => state.focusedScreenPart, state => {
    if (state.focusedScreenPart === ScreenPart.MAIN_CONTENT && state.currentMainContent === MainContentName.SEARCH_RESULTS) {
      list.focus();
    }
  });
  stores.ApplicationStore.listenChange(state => state.currentMainContent, state => {
    if (state.currentMainContent === MainContentName.SEARCH_RESULTS) {
      ApplicationActions.focusScreenPart.defer(ScreenPart.MAIN_CONTENT);
    }
  });
  list.key('tab', () => {
    list.screen.debug(stores.ApplicationStore.getState());
    ApplicationActions.focusScreenPart(ScreenPart.BOTTOM_FORM);
  });
  return box;
};
