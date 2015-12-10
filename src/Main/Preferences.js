import blessed from 'blessed';

export default (windowBox, PreferencesStore) => {
  let form = blessed.box({
    bottom: 0,
    content: 'Prefsq',
    height: '100%',
    left: 0,
    parent: windowBox,
    tags: true,
    width: '100%'
  });
  return form;
};
