import blessed from 'blessed';

export default (form, offsetTop) => {
  return blessed.checkbox({
    checked: true,
    height: 2,
    inputOnFocus: true,
    keys: true,
    mouse: true,
    parent: form,
    right: 0,
    style: {
      focus: {
        fg: '#af00ff'
      }
    },
    top: offsetTop,
    width: '100%-30'
  });
};

