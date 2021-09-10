import i18next from 'i18next';
export var i18nInit = function (locale, messages) {
    var instance = i18next.createInstance();
    instance.use({
        type: 'backend',
        read: function (_language, _namespace, callback) {
            callback(null, messages);
        },
    });
    instance
        .init({
        lng: locale,
        fallbackLng: 'en',
        keySeparator: false,
        react: {
            wait: true,
        },
        interpolation: { escapeValue: false },
    })
        .catch(console.error);
    return instance;
};
//# sourceMappingURL=i18n-init.js.map