import { runCallback } from './callbackUtils';

function xhrGeneric(
  uri: string,
  successCallback: Function,
  errorCallback: Function,
  options: {
    query?: any;
    postBody?: string;
    headers?: any;
  },
) {
  const headers = (options && options.headers) || {};
  const query = (options && options.query) || {};
  headers['content-type'] = headers['content-type'] || 'application/json';
  const xhr = new XMLHttpRequest();
  const method = options && options.postBody ? 'POST' : 'GET';
  const url = `${uri}${buildQuery(query)}`;
  xhr.open(method, url, true);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      const status = xhr.status;
      if (status < 200 || status >= 300) {
        runCallback(errorCallback, { status, responseText: xhr.responseText });
      } else {
        runCallback(successCallback, xhr.responseText);
      }
    }
  };
  Object.keys(headers).forEach((key: string) => {
    if (headers[key] !== void 0) {
      xhr.setRequestHeader(key, headers[key]);
    }
  });
  xhr.send((options && options.postBody) || null);
}

function buildQuery(query: any) {
  let queryString = '';
  if (typeof query === 'object') {
    Object.keys(query).forEach((queryParam: string) => {
      if (query[queryParam] !== void 0) {
        const value = encodeURIComponent(query[queryParam]);
        queryString += `${encodeURIComponent(queryParam)}=${value}&`;
      }
    });
  }
  // Remove trailing &
  queryString = queryString
    ? queryString.substr(0, queryString.length - 1)
    : '';
  // Append ?
  return queryString ? `?${queryString}` : '';
}

export { xhrGeneric, buildQuery };
