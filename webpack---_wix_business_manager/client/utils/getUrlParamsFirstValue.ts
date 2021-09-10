import * as URI from 'urijs';

export const getUrlParamFirstValue = (name: string, url?: string): string => {
  const uri = typeof url !== 'undefined' ? new URI(url) : new URI();
  const value = uri.search(true)[name];

  return Array.isArray(value) ? value[0] : value;
};
