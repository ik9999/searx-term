import blessed from 'blessed';
import createSearchForm from './Form/Form.js';
import createMain from './Main/Main.js';

module.exports = screen => {
  let windowBox = blessed.box({
    parent: screen,
    top: 'center',
    left: 'center',
    width: '100%',
    height: '100%',
    content: '{bold}Enter{/bold} - search. {bold}Tab{/bold} - switch.',
    tags: true,
    border: {
      type: 'line'
    }
  });
  screen.key(['escape', 'C-c'], (ch, key) => {
    return process.exit(0);
  });
  createSearchForm(windowBox);
  createMain(windowBox);
  return windowBox;
};
