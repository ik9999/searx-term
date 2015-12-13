import blessed from 'blessed';
import * as MainWindowName from '../../Constants/MainWindowName.js';
import createSearchInput from './SearchInput.js';
import createPreferencesButton from './PreferencesButton.js';

export default (windowBox, ApplicationStore) => {
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
  ApplicationStore.listen(state => {
    if (state.currentMainWindow === MainWindowName.STARTING) {
      searchInputBox.focus();
    }
  });
  searchInputBox.focus();
  return form;
};
