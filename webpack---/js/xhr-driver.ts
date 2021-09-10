import { readCookieData } from './utils';

const XSRF_COOKIE_NAME = 'XSRF-TOKEN';
const XSRF_HEADER_NAME = 'x-xsrf-token';

function xhrPost(
  uri: string,
  successCallback: Function,
  errorCallback: Function,
  postBody: string,
  authorization?: string,
) {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', uri, true);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      const status = xhr.status;
      if (status < 200 || status >= 300) {
        runCallback(errorCallback, status);
      } else {
        runCallback(successCallback, xhr.responseText);
      }
    }
  };
  xhr.setRequestHeader('content-type', 'application/json');
  if (authorization) {
    xhr.setRequestHeader('authorization', authorization);
  }
  const xsrfHeader = readCookieData(XSRF_COOKIE_NAME);
  if (xsrfHeader) {
    xhr.setRequestHeader(XSRF_HEADER_NAME, xsrfHeader);
  }
  xhr.send(postBody || null);
}

function runCallback(callback: Function, data: any) {
  try {
    if (typeof callback === 'function') {
      callback(data);
    }
  } catch (e) {
    console && console.error(e);
  }
}

export { xhrPost };
