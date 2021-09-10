import i18next from 'i18next';
export var getI18nSSRInitator = function () {
    var promise;
    var loaded = false;
    var instance;
    return function (locale) {
        if (loaded) {
            return instance;
        }
        if (!promise) {
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
            promise = instance
                .init({
                lng: locale,
                fallbackLng: 'en',
                keySeparator: false,
                react: {
                    wait: true,
                },
                interpolation: { escapeValue: false },
            })
                .then(function () { return (loaded = true); });
        }
        throw promise;
    };
};
//# sourceMappingURL=i18nInit-server.js.map