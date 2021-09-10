import { __extends } from "tslib";
import * as React from 'react';
import { ConnectivityIndicator } from './ConnectivityIndicator';
import { Beeper } from './Beeper';
import { Text, TextButton, DropdownBase, SidebarDivider } from 'wix-style-react';
import { findIndex } from 'lodash';
import { Clock } from './Clock';
import classNames from 'classnames';
import { ConnectivityIndicatorTooltip } from './ConnectivityIndicatorTooltip';
import { getBusinessSettings } from '@wix/business-settings-api';
import getTime from './GetTime';
import { ModuleRegistry } from 'react-module-container';
import { SidebarTooltip } from '../../SidebarTooltip/SidebarTooltip';
var styles = require('./RestaurantsFooter.scss');
export var TOOLTIPS_Z_INDEX = 10;
var languageToOption = function (lang, index) {
    var _a;
    var classes = classNames(styles.localeSwitcherContent, (_a = {},
        _a[styles.rtl] = lang.dir === 'rtl',
        _a[styles.selected] = !!lang.selected,
        _a));
    return ({
        id: index,
        value: React.createElement("div", { className: classes }, lang.name)
    });
};
var RestaurantsFooter = /** @class */ (function (_super) {
    __extends(RestaurantsFooter, _super);
    function RestaurantsFooter(props) {
        var _this = _super.call(this, props) || this;
        _this.handleBusinessSettings = function (_a) {
            var timezone = _a.timezone;
            _this.setState({ timezone: timezone });
        };
        _this.toggleBeeper = function (beeperEnabled) {
            _this.setState({
                beeperEnabled: beeperEnabled
            });
        };
        _this.toggleOnline = function (isOnline) {
            _this.setState({ isOnline: isOnline });
        };
        _this.handleBeeperClick = function () {
            _this.setState({ beeperEnabled: !_this.state.beeperEnabled });
            ModuleRegistry.notifyListeners('businessManager.onBeeperClick');
        };
        _this.checkSound = function () {
            _this.audioElement.play();
        };
        _this.toggleLocaleButton = function (showLocaleButton) {
            _this.setState({ showLocaleButton: showLocaleButton });
        };
        _this.setLocaleOptions = function (languages) {
            if (_this.state.noOptions && languages) {
                var selectedId = findIndex(languages, { selected: true });
                var languageOptions = languages.map(languageToOption);
                _this.setState({ languageOptions: languageOptions, noOptions: false, selectedId: selectedId });
            }
        };
        _this.handleLocaleChange = function (selectedOption) {
            var selectedId = _this.state.selectedId;
            if (selectedId !== selectedOption.id) {
                ModuleRegistry.notifyListeners('businessManager.onLocaleChange');
                _this.setState({ selectedId: selectedOption.id, noOptions: false });
                ModuleRegistry.notifyListeners('businessManager.setLocaleOptions');
            }
        };
        _this.state = {
            beeperEnabled: undefined,
            isOnline: true,
            showLocaleButton: false,
            noOptions: true,
            selectedId: null,
            showOptions: false,
            languageOptions: []
        };
        return _this;
    }
    RestaurantsFooter.prototype.componentDidMount = function () {
        var _this = this;
        ModuleRegistry.registerMethod('businessManager.onSoundCheck', function () { return _this.checkSound; });
        ModuleRegistry.registerMethod('businessManager.toggleBeeper', function () { return _this.toggleBeeper; });
        ModuleRegistry.registerMethod('businessManager.handleBusinessSettings', function () { return _this.handleBusinessSettings; });
        ModuleRegistry.registerMethod('businessManager.toggleOnline', function () { return _this.toggleOnline; });
        ModuleRegistry.registerMethod('businessManager.toggleLocaleButton', function () { return _this.toggleLocaleButton; });
        ModuleRegistry.registerMethod('businessManager.setLocaleOptions', function () { return _this.setLocaleOptions; });
        var businessSettingsPromise = getBusinessSettings(this.props.metaSiteId);
        businessSettingsPromise && businessSettingsPromise.then(this.handleBusinessSettings);
    };
    RestaurantsFooter.prototype.renderSpeaker = function () {
        var _this = this;
        var beeperEnabled = this.state.beeperEnabled;
        var beeperEnabledState = beeperEnabled ? 'On' : 'Off';
        var beepBlob = { url: 'https://storage.googleapis.com/openrest-static/olo/beep.mp3' };
        if (beeperEnabled === undefined) {
            return null;
        }
        var tooltipContent = (React.createElement("div", { className: styles.beeperTooltip },
            React.createElement(Text, { weight: "normal", size: "small", dataHook: "restBeeperTitle" }, this.props.t("sidebar.restaurantsFooter.beeper" + beeperEnabledState)),
            React.createElement(Text, { size: "small", secondary: true, dataHook: "restBeeperDesc" }, this.props.t("sidebar.restaurantsFooter.beeper" + beeperEnabledState + "Description")),
            beeperEnabled &&
                React.createElement("span", { onClick: this.checkSound },
                    React.createElement(TextButton, { size: "small", dataHook: "restBeeperTitleLink" },
                        React.createElement("audio", { ref: function (element) { return _this.audioElement = element; }, preload: "preload" },
                            React.createElement("source", { src: beepBlob.url, type: "audio/mpeg" })),
                        this.props.t("sidebar.restaurantsFooter.beeperOnCheckSound")))));
        return (React.createElement("div", { "data-hook": "beeper-container" },
            React.createElement(SidebarTooltip, { popoverContent: tooltipContent, dataHook: "beeperTooltip", zIndex: TOOLTIPS_Z_INDEX, exitDelay: 400, moveBy: { y: 5 }, placement: "top" },
                React.createElement("div", null,
                    React.createElement(Beeper, { enabled: beeperEnabled, onClick: this.handleBeeperClick })))));
    };
    RestaurantsFooter.prototype.renderLocaleObj = function () {
        var _this = this;
        if (!this.state.showLocaleButton) {
            return null;
        }
        return (React.createElement("div", { className: styles.localeDropDown },
            React.createElement(DropdownBase, { "data-hook": "story-dropdown-base-uncontrolled-icon", showArrow: true, appendTo: document.body, minWidth: 1, options: !this.state.noOptions ? this.state.languageOptions : [], onSelect: function (selectedOption) { return _this.handleLocaleChange(selectedOption); }, selectedId: this.state.selectedId }, function (_a) {
                var open = _a.open, close = _a.close;
                return (React.createElement("div", { onMouseEnter: open, onMouseLeave: close, className: styles.langsIcon }));
            })));
    };
    RestaurantsFooter.prototype.renderConnectivityIndicator = function () {
        var isOnline = this.state.isOnline;
        var _a = this.props, t = _a.t, locale = _a.locale;
        return (React.createElement("div", { "data-hook": "connectivity-indicator-wrapper" },
            React.createElement(ConnectivityIndicatorTooltip, { t: t, locale: locale, isOnline: isOnline },
                React.createElement(ConnectivityIndicator, { online: isOnline }))));
    };
    RestaurantsFooter.prototype.render = function () {
        var _a;
        var useNewDashboardEnabled = this.props.useNewDashboardEnabled;
        return (React.createElement(React.Fragment, null,
            useNewDashboardEnabled && React.createElement(SidebarDivider, { fullWidth: true }),
            React.createElement("div", { className: classNames(styles.restaurantsFooter, (_a = {}, _a[styles.useNewDashboardEnabled] = useNewDashboardEnabled, _a)), "data-hook": "restaurantsFooter" },
                React.createElement("div", { className: styles.clock },
                    this.renderConnectivityIndicator(),
                    React.createElement(Clock, { timezone: this.state.timezone, locale: this.props.locale, getTime: this.props.getTime })),
                this.renderSpeaker(),
                this.state.showLocaleButton && this.renderLocaleObj())));
    };
    RestaurantsFooter.defaultProps = {
        getTime: getTime
    };
    return RestaurantsFooter;
}(React.PureComponent));
export default RestaurantsFooter;
//# sourceMappingURL=RestaurantsFooter.js.map