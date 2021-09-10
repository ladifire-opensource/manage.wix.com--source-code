import { FIVE_MINUTES_IN_SECONDS, MOBILE_MEDIA_QUERY } from '../constants';
import { addGlobalStyles } from './add-global-styles';

import { ActiveSession } from './api';

export { addGlobalStyles };
export { getRect, getMaxXY, moveTo } from './dom';
export { h } from './h';

export const isNumber = (val: unknown): val is number => {
  return typeof val === 'number';
};

export const isString = (val: unknown): val is string => {
  return typeof val === 'string';
};

export const isElement = (val: unknown): val is Element => {
  return val instanceof Element;
};

export function a11yFocus(node: HTMLElement): void {
  setTimeout(() => {
    node.focus();
  }, 50);
}

export const isMobile = window.matchMedia(MOBILE_MEDIA_QUERY).matches;

export const getQueryParam = (url: string, paramName: string): string | null =>
  new URL(url).searchParams.get(paramName);

export const isSessionActive = (
  activeSession: ActiveSession | null,
): activeSession is ActiveSession =>
  Boolean(
    activeSession &&
      typeof activeSession.secondsSinceLastActivity === 'number' &&
      activeSession.secondsSinceLastActivity < FIVE_MINUTES_IN_SECONDS,
  );

export const buildWidgetUrl = (
  url: string,
  queryParams: { [key: string]: string } = {},
) => {
  const createdUrl = new URL(url);
  const params = {
    referral_url: document.location.href,
    ...queryParams,
  };
  Object.entries(params).forEach(([paramName, paramValue]) => {
    createdUrl.searchParams.set(paramName, paramValue);
  });
  return createdUrl.href;
};
