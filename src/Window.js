import blessed from 'blessed';
import createSearchForm from './SearchForm';

module.exports = screen => {
  let windowBox = blessed.box({
    parent: screen,
    top: 'center',
    left: 'center',
    width: '100%',
    height: '100%',
    content: 'Hello {bold}world{/bold}!',
    tags: true,
    border: {
      type: 'line'
    }
  });
  screen.key(['escape', 'C-c'], (ch, key) => {
    return process.exit(0);
  });
  createSearchForm(windowBox);
  return windowBox;
};
