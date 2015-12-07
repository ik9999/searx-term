import blessed from 'blessed';
import Window from './Window.js';

let screen = blessed.screen({
  smartCSR: true
});

screen.title = 'searx term';
let box = blessed.box(Window);
screen.append(box);
screen.key(['escape', 'q', 'C-c'], (ch, key) => {
  return process.exit(0);
});
box.focus();
screen.render();
