import blessed from 'blessed';

export default parent => {
  return blessed.box({
    bottom: 0,
    height: '100%',
    left: 0,
    parent,
    tags: true,
    width: '100%'
  });
};
