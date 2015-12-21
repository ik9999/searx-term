import blessed from 'blessed';
import createListItem from './ListItem.js';
import * as Colors from '../../../Constants/Colors.js';

export default (parent, SearchResultsStore) => {
  let list = blessed.box({
    parent,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%-1',
    scrollable: true
  });

  let listHeight = list.height;
  let listItems;
  let listItemsHeights;
  let listItemsCurrentOffset;
  let listItemsCurrentIdx;
  let extraLastItem;
  SearchResultsStore.listen(state => {
    if (typeof listItems !== 'undefined') {
      listItems.forEach(item => {
        item.destroy();
      });
    }
    listItems = [];
    listItemsHeights = [];
    listItemsCurrentOffset = [];
    listItemsCurrentIdx = [];
    extraLastItem = null;
    if (!state.error && !state.initial) {
      let offsetTop = 0;
      let index = 0;
      state.results.forEach(searchResultData => {
        let item = createListItem(searchResultData, state.query, offsetTop, 100);
        list.screen.debug(item.height);
        listItems.push(item);
        if (offsetTop + item.height <= listHeight) {
          list.append(item);
          listItemsCurrentOffset.push(offsetTop);
          listItemsCurrentIdx.push(index);
        } else if (listItemsCurrentIdx.length > 0 && listItemsCurrentIdx[listItemsCurrentIdx.length - 1] === index - 1) {
          list.append(item);
          extraLastItem = item;
        }
        listItemsHeights.push(item.height);
        offsetTop += item.height + 1;
        index += 1;
      });
    }
  });
  let updateCurrentOffsets = (doScreenRender = true) => {
    let offsetTop = 0;
    listItemsCurrentOffset = [];
    listItemsCurrentIdx.forEach(index => {
      let height = listItemsHeights[index];
      listItemsCurrentOffset.push(offsetTop);
      listItems[index].top = offsetTop;
      offsetTop += height + 1;
    });
    if (extraLastItem) {
      extraLastItem.top = offsetTop;
    }
    if (doScreenRender) {
      list.screen.render();
    }
  };

  list.on('focus', () => {
  });
  list.on('blur', () => {
  });
  list.key(['j', 'down'], () => {
    if (listItemsCurrentIdx[listItemsCurrentIdx.length - 1] < listItems.length - 1) {
      listItems[listItemsCurrentIdx[0]].detach();
      listItemsCurrentIdx.shift();
      //TODO fix bug with dynamic number of items in list
      let nextListItemIdx = listItemsCurrentIdx[listItemsCurrentIdx.length - 1] + 1;
      listItemsCurrentIdx.push(nextListItemIdx);
      if (nextListItemIdx + 1 < listItems.length) {
        extraLastItem = listItems[nextListItemIdx + 1];
        list.append(extraLastItem);
      }
      updateCurrentOffsets(true);
      list.screen.debug(listItemsCurrentIdx);
    }
  });
  list.key(['k', 'up'], () => {
    if (listItemsCurrentIdx[0] > 0) {
      if (extraLastItem) {
        extraLastItem.detach();
      } else {
        listItems[listItemsCurrentIdx.length - 1].detach();
      }
      extraLastItem = listItems[listItemsCurrentIdx.pop()];
      let prevListItemIdx = listItemsCurrentIdx[0] - 1;
      listItemsCurrentIdx.unshift(prevListItemIdx);
      list.prepend(listItems[prevListItemIdx]);
      updateCurrentOffsets(true);
    }
  });
  return list;
};
