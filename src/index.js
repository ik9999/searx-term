import blessed from 'blessed';
import createWindow from './Window.js';
import PreferencesStore from './Store/PreferencesStore.js';

let screen = blessed.screen({
  smartCSR: true,
  debug: true
});
screen.title = 'searx term';
setTimeout(() => {
  screen.debug(PreferencesStore.getState());
}, 2000);
createWindow(screen, {PreferencesStore});
screen.render();
