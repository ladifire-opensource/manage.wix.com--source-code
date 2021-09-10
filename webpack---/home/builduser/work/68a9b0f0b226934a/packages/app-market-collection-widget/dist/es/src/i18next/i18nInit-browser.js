import i18next from 'i18next';
var instance;
export var i18nInit = function (locale) {
    if (instance) {
        return instance;
    }
    instance = i18next.createInstance();
    instance.use({
        type: 'backend',
        read: function (language, _namespace, callback) {
            return import("../locales/messages_" + language + ".json")
                .then(function (translation) {
                return callback(null, translation);
            })
                .catch(function (error) { return callback(error); });
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
//# sourceMappingURL=i18nInit-browser.js.map