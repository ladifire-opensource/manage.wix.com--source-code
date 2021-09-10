export const createQueryStringFromObject = (obj: object): string => {
  const queryString = Object.keys(obj)
    .filter(key => obj[key] !== null && obj[key] !== undefined)
    .map(key => `${key}=${encodeURIComponent(obj[key])}`)
    .join('&');

  return queryString ? `?${queryString}` : '';
};
