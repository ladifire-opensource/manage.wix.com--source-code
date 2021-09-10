import { __awaiter, __generator } from "tslib";
import { allCountriesCodes, getCountryISO2 } from '../../common/languages';
import { FontUpgrade, InfoIcon, Modal, Text, TextButton, } from 'wix-style-react';
import { ChangeLocationModal } from '../../modals/change-location-modal/change-location-modal';
import s from '../../modals/change-location-modal/change-location-modal.scss';
import ChevronDown from 'wix-ui-icons-common/ChevronDown';
import * as React from 'react';
export var AppsToYouChangeLocationModalContainer = function (_a) {
    var selectedCountryCode = _a.selectedCountryCode, updateDisplayedCountry = _a.updateDisplayedCountry, t = _a.t;
    var getDisplayNameFromCountryCode = function (countryCode) {
        var countryKey = "marketplace.country." + getCountryISO2(countryCode);
        return t(countryKey);
    };
    var getCountryData = function (countryCode) {
        return {
            shortKey: countryCode,
            displayName: getDisplayNameFromCountryCode(countryCode),
        };
    };
    var countries = allCountriesCodes.map(function (countryCode) {
        return getCountryData(countryCode);
    });
    // tslint:disable-next-line:react-hooks-nesting
    var _b = React.useState(getCountryData(selectedCountryCode)), selectedCountry = _b[0], setSelectedCountry = _b[1];
    // tslint:disable-next-line:react-hooks-nesting
    var _c = React.useState(false), isModalOpen = _c[0], setIsModalOpen = _c[1];
    // tslint:disable-next-line:react-hooks-nesting
    var _d = React.useState(true), isDisableConfirmation = _d[0], setIsDisableConfirmation = _d[1];
    var handleChoose = function (newSelectedCountryKey) { return __awaiter(void 0, void 0, void 0, function () {
        var newSelectedCountry;
        return __generator(this, function (_a) {
            newSelectedCountry = countries.filter(function (country) { return (country === null || country === void 0 ? void 0 : country.shortKey) === newSelectedCountryKey; })[0];
            updateDisplayedCountry(newSelectedCountry.shortKey);
            setSelectedCountry(newSelectedCountry);
            setIsDisableConfirmation(true);
            setIsModalOpen(false);
            return [2 /*return*/];
        });
    }); };
    var onSelect = function (currentSelectedCountryKey) {
        if (currentSelectedCountryKey !== (selectedCountry === null || selectedCountry === void 0 ? void 0 : selectedCountry.shortKey)) {
            setIsDisableConfirmation(false);
        }
    };
    var handleDataSource = function (searchQuery) {
        var items = filterBySearchQuery(searchQuery);
        return Promise.resolve({
            totalCount: items.length,
            items: items,
        });
    };
    var filterBySearchQuery = function (searchQuery) {
        return searchCountryByCountryData(countries, searchQuery).map(function (_a) {
            var shortKey = _a.shortKey, displayName = _a.displayName;
            var isSelected = selectedCountry.shortKey === shortKey;
            return {
                id: shortKey,
                title: displayName,
                selected: isSelected,
            };
        });
    };
    var handleOpen = function () {
        setIsModalOpen(true);
    };
    var handleClose = function () {
        setIsModalOpen(false);
    };
    return (React.createElement(FontUpgrade, null,
        React.createElement("div", { className: s.changeLocationModalWrapper },
            React.createElement(Text, { secondary: true }, t('change-location-modal.business-location')),
            React.createElement(TextButton, { weight: 'thin', underline: 'always', onClick: handleOpen, suffixIcon: React.createElement(ChevronDown, { size: "1em" }), className: s.textButton }, selectedCountry.displayName),
            React.createElement("div", { className: s.infoIconWrapper },
                React.createElement(InfoIcon, { size: "small", content: t('change-location-modal.info-icon.tooltip') })),
            React.createElement(Modal, { isOpen: isModalOpen, onRequestClose: handleClose },
                React.createElement(ChangeLocationModal, { handleDataSource: handleDataSource, onChoose: handleChoose, onClose: handleClose, disableConfirmation: isDisableConfirmation, onSelect: onSelect, t: t })))));
};
function searchCountryByCountryData(countriesData, searchQuery) {
    return countriesData.filter(function (_a) {
        var displayName = _a.displayName, key = _a.key, shortKey = _a.shortKey;
        var query = searchQuery.toLowerCase();
        return ((displayName === null || displayName === void 0 ? void 0 : displayName.toLowerCase().startsWith(query)) || (key === null || key === void 0 ? void 0 : key.toLowerCase().startsWith(query)) || (shortKey === null || shortKey === void 0 ? void 0 : shortKey.toLowerCase().startsWith(query)));
    });
}
//# sourceMappingURL=apps-to-you-change-location-modal-container.js.map