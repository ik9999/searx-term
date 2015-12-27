import alt from '../Alt.js';

export default alt.createActions({
  changeMainContent: contentName => contentName,
  focusScreenPart: screenPartName => screenPartName,
  setAutocompletionVisible: isVisible => isVisible,
  setSearchQuery: query => query
});
