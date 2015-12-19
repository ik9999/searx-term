import blessed from 'blessed';
import ApplicationActions from '../../Actions/ApplicationActions.js';
import * as MainContentName from '../../Constants/MainContentName.js';
import * as Colors from '../../Constants/Colors.js';

export default form => {
  let button = blessed.button({
    parent: form,
    bottom: 0,
    right: 1,
    width: '20%-1',
    height: 3,
    content: 'Preferences',
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
  button.on('press', () => {
    ApplicationActions.changeMainContent(MainContentName.PREFERENCES);
  });
  return button;
};
