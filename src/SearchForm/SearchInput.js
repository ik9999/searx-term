import blessed from 'blessed';
import EditorWidget from 'editor-widget';

module.exports = form => {
  let textbox = new EditorWidget({
    parent: form,
    keys: true,
    mouse: true,
    inputOnFocus: true,
    bottom: 0,
    left: 0,
    width: blessed.program().cols - 4,
    height: 3,
    multiLine: false,
    border: {
      type: 'line'
    }
  });
  textbox.focus();
  return textbox;
};
