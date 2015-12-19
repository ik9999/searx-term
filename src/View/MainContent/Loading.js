import blessed from 'blessed';

export default windowBox => {
  let text = '{bold}Loading...{/bold}';
  let form = blessed.box({
    top: 0,
    left: 0,
    content: text,
    height: 1,
    parent: windowBox,
    tags: true,
    width: '100%'
  });
  return form;
};

