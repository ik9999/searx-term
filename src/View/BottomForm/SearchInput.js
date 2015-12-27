import EditorWidget from 'editor-widget';
import * as Colors from '../../Constants/Colors.js';
import * as ScreenPart from '../../Constants/ScreenPart.js';
import * as MainContentName from '../../Constants/MainContentName.js';
import SearchActions from '../../Actions/SearchActions.js';
import ApplicationActions from '../../Actions/ApplicationActions.js';
import AutocompleteActions from '../../Actions/AutocompleteActions.js';

export default (form, stores) => {
  let textbox = new EditorWidget({
    parent: form,
    keys: true,
    mouse: true,
    inputOnFocus: true,
    bottom: 0,
    left: 0,
    width: '80%',
    height: 3,
    multiLine: false,
    border: {
      type: 'line'
    },
    style: {
      focus: {
        border: {
          fg: Colors.FOCUS
        }
      }
    }
  });

  stores.ApplicationStore.listenChange(state => state.focusedScreenPart, state => {
    if (state.focusedScreenPart === ScreenPart.BOTTOM_FORM) {
      textbox.focus();
    }
  });
  stores.ApplicationStore.listenChange(state => state.currentMainContent, state => {
    if (state.currentMainContent === MainContentName.STARTING) {
      textbox.focus();
    }
  });
  textbox.key('enter', () => {
    ApplicationActions.changeMainContent(MainContentName.LOADING);
    SearchActions.performSearch.defer(stores.PreferencesStore.getState(), textbox.textBuf.getText());
  });
  textbox.key('tab', () => {
    ApplicationActions.setAutocompletionVisible(false);
  });

  textbox.key('C-u', () => {
    textbox.textBuf.setText('');
  });
  textbox.key('C-w', () => {
    let initialPosition = textbox.selection.getHeadPosition().column;
    textbox.moveCursorHorizontal(-1, true);
    let newPosition = textbox.selection.getHeadPosition().column;
    textbox.textBuf.delete([[0, newPosition], [0, initialPosition]]);
  });
  let currentQuery = '';
  textbox.ready.then(() => {
    let originalKeyPressHandler = textbox._events['keypress'];
    textbox.removeAllListeners('keypress');
    textbox.key('C-`', () => {
      textbox.screen.debug('dfg');
      AutocompleteActions.getSuggestions(stores.PreferencesStore.getState(), textbox.textBuf.getText());
    });
    textbox.on('keypress', (ch, key) => {
      if ((key.full === 'up' || key.full === 'C-k') && stores.ApplicationStore.getState().autoCompletionVisible) {
        ApplicationActions.focusScreenPart(ScreenPart.AUTOCOMPLETION);
      } else {
        originalKeyPressHandler(ch, key);
        if (textbox.textBuf.getText() !== currentQuery) {
          currentQuery = textbox.textBuf.getText();
          ApplicationActions.setSearchQuery(currentQuery);
        }
        textbox.screen.debug(key.full);
        if (key.full.length === 1 || key.full === 'backspace') {
          ApplicationActions.setAutocompletionVisible(false);
        }
      }
    });
  });
  stores.ApplicationStore.listenChange(state => state.searchQuery, state => {
    if (state.searchQuery !== currentQuery) {
      textbox.textBuf.setText(state.searchQuery);
    }
  });

  return textbox;
};
