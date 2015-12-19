import blessed from 'blessed';
import createSearchForm from './BottomForm/Form.js';
import createMainContainer from './MainContent/Container.js';

export default (screen, stores) => {
  let windowBox = blessed.box({
    parent: screen,
    top: 'center',
    left: 'center',
    width: '100%',
    height: '100%',
    border: {
      type: 'line'
    }
  });
  screen.key(['escape', 'C-c'], (ch, key) => {
    return process.exit(0);
  });
  createSearchForm(windowBox, {
    ApplicationStore: stores.ApplicationStore,
    PreferencesStore: stores.PreferencesStore
  });
  stores.SearchResultsStore.listen(newState => {
    windowBox.screen.debug(newState);
  });
  createMainContainer(windowBox, stores);
  return windowBox;
};
