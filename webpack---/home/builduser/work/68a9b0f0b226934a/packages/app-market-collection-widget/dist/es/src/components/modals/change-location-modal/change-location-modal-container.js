import { __awaiter, __decorate, __extends, __generator } from "tslib";
import { withTranslation } from '../../../component-decorators/with-translation';
import React from 'react';
import { ChangeLocationModal } from './change-location-modal';
import { InfoIcon, Modal, Text, TextButton } from 'wix-style-react';
import ChevronDown from 'wix-ui-icons-common/ChevronDown';
import s from './change-location-modal.scss';
var ChangeLocationModalContainer = /** @class */ (function (_super) {
    __extends(ChangeLocationModalContainer, _super);
    function ChangeLocationModalContainer(props) {
        var _this = _super.call(this, props) || this;
        _this.handleDataSource = function (searchQuery) {
            var items = _this.filterBySearchQuery(searchQuery);
            return Promise.resolve({
                totalCount: items.length,
                items: items,
            });
        };
        _this.filterBySearchQuery = function (searchQuery) {
            return _this.props.countries
                .filter(function (_a) {
                var displayName = _a.displayName, key = _a.key, shortKey = _a.shortKey;
                var query = searchQuery.toLowerCase();
                return (displayName.toLowerCase().startsWith(query) ||
                    key.toLowerCase().startsWith(query) ||
                    shortKey.toLowerCase().startsWith(query));
            })
                .map(function (_a) {
                var shortKey = _a.shortKey, displayName = _a.displayName;
                var isSelected = _this.state.selectedCountry.shortKey === shortKey;
                return {
                    id: shortKey,
                    title: displayName,
                    selected: isSelected,
                };
            });
        };
        _this.handleOpen = function () { return _this.setState({ isModalOpen: true }); };
        _this.handleClose = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.setState({ isModalOpen: false });
                return [2 /*return*/];
            });
        }); };
        _this.handleChoose = function (selectedCountryKey) { return __awaiter(_this, void 0, void 0, function () {
            var selectedCountry;
            return __generator(this, function (_a) {
                selectedCountry = this.props.countries.filter(function (country) { return country.shortKey === selectedCountryKey; })[0];
                this.props.updateDisplayedCountry(selectedCountry);
                this.setState({ selectedCountry: selectedCountry, disableConfirmation: true });
                return [2 /*return*/];
            });
        }); };
        _this.onSelect = function (selectedCountryKey) {
            if (selectedCountryKey !== _this.props.displayedCountry.shortKey) {
                _this.setState({ disableConfirmation: false });
            }
        };
        _this.filterBySearchQuery = _this.filterBySearchQuery.bind(_this);
        _this.handleClose = _this.handleClose.bind(_this);
        _this.handleChoose = _this.handleChoose.bind(_this);
        _this.handleOpen = _this.handleOpen.bind(_this);
        _this.handleDataSource = _this.handleDataSource.bind(_this);
        _this.onSelect = _this.onSelect.bind(_this);
        _this.state = {
            selectedCountry: _this.props.displayedCountry,
            isModalOpen: false,
            disableConfirmation: true,
        };
        return _this;
    }
    ChangeLocationModalContainer.prototype.render = function () {
        var _a = this.props, t = _a.t, displayedCountry = _a.displayedCountry;
        var isModalOpen = this.state.isModalOpen;
        return (React.createElement("div", { className: s.changeLocationModalWrapper },
            React.createElement(Text, { secondary: true }, t('change-location-modal.business-location')),
            React.createElement(TextButton, { weight: 'thin', underline: 'always', onClick: this.handleOpen, suffixIcon: React.createElement(ChevronDown, { size: "1em" }), className: s.textButton }, displayedCountry.displayName),
            React.createElement("div", { className: s.infoIconWrapper },
                React.createElement(InfoIcon, { size: "small", content: t('change-location-modal.info-icon.tooltip') })),
            React.createElement(Modal, { isOpen: isModalOpen, onRequestClose: this.handleClose },
                React.createElement(ChangeLocationModal, { handleDataSource: this.handleDataSource, onChoose: this.handleChoose, onClose: this.handleClose, disableConfirmation: this.state.disableConfirmation, onSelect: this.onSelect, t: t }))));
    };
    ChangeLocationModalContainer = __decorate([
        withTranslation
    ], ChangeLocationModalContainer);
    return ChangeLocationModalContainer;
}(React.Component));
export { ChangeLocationModalContainer };
//# sourceMappingURL=change-location-modal-container.js.map