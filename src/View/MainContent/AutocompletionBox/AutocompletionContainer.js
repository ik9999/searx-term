import blessed from 'blessed';
import createList from './AutocompletionList.js';
import ApplicationActions from '../../../Actions/ApplicationActions.js';

export default (parent, stores) => {
  let container = blessed.box({
    parent,
    bottom: 0,
    left: 0,
    width: '100%'
  });

  let list = createList(container, {
    ApplicationStore: stores.ApplicationStore,
    AutocompleteStore: stores.AutocompleteStore
  });
  list.hide();

  let noSuggestions = blessed.box({
    parent: container,
    bottom: 0,
    left: 0,
    height: 3,
    width: '100%',
    border: {
      type: 'line'
    },
    content: 'No suggestions'
  });
  noSuggestions.hide();
  stores.AutocompleteStore.listen(state => {
    ApplicationActions.setAutocompletionVisible.defer(true);
    container.screen.debug(state);
    if (!state.initial) {
      if (state.error || state.results.length === 0) {
        list.hide();
        noSuggestions.show();
        container.height = noSuggestions.height;
      } else {
        noSuggestions.hide();
        list.show();
        container.height = list.height;
      }
    }
    list.screen.render();
  });
  return container;
};

