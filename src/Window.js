import blessed from 'blessed';
import createSearchForm from './Form/Form.js';
import createMain from './Main/Main.js';

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
  createSearchForm(windowBox);
  createMain(windowBox, stores);
  return windowBox;
};
