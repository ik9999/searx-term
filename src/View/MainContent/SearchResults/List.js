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
  let listCurrentHeight = 0; // Height without extraLastItem
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
        let item = createListItem(searchResultData, state.query, offsetTop, 100, index, list.screen);
        listItems.push(item);
        if (offsetTop + item.height <= listHeight) {
          list.append(item);
          listCurrentHeight += item.height;
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
      listCurrentHeight += listItemsCurrentIdx.length;
    }
  });
  let updateCurrentOffsets = () => {
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
  };
  let adjustShowedItemsNumber = () => {
    let nextListItemIdx = listItemsCurrentIdx[listItemsCurrentIdx.length - 1] + 1;
    while (nextListItemIdx < listItems.length && listCurrentHeight + extraLastItem.height < list.height) {
      listItemsCurrentIdx.push(nextListItemIdx);
      listCurrentHeight += listItemsHeights[nextListItemIdx] + 1;
      if (nextListItemIdx + 1 < listItems.length) {
        extraLastItem = listItems[nextListItemIdx + 1];
        list.append(extraLastItem);
      } else {
        extraLastItem = null;
      }
      nextListItemIdx = listItemsCurrentIdx[listItemsCurrentIdx.length - 1] + 1;
    }
    while (listCurrentHeight > list.height) {
      listCurrentHeight -= listItemsHeights[listItemsCurrentIdx[listItemsCurrentIdx.length - 1]] + 1;
      let toExtraIdx = listItemsCurrentIdx.pop();
      extraLastItem.detach();
      extraLastItem = listItems[toExtraIdx];
    }
  };

  list.on('focus', () => {
  });
  list.on('blur', () => {
  });
  list.key(['j', 'down'], () => {
    if (listItemsCurrentIdx[listItemsCurrentIdx.length - 1] < listItems.length - 1) {
      listItems[listItemsCurrentIdx[0]].detach();
      listCurrentHeight -= listItemsHeights[listItemsCurrentIdx[0]] + 1;
      listItemsCurrentIdx.shift();

      adjustShowedItemsNumber();
      updateCurrentOffsets();
      list.screen.render();
    }
  });
  list.key(['k', 'up'], () => {
    if (listItemsCurrentIdx[0] > 0) {
      let detachedItem = null;
      if (extraLastItem) {
        detachedItem = extraLastItem;
      } else {
        detachedItem = listItems[listItemsCurrentIdx.length - 1];
      }
      detachedItem.detach();
      listCurrentHeight -= detachedItem.height + 1;

      extraLastItem = listItems[listItemsCurrentIdx.pop()];
      let prevListItemIdx = listItemsCurrentIdx[0] - 1;
      listItemsCurrentIdx.unshift(prevListItemIdx);
      list.prepend(listItems[prevListItemIdx]);
      listCurrentHeight += listItemsHeights[prevListItemIdx] + 1;

      adjustShowedItemsNumber();
      updateCurrentOffsets();
      list.screen.render();
    }
  });
  return list;
};
