import blessed from 'blessed';
import * as SafeSearchStatus from '../../../Constants/SafeSearchStatus.js';
import SafeSearchStatusString from '../../../Constants/SafeSearchStatusString.js';
import * as Colors from '../../../Constants/Colors.js';

export default (form, offsetTop, offsetLeft) => {
  let radioset = blessed.radioset({
    height: 2,
    inputOnFocus: true,
    keys: true,
    mouse: true,
    parent: form,
    right: 0,
    top: offsetTop,
    width: '100%-' + offsetLeft
  });
  let radiobuttons = [];
  let radioOffsetLeft = 0;
  let margin = 5;
  Object.keys(SafeSearchStatus).forEach(safeSearchStatus => {
    if (SafeSearchStatusString[safeSearchStatus]) {
      radiobuttons.push(blessed.radiobutton({
        name: safeSearchStatus,
        parent: radioset,
        height: 2,
        style: {
          focus: {
            fg: Colors.FOCUS
          }
        },
        top: 0,
        left: radioOffsetLeft
      }));
      radioOffsetLeft += 4;
      blessed.text({
        parent: form,
        content: SafeSearchStatusString[safeSearchStatus],
        top: offsetTop,
        left: offsetLeft + radioOffsetLeft,
        width: SafeSearchStatusString[safeSearchStatus].length
      });
      radioOffsetLeft += SafeSearchStatusString[safeSearchStatus].length + margin;
    }
  });
  return radioset;
};

