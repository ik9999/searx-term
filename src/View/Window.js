import blessed from 'blessed';
import createSearchForm from './BottomForm/Form.js';
import createMainContent from './MainContent.js';

module.exports = (screen, stores) => {
  let windowBox = blessed.box({
    parent: screen,
    top: 'center',
    left: 'center',
    width: '100%',
    height: '100%',
    border: {
      type: 'line'
    }
  });
  screen.key(['escape', 'C-c'], (ch, key) => {
    return process.exit(0);
  });
  createSearchForm(windowBox, stores.ApplicationStore);
  createMainContent(windowBox, stores);
  return windowBox;
};
