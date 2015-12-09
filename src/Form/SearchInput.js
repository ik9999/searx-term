import EditorWidget from 'editor-widget';

export default form => {
  let textbox = new EditorWidget({
    parent: form,
    keys: true,
    mouse: true,
    inputOnFocus: true,
    bottom: 0,
    left: 0,
    width: '80%-1',
    height: 3,
    multiLine: false,
    border: {
      type: 'line'
    },
    style: {
      focus: {
        border: {
          fg: '#af00ff'
        }
      }
    }
  });
  return textbox;
};
