import blessed from 'blessed';

export default (parent, searchResultData, offsetTop) => {
  let form = blessed.box({
    parent,
    top: offsetTop,
    height: 5,
    width: '100%-1',
    scrollable: true,
    content: 'sdfsdfsdf'
  });
  return form;
};
