import blessed from 'blessed';
import * as Colors from '../../../Constants/Colors.js';

export default (form, offsetTop, offsetLeft) => {
  return blessed.checkbox({
    checked: true,
    height: 2,
    inputOnFocus: true,
    keys: true,
    mouse: true,
    parent: form,
    right: 0,
    style: {
      focus: {
        fg: Colors.FOCUS
      }
    },
    top: offsetTop,
    width: '100%-' + offsetLeft
  });
};

