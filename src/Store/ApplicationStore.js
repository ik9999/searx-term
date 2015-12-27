import alt from '../Alt.js';
import actionCreators from '../Actions/ApplicationActions.js';
import * as MainContentName from '../Constants/MainContentName.js';
import * as ScreenPart from '../Constants/ScreenPart.js';

export default alt.createStore({
  displayName: 'ApplicationStore',
  bindListeners: {
    onChangeMainContent: actionCreators.changeMainContent,
    onFocusScreenPart: actionCreators.focusScreenPart,
    onSetAutocompletionVisible: actionCreators.setAutocompletionVisible,
    onSetSearchQuery: actionCreators.setSearchQuery
  },
  state: {
    currentMainContent: MainContentName.STARTING,
    focusedScreenPart: ScreenPart.BOTTOM_FORM,
    autoCompletionVisible: false,
    searchQuery: ''
  },
  onChangeMainContent(mainContentName) {
    if (Object.keys(MainContentName).indexOf(mainContentName) > -1) {
      this.setState({
        currentMainContent: mainContentName
      });
    }
  },
  onFocusScreenPart(screenPart) {
    if (Object.keys(ScreenPart).indexOf(screenPart) > -1) {
      this.setState({
        focusedScreenPart: screenPart
      });
    }
  },
  onSetAutocompletionVisible(isVisible) {
    this.setState({
      autoCompletionVisible: Boolean(isVisible)
    });
  },
  onSetSearchQuery(query) {
    this.setState({searchQuery: String(query)});
  }
});

