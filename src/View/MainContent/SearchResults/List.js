import blessed from 'blessed';
import open from 'open';
import createListItem from './ListItem.js';

export default (parent, stores) => {
  let SearchResultsStore = stores.SearchResultsStore;

  let list = blessed.box({
    parent,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%-1',
    scrollable: true
  });

  let listHeight = list.height;
  let listWidth = list.width;
  let listItems;
  let listItemsHeights;
  let listItemsCurrentOffset;
  let listItemsCurrentIdx;
  let listCurrentHeight = 0; // Height without extraLastItem
  let extraLastItem;
  let searchResultsData = [];

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
    listCurrentHeight = 0;
    extraLastItem = null;
    searchResultsData = [];
    if (!state.error && !state.initial) {
      let offsetTop = 0;
      let index = 0;
      let maxWidth = Math.floor(listWidth * stores.PreferencesStore.getState().searchResultsWidthPercents / 100);
      searchResultsData = state.results;
      state.results.forEach(searchResultData => {
        let item = createListItem(searchResultData, state.query, offsetTop, index, maxWidth);
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

  let lastPressedKeys = [];
  list.on('keypress', (_, key) => {
    if (key.full) {
      lastPressedKeys.push(key.full);
    }
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

  list.key(['o', 'enter'], () => {
    let lastPressedKeyIdx = lastPressedKeys.length - 2;
    let selectedItemIndex;
    while (lastPressedKeyIdx >= 0 && !Number.isNaN(parseInt(lastPressedKeys[lastPressedKeyIdx], 10))) {
      let selectedItemIndexInt = parseInt(lastPressedKeys[lastPressedKeyIdx], 10);
      if (typeof selectedItemIndex !== 'undefined') {
        selectedItemIndex += Math.round(Math.pow(10, (lastPressedKeys.length - 2) - lastPressedKeyIdx));
        list.screen.debug((lastPressedKeys.length - 2) - lastPressedKeyIdx);
      } else {
        selectedItemIndex = selectedItemIndexInt;
      }
      lastPressedKeyIdx -= 1;
    }
    if (selectedItemIndex < listItems.length) {
      let selectedItemData = searchResultsData[selectedItemIndex];
      if (selectedItemData.url) {
        open(selectedItemData.url);
      }
    }
  });

  return list;
};
