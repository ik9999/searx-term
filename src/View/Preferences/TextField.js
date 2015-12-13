import EditorWidget from 'editor-widget';

export default (form, offsetTop) => {
  let textbox = new EditorWidget({
    border: {
      type: 'line'
    },
    height: 3,
    inputOnFocus: true,
    keys: true,
    mouse: true,
    multiLine: false,
    parent: form,
    right: 0,
    style: {
      focus: {
        border: {
          fg: '#af00ff'
        },
        fg: '#af00ff'
      }
    },
    top: offsetTop,
    width: '100%-30'
  });
  return textbox;
};
