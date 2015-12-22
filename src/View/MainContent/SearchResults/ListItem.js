import blessed from 'blessed';
import XRegExp from 'xregexp';

export default (searchResultData, query, offsetTop, maxWidth, listIdx, screen) => {
  let titleStr = '';
  let titleWithTags = '';
  if (searchResultData.title) {
    titleStr = searchResultData.title;
    titleWithTags = titleStr;
  }

  let contentStr = '';
  let contentWithTags = '';
  let contentHeight = 0;
  if (searchResultData.content) {
    contentStr = searchResultData.content;
    let wordWrapRegex = '.{1,' + maxWidth + '}(\s|$)' + '|.{' + maxWidth + '}|.+$';
    let contentStrSplit = contentStr.match(RegExp(wordWrapRegex, 'g'));
    contentHeight = contentStrSplit.length;
    contentWithTags = contentStrSplit.join('\n');
  }

  XRegExp.forEach(query, XRegExp('\\p{L}+', 'g'), match => {
    titleWithTags = titleWithTags.replace(new RegExp('(' + match[0] + ')', 'gi'), '{bold}$1{/bold}');
    contentWithTags = contentWithTags.replace(new RegExp('(' + match[0] + ')', 'gi'), '{bold}$1{/bold}');
  });
  

  let title = blessed.text({
    top: 0,
    left: 0,
    height: 1,
    width: (listIdx + '. ' + searchResultData.title).length,
    align: 'left',
    content: listIdx + '. ' + titleWithTags,
    tags: true,
    style: {
      underline: true
    }
  });
  screen.debug(titleWithTags);
  screen.debug(listIdx + '. ' + titleWithTags);
  let content = blessed.text({
    top: 1,
    left: 0,
    height: contentHeight,
    width: '100%',
    align: 'left',
    content: contentWithTags,
    tags: true
  });

  let form = blessed.box({
    top: offsetTop,
    width: '100%-1',
    height: 1 + contentHeight
  });
  form.append(title);
  form.append(content);

  return form;
};
