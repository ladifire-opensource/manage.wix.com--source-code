import { __awaiter, __generator } from "tslib";
import * as React from 'react';
import { ChangeLocationModal as ChangeLocationModalBase } from '@wix/app-market-collection-widget';
import { useEffect, useState } from 'react';
export var ChangeLocationModal = function (_a) {
    var locale = _a.locale, getAppsCollectionAccordingToCountryCode = _a.getAppsCollectionAccordingToCountryCode, i18n = _a.i18n, countryCode = _a.countryCode;
    var _b = useState(countryCode), selectedCountryCode = _b[0], setSelectedCountryCode = _b[1];
    var handleCountryCode = function (newCountryCode) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            getAppsCollectionAccordingToCountryCode(newCountryCode);
            setSelectedCountryCode(newCountryCode);
            return [2 /*return*/];
        });
    }); };
    useEffect(function () {
        handleCountryCode(selectedCountryCode);
    }, []);
    var updateDisplayedCountry = function (newCountryCode) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, handleCountryCode(newCountryCode)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    return selectedCountryCode ? (React.createElement(ChangeLocationModalBase, { locale: locale, selectedCountryCode: selectedCountryCode, updateDisplayedCountry: updateDisplayedCountry, i18n: i18n })) : (React.createElement("div", null));
};
//# sourceMappingURL=change-location-modal.js.map