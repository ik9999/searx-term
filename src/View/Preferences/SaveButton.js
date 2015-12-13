import blessed from 'blessed';

export default (form, offsetTop) => {
  let button = blessed.button({
    parent: form,
    top: offsetTop,
    left: 30,
    width: 10,
    height: 3,
    align: 'center',
    content: 'Save',
    style: {
      focus: {
        border: {
          fg: '#af00ff'
        },
        fg: '#af00ff'
      }
    },
    border: {
      type: 'line'
    }
  });
  return button;
};

