import React, { Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';
import { i18nInit } from './i18nInit-browser';
import { getI18nSSRInitator } from './i18nInit-server';
var isBrowser = function () { return typeof window !== 'undefined'; };
var i18nConfig = {};
export var getI18nInstance = function () { return i18nConfig.i18n; };
var setI18nInstance = function (i18n) {
    i18nConfig.i18n = i18n;
};
export var TranslationsProvider = function (_a) {
    var locale = _a.locale, children = _a.children, i18n = _a.i18n;
    if (i18n) {
        setI18nInstance(i18n);
        return children;
    }
    if (isBrowser()) {
        return (React.createElement(I18nextProvider, { i18n: i18nInit(locale) }, children));
    }
    var i18nInitSSR = getI18nSSRInitator();
    return (React.createElement(Suspense, { fallback: null },
        React.createElement(SSRI18nextProvider, { locale: locale, i18nInitSSR: i18nInitSSR }, children)));
};
var SSRI18nextProvider = function (_a) {
    var locale = _a.locale, children = _a.children, i18nInitSSR = _a.i18nInitSSR;
    var i18nResources = i18nInitSSR(locale);
    return React.createElement(I18nextProvider, { i18n: i18nResources }, children);
};
//# sourceMappingURL=translations-provider.js.map