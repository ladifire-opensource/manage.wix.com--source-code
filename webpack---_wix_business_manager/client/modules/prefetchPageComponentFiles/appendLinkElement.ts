export const appendLinkElement = (url, appendTo) => {
  if (Array.isArray(url)) {
    url.forEach(realUrl => appendLinkElement(realUrl, appendTo));
  } else {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    appendTo.appendChild(link);
  }
};
