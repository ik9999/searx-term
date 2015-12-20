import blessed from 'blessed';
import createSearchForm from './BottomForm/Form.js';
import createMainContainer from './MainContent/Container.js';
import ScreenPart from '../Constants/ScreenPart.js';

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
  let bottomForm = createSearchForm(windowBox, {
    ApplicationStore: stores.ApplicationStore,
    PreferencesStore: stores.PreferencesStore
  });
  let mainContentContainer = createMainContainer(windowBox, stores);
  stores.SearchResultsStore.listen(newState => {
    windowBox.screen.debug(newState);
  });
  return windowBox;
};
