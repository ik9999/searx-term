import blessed from 'blessed';
import createSearchInput from './SearchInput.js';

module.exports = windowBox => {
  let form = blessed.form({
    parent: windowBox,
    bottom: 0,
    left: 0,
    width: blessed.program().cols - 2,
    height: 3,
    vi: true
  });
  let searchInput = createSearchInput(form);
  return form;
};
