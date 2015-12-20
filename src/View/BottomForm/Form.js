import blessed from 'blessed';
import * as MainContentName from '../../Constants/MainContentName.js';
import * as ScreenPart from '../../Constants/ScreenPart.js';
import createSearchInput from './SearchInput.js';
import createPreferencesButton from './PreferencesButton.js';
import SearchActions from '../../Actions/SearchActions.js';
import ApplicationActions from '../../Actions/ApplicationActions.js';

export default (windowBox, stores) => {
  let form = blessed.form({
    parent: windowBox,
    bottom: 0,
    left: 0,
    width: '100%-2',
    height: 3,
    vi: true
  });
  let searchInputBox = createSearchInput(form);
  let preferencesButton = createPreferencesButton(form);
  searchInputBox.key('tab', () => {
    preferencesButton.focus();
    searchInputBox._updateCursor();
  });
  preferencesButton.key('tab', () => {
    if (stores.ApplicationStore.getState().currentMainContent === MainContentName.SEARCH_RESULTS) {
      ApplicationActions.focusScreenPart(ScreenPart.MAIN_CONTENT);
    } else {
      searchInputBox.focus();
    }
  });
  stores.ApplicationStore.listen(state => {
    let mainContentChanged = state.mainContentChanged && state.currentMainContent === MainContentName.STARTING;
    let focusedScreenPartChanged = state.focusedScreenPartChanged && state.focusedScreenPart === ScreenPart.BOTTOM_FORM;
    if (mainContentChanged || focusedScreenPartChanged) {
      searchInputBox.focus();
    }
  });
  searchInputBox.key('enter', () => {
    ApplicationActions.changeMainContent(MainContentName.LOADING);
    SearchActions.performSearch.defer(stores.PreferencesStore.getState(), searchInputBox.textBuf.getText());
  });
  searchInputBox.focus();
  return form;
};
