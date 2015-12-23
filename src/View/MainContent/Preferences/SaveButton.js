import blessed from 'blessed';
import * as Colors from '../../../Constants/Colors.js';

export default (form, offsetTop, offsetLeft) => {
  let button = blessed.button({
    parent: form,
    top: offsetTop,
    left: offsetLeft,
    width: 10,
    height: 3,
    align: 'center',
    content: 'Save',
    style: {
      focus: {
        border: {
          fg: Colors.FOCUS
        },
        fg: Colors.FOCUS
      }
    },
    border: {
      type: 'line'
    }
  });
  return button;
};

