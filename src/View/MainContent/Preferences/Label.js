import blessed from 'blessed';

export default (form, text, offsetTop) => {
  return blessed.text({
    content: text,
    height: 1,
    left: 0,
    parent: form,
    top: offsetTop,
    width: 25
  });
};
