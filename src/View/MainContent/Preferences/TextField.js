import EditorWidget from 'editor-widget';
import * as Colors from '../../../Constants/Colors.js';

export default (form, offsetTop, offsetLeft) => {
  let textbox = new EditorWidget({
    border: {
      type: 'line'
    },
    height: 3,
    inputOnFocus: true,
    keys: true,
    mouse: true,
    multiLine: false,
    parent: form,
    right: 0,
    style: {
      focus: {
        border: {
          fg: Colors.FOCUS
        },
        fg: Colors.FOCUS
      }
    },
    top: offsetTop,
    width: '100%-' + offsetLeft
  });
  return textbox;
};
