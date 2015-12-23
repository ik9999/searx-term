import blessed from 'blessed';

export default (form, text, offsetTop, width) => {
  return blessed.text({
    content: text,
    height: 1,
    left: 0,
    parent: form,
    top: offsetTop,
    width: width
  });
};
