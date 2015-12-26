import blessed from 'blessed';
let content = '{bold}Enter{/bold} - search.\n' +
  '{bold}Tab{/bold} - focus next element.\n' +
  '{bold}Shift + Tab{/bold} - focus prev. element.\n' +
  '{bold}Ctrl + Space{/bold} - show suggestions.\n' +
  '{bold}Ctrl + k{/bold} or  {bold}↑{/bold} - focus suggestion list.\n' +
  '{bold}*result index number* o{/bold} or {bold}*result index number* Enter{/bold} - open url in system\'s default web browser.';
export default windowBox => {
  let form = blessed.box({
    top: 0,
    content,
    height: '100%',
    left: 0,
    parent: windowBox,
    tags: true,
    width: '100%'
  });
  return form;
};
