import blessed from 'blessed';

export default form => {
  let button = blessed.button({
    parent: form,
    bottom: 0,
    right: 1,
    width: '20%-1',
    height: 3,
    content: 'Preferences',
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
  button.on('press', () => {
    console.log(button);
  });
  return button;
};

