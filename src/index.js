import blessed from 'blessed';
import createWindow from './Window.js';

let screen = blessed.screen({
  smartCSR: true
});
screen.title = 'searx term';
createWindow(screen);
screen.render();
