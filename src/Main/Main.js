import blessed from 'blessed';
import createSearchResults from './SearchResults.js';
import createStartingWindow from './StartingWindow.js';
import createPreferencesWindow from './Preferences.js';
import * as MainWindowName from '../Constants/MainWindowName.js';

export default (windowBox, stores) => {
  let main = blessed.box({
    parent: windowBox,
    bottom: 3,
    left: 0,
    width: '100%-2',
    height: '100%-5'
  });
  let startingWindow = createStartingWindow(main);
  let preferencesWindow = createPreferencesWindow(main, stores.PreferencesStore);
  preferencesWindow.hide();
  let currentWindow = startingWindow;
  stores.ApplicationStore.listen(state => {
    currentWindow.hide();
    switch (state.currentMainWindow) {
      case MainWindowName.PREFERENCES:
        currentWindow = preferencesWindow;
        break;
      case MainWindowName.STARTING:
        currentWindow = startingWindow;
        break;
    }
    currentWindow.show();
    main.screen.render();
  });
  return main;
};
