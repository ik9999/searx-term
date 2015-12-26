import alt from '../Alt.js';
import actionCreators from '../Actions/ApplicationActions.js';
import * as MainContentName from '../Constants/MainContentName.js';
import * as ScreenPart from '../Constants/ScreenPart.js';

export default alt.createStore({
  displayName: 'ApplicationStore',
  bindListeners: {
    onChangeMainContent: actionCreators.changeMainContent,
    onFocusScreenPart: actionCreators.focusScreenPart,
    onAutocompletionListPopulated: actionCreators.autocompletionListPopulated,
    onSetSearchQuery: actionCreators.setSearchQuery
  },
  state: {
    currentMainContent: MainContentName.STARTING,
    focusedScreenPart: ScreenPart.BOTTOM_FORM,
    autoCompletionBoxPopulated: false,
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
  onAutocompletionListPopulated(isPopulated) {
    this.setState({
      autoCompletionBoxPopulated: isPopulated
    });
  },
  onSetSearchQuery(query) {
    this.setState({searchQuery: String(query)});
  }
});

