import blessed from 'blessed';
import * as Colors from '../../Constants/Colors.js';

export default (form, offsetTop) => {
  let button = blessed.button({
    parent: form,
    top: offsetTop,
    left: 30,
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

