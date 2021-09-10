"use strict";

try {
    angular.module("styleTranslations");
} catch (e) {
    angular.module("styleTranslations", [ "pascalprecht.translate" ]);
}

angular.module("styleTranslations").config([ "$translateProvider", function($translateProvider) {
    var translations = {
        general: {
            YO: "Hello"
        },
        calendar: {
            clear: "clear"
        }
    };
    $translateProvider.translations("en", translations);
    $translateProvider.translations(translations);
    if ($translateProvider.preferredLanguage) {
        $translateProvider.preferredLanguage("en");
    }
} ]).value("preferredLanguage", "en");