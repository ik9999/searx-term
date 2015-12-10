import alt from '../Alt.js';
import actionCreators from '../Actions/ApplicationActions.js';
import * as MainWindowName from '../Constants/MainWindowName.js';

export default alt.createStore({
  displayName: 'ApplicationStore',
  bindListeners: {
    onChangeMainWindow: actionCreators.changeMainWindow
  },
  state: {
    currentMainWindow: MainWindowName.STARTING
  },
  onChangeMainWindow(windowName) {
    if (Object.keys(MainWindowName).indexOf(windowName) > -1) {
      this.setState({currentMainWindow: windowName});
    }
  }
});

