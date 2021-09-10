// URLSearchParams are not supported in IE11
import URLSearchParams = require('@ungap/url-search-params/cjs');

const NODE_ENV = ((process && process.env.NODE_ENV) || '').toLowerCase();
const cookie = window.document.cookie;
export const isAutomation = cookie.includes('automation=true') || cookie.includes('automation=automation');
export const isProduction = NODE_ENV === 'production';
export const isDevelopment = NODE_ENV === 'development';
export const isTest = NODE_ENV === 'test';
export const isProdStorybook = window.location.href.includes('pages/cashier-merchant-settings');

const searchParams = new URLSearchParams(document.location.search);
export const isDebug = searchParams && searchParams.has('debug');
