"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerReportUnsupportedLanguages = void 0;
var business_settings_api_1 = require("@wix/business-settings-api");
var supportedLocales = new Set([
    'ar',
    'bg',
    'cs',
    'da',
    'de',
    'el',
    'en',
    'es',
    'fi',
    'fr',
    'he',
    'hi',
    'hu',
    'id',
    'it',
    'ja',
    'ko',
    'lt',
    'ms',
    'nl',
    'no',
    'pl',
    'pt',
    'ro',
    'ru',
    'sv',
    'th',
    'tl',
    'tr',
    'uk',
    'vi',
    'zh',
    'zu',
]);
exports.registerReportUnsupportedLanguages = function () {
    business_settings_api_1.onFieldChange(function (_a) {
        var changedField = _a.changedField;
        var language = changedField.language;
        if (language && !supportedLocales.has(language)) {
            business_settings_api_1.reportUnsupportedLanguage({ appName: 'Wix Stores', language: language });
        }
    });
};
