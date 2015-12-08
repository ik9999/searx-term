import blessed from 'blessed';
import createSearchResults from './SearchResults.js';

module.exports = windowBox => {
  let main = blessed.box({
    parent: windowBox,
    bottom: 3,
    left: 0,
    width: '100%-2',
    height: '100%-6'
  });
  let searchResultsWindow = createSearchResults(main);
  return main;
};
