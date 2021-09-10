export const formatString = (str, obj) => {
  return Object.keys(obj).reduce(
    (acc, key) =>
      acc.replace(new RegExp('{{' + key + '}}', 'gi'), obj[key]).replace(new RegExp('{' + key + '}', 'gi'), obj[key]),
    str || '',
  );
};

export const getUrlOrigin = () => {
  const { origin, host, protocol } = window.location;
  if (origin) {
    return origin;
  }
  return `${protocol}//${host}`;
};

export const addOriginToLink = (link: string): string => `${getUrlOrigin()}${link}`;

export const parseDTOTemplate = (tmpl, fields) => {
  tmpl = fields.reduce((acc, field) => acc.replace(`$(${field.field})`, field.value), tmpl);
  return JSON.parse(tmpl);
};
