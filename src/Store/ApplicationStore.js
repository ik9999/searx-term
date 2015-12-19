import alt from '../Alt.js';
import actionCreators from '../Actions/ApplicationActions.js';
import * as MainContentName from '../Constants/MainContentName.js';

export default alt.createStore({
  displayName: 'ApplicationStore',
  bindListeners: {
    onChangeMainContent: actionCreators.changeMainContent
  },
  state: {
    currentMainContent: MainContentName.STARTING
  },
  onChangeMainContent(mainContentName) {
    if (Object.keys(MainContentName).indexOf(mainContentName) > -1) {
      this.setState({currentMainContent: mainContentName});
    }
  }
});

