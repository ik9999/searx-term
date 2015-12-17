import blessed from 'blessed';
import createWindow from './View/Window.js';
import PreferencesStore from './Store/PreferencesStore.js';
import PreferencesActions from './Actions/PreferencesActions.js';
import ApplicationStore from './Store/ApplicationStore.js';
import SearchResultsStore from './Store/SearchResultsStore.js';

let screen = blessed.screen({
  smartCSR: true,
  debug: true
});
screen.title = 'searx term';
createWindow(screen, {
  PreferencesStore,
  ApplicationStore,
  SearchResultsStore
});
screen.render();
PreferencesActions.loadPreferences();
process.on('uncaughtException', err => {
  screen.debug(err.stack);
});
