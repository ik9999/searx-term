import blessed from 'blessed';

export default windowBox => {
  let form = blessed.box({
    parent: windowBox,
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%',
    border: {
      type: 'line'
    }
  });
  return form;
};