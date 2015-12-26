import alt from '../Alt.js';

export default alt.createActions({
  changeMainContent: contentName => contentName,
  focusScreenPart: screenPartName => screenPartName,
  autocompletionListPopulated: isPopulated => isPopulated,
  setSearchQuery: query => query
});
