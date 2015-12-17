import blessed from 'blessed';
import * as MainWindowName from '../../Constants/MainWindowName.js';
import createSearchInput from './SearchInput.js';
import createPreferencesButton from './PreferencesButton.js';
import SearchActions from '../../Actions/SearchActions.js';

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
    searchInputBox.focus();
  });
  stores.ApplicationStore.listen(state => {
    if (state.currentMainWindow === MainWindowName.STARTING) {
      searchInputBox.focus();
    }
  });
  searchInputBox.key('enter', () => {
    SearchActions.performSearch(stores.PreferencesStore.getState(), searchInputBox.textBuf.getText());
  });
  searchInputBox.focus();
  return form;
};
