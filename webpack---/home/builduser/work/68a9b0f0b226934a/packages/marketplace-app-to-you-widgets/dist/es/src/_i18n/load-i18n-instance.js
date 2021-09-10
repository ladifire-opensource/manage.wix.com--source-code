import { __awaiter, __generator } from "tslib";
import { i18nInit } from './i18n-init';
import { getMessages } from '@wix/app-market-collection-widget';
export var loadI18nInstance = function (setI18nInstance, locale) { return __awaiter(void 0, void 0, void 0, function () {
    var messages, instance, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!locale) {
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, getMessages(locale)];
            case 2:
                messages = _a.sent();
                instance = i18nInit(locale, messages);
                setI18nInstance(instance);
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                console.log(e_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=load-i18n-instance.js.map