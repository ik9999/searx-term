import blessed from 'blessed';
import createSearchInput from './SearchInput.js';
import createPreferencesButton from './PreferencesButton.js';

export default windowBox => {
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
  });
  preferencesButton.key('tab', () => {
    searchInputBox.focus();
  });
  searchInputBox.focus();
  return form;
};
