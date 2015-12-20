import alt from '../Alt.js';
import actionCreators from '../Actions/ApplicationActions.js';
import * as MainContentName from '../Constants/MainContentName.js';
import * as ScreenPart from '../Constants/ScreenPart.js';

let defaultState = {
  mainContentChanged: false,
  focusedScreenPartChanged: false
};

export default alt.createStore({
  displayName: 'ApplicationStore',
  bindListeners: {
    onChangeMainContent: actionCreators.changeMainContent,
    onFocusScreenPart: actionCreators.focusScreenPart
  },
  state: {
    mainContentChanged: false,
    focusedScreenPartChanged: false,
    currentMainContent: MainContentName.STARTING,
    focusedScreenPart: ScreenPart.BOTTOM_FORM
  },
  onChangeMainContent(mainContentName) {
    if (Object.keys(MainContentName).indexOf(mainContentName) > -1) {
      this.setState(Object.assign({}, defaultState, {
        currentMainContent: mainContentName,
        mainContentChanged: true
      }));
    }
  },
  onFocusScreenPart(screenPart) {
    if (Object.keys(ScreenPart).indexOf(screenPart) > -1) {
      this.setState(Object.assign(defaultState, {
        focusedScreenPart: screenPart,
        focusedScreenPartChanged: true
      }));
    }
  }
});

