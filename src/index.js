import blessed from 'blessed';
import createWindow from './View/Window.js';
import PreferencesStore from './Store/PreferencesStore.js';
import PreferencesActions from './Actions/PreferencesActions.js';
import ApplicationStore from './Store/ApplicationStore.js';

let screen = blessed.screen({
  smartCSR: true,
  debug: true,
  log: __dirname + '/debug.log',
  warnings: true,
  dump: true
});
screen.title = 'searx term';
createWindow(screen, {
  PreferencesStore,
  ApplicationStore
});
screen.render();
PreferencesActions.loadPreferences();
