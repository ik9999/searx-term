import blessed from 'blessed';
import createSearchResults from './SearchResults.js';
import createStartingWindow from './StartingWindow.js';

export default (windowBox, stores) => {
  let main = blessed.box({
    parent: windowBox,
    bottom: 3,
    left: 0,
    width: '100%-2',
    height: '100%-5'
  });
  let startingWindow = createStartingWindow(main);
  //createStartingWindow(main);
  return main;
};
