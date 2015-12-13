import blessed from 'blessed';

export default contentContainer => {
  return blessed.form({
    bottom: 0,
    height: '100%',
    left: 0,
    parent: contentContainer,
    vi: true,
    width: '100%'
  });
};
