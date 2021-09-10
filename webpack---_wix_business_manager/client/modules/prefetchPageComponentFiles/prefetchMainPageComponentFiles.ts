import * as URI from 'urijs';
import { IState } from '../../types/store';
import { getMainPageComponentFiles } from './getMainPageComponentFiles';
import { getAppPath } from '../../routes';
import { appendLinkElement } from './appendLinkElement';

export const prefetch = (files: any[]) => {
  const fragment = document.createDocumentFragment();
  files.forEach(item => appendLinkElement(item, fragment));
  document.head.appendChild(fragment);
};

const getComponentPath = (state, url): string => {
  const appPath = getAppPath(state, url);
  const parts = URI(appPath).segment();
  const componentPath = parts.splice(1).join('/');
  return componentPath;
};

export const prefetchMainPageComponentFiles = (state: IState) => {
  try {
    const componentPath = getComponentPath(state, window.location.href);
    const files = getMainPageComponentFiles({ state, componentPath });
    prefetch(files);
  } catch (error) {
    console.error('prefetchMainPageComponentFiles failed', error); // tslint:disable-line:no-console
  }
};
