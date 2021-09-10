var rtlLocales = ['ar', 'he'];
export var cleanRegion = function (locale) { return locale.replace(/_.+/, ''); };
export var isRtl = function (locale) { return rtlLocales.includes(cleanRegion(locale)); };
//# sourceMappingURL=LanguageOverride.js.map