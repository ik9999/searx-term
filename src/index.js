import blessed from 'blessed';
import createWindow from './View/Window.js';
import PreferencesStore from './Store/PreferencesStore.js';
import PreferencesActions from './Actions/PreferencesActions.js';
import ApplicationStore from './Store/ApplicationStore.js';
import SearchResultsStore from './Store/SearchResultsStore.js';
import AutocompleteStore from './Store/AutocompleteStore.js';

let screen = blessed.screen({
  smartCSR: true,
  autoPadding: true,
  debug: true,
  fullUnicode: true
});
process.on('uncaughtException', err => {
  console.log(err.stack);
  screen.debug(err.stack);
});
screen.title = 'searx term';
createWindow(screen, {
  PreferencesStore,
  ApplicationStore,
  SearchResultsStore,
  AutocompleteStore
});
screen.render();
PreferencesActions.loadPreferences();
