import blessed from 'blessed';
import ApplicationActions from '../../../Actions/ApplicationActions.js';
import * as Colors from '../../../Constants/Colors.js';
import * as ScreenPart from '../../../Constants/ScreenPart.js';

export default (windowBox, stores) => {
  let list = blessed.list({
    parent: windowBox,
    bottom: 0,
    left: 0,
    height: 10,
    width: '100%',
    scrollable: true,
    interactive: false,
    vi: true,
    keys: true,
    style: {
      selected: {
        bg: Colors.FOCUS,
        fg: 'white',
        bold: true
      },
      border: {
        fg: Colors.FOCUS
      }
    },
    border: {
      type: 'line'
    }
  });

  let suggestionList = [];
  list.key('tab', () => {
    list.interactive = false;
    ApplicationActions.focusScreenPart(ScreenPart.BOTTOM_FORM);
  });
  list.on('select', (_, selectedItemIdx) => {
    ApplicationActions.setSearchQuery(suggestionList[selectedItemIdx]);
    ApplicationActions.setAutocompletionVisible.defer(false);
    ApplicationActions.focusScreenPart.defer(ScreenPart.BOTTOM_FORM);
  });

  stores.AutocompleteStore.listen(state => {
    list.clearItems();
    if (!state.initial && !state.error && state.results.length > 0) {
      state.results.forEach(suggestion => {
        list.addItem(suggestion);
      });
      suggestionList = state.results;
      list.height = state.results.length + 2;
      list.screen.render();
    }
  });
  stores.ApplicationStore.listenChange(state => state.focusedScreenPart, state => {
    if (state.focusedScreenPart === ScreenPart.AUTOCOMPLETION) {
      list.interactive = true;
      list.select(suggestionList.length - 1);
      list.focus();
    }
  });
  return list;
};
