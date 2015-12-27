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
      focus: {
        selected: {
          bg: Colors.FOCUS,
          fg: 'white',
          bold: true
        },
        border: {
          fg: Colors.FOCUS
        }
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
    list.selected = 0;
    list.value = '';
    list.value = '';
    list.items = [];
    list.ritems = [];
    list.selected = 0;
    list.scrollTo(0);
    if (!state.initial && !state.error && state.suggestions.length > 0) {
      state.suggestions.forEach(suggestion => {
        list.addItem(suggestion);
      });
      suggestionList = state.suggestions;
      list.height = state.suggestions.length + 2;
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
