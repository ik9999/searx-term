import blessed from 'blessed';
import ApplicationActions from '../../Actions/ApplicationActions.js';
import * as MainWindowName from '../../Constants/MainWindowName.js';

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
          fg: '#af00ff'
        },
        fg: '#af00ff'
      }
    },
    border: {
      type: 'line'
    }
  });
  button.on('press', () => {
    ApplicationActions.changeMainWindow(MainWindowName.PREFERENCES);
  });
  return button;
};
