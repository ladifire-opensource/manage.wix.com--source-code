import { __awaiter, __generator } from "tslib";
import abTranslate from 'ab-translate/dist/src/abTranslate-runtime';
import { initI18n } from '@wix/wix-i18n-config';
import axios from 'axios';
export var configureI18N = function (_a) {
    var locale = _a.locale, translationsUrl = _a.translationsUrl, experiments = _a.experiments;
    return initI18n({
        locale: locale,
        asyncMessagesLoader: function (lng) { return __awaiter(void 0, void 0, void 0, function () {
            var loadPath, translations;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        loadPath = translationsUrl + "assets/locales/messages_" + lng + ".json";
                        return [4 /*yield*/, axios.get(loadPath)];
                    case 1:
                        translations = (_a.sent()).data;
                        return [2 /*return*/, abTranslate(experiments, translations)];
                }
            });
        }); }
    });
};
//# sourceMappingURL=i18n-config.js.map