import blessed from 'blessed';
import PreferencesActions from './../Actions/PreferencesActions.js';

PreferencesActions.loadPreferences();

export default windowBox => {
  let form = blessed.box({
    bottom: 0,
    content: '{bold}Enter{/bold} - search. {bold}Tab{/bold} - switch. {bold}Ctrl + Space{/bold} - show suggestions.',
    height: '100%',
    left: 0,
    parent: windowBox,
    tags: true,
    width: '100%'
  });
  return form;
};

