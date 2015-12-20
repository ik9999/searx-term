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
    scrollable: true,
    keys: true,
    vi: true,
    alwaysScroll: true,
    scrollbar: {
      inverse: true,
      track: {
        bg: Colors.FOCUS
      }
    }
  });
  list.on('focus', () => {
    list.scrollbar.track.style.bg = Colors.FOCUS;
  });
  list.on('blur', () => {
    list.scrollbar.track.style.bg = null;
  });
  list.key('pagedown', () => {
    list.scroll(list.height / 2);
  });
  list.key('pageup', () => {
    list.scroll(-list.height / 2);
  });
  list.on('keypress', (ev, key) => {
    list.screen.debug(ev);
    list.screen.debug(key);
  });
  let listItems = [];
  SearchResultsStore.listen(state => {
    if (!state.error && !state.initial) {
      listItems.forEach(item => {
        item.destroy();
      });
      let offsetTop = 0;
      state.results.forEach(searchResultData => {
        let item = createListItem(list, searchResultData, offsetTop);
        offsetTop += item.height;
        listItems.push(item);
      });
    }
  });
  return list;
};
