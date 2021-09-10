export const getNonWidowsText = (text: string) => {
  const whiteSpacePos = text.lastIndexOf(' ');
  return whiteSpacePos !== -1
    ? text.substring(0, whiteSpacePos) + '\xa0' + text.substring(whiteSpacePos + 1)
    : text;
};
