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
  let onSelect = (_, selectedItemIdx) => {
    ApplicationActions.setSearchQuery(suggestionList[selectedItemIdx]);
    ApplicationActions.setAutocompletionVisible.defer(false);
    ApplicationActions.focusScreenPart.defer(ScreenPart.BOTTOM_FORM);
  };
  list.key('tab', () => {
    list.interactive = false;
    ApplicationActions.focusScreenPart(ScreenPart.BOTTOM_FORM);
  });
  list.up = offset => {
    if (list.selected === 0) {
      list.move(suggestionList.length - 1);
    } else {
      list.move(-(offset || 1));
    }
  };
  list.down = offset => {
    if (list.selected === suggestionList.length - 1) {
      list.move(-(suggestionList.length - 1));
    } else {
      list.move(offset || 1);
    }
  };

  stores.AutocompleteStore.listen(state => {
    if (!state.initial && !state.error && state.suggestions.length > 0) {
      state.suggestions.reverse().forEach(suggestion => {
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
      list.on('select', onSelect);
      list.focus();
    }
  });
  return list;
};
