import { __assign, __extends } from "tslib";
import * as React from 'react';
import { Button, Popover, Text, Box } from 'wix-style-react';
import { withTranslation } from '@wix/wix-i18n-config';
import { connect } from 'react-redux';
import { PremiumState } from '../../reducers/premium-state-reducer';
import { hasPermissions } from '../../selectors/select-has-permissions';
import { managePremiumPermission } from '../../permissions';
import { log, BIEvent, BISource } from '../../services/biLogger';
import { selectMetaSiteId, selectLocale } from '../../selectors/select-basic-aspects';
import css from './Footer.scss';
import { experimentsSelectors } from '@wix/wix-experiments-redux';
import { ExternalPageId, getPageComponentLinkComponent } from '@wix/business-manager-api';
export var UPGRADE_KEY = 'sidebar.upgrade';
export var SECOND_UPGRADE_KEY = 'sidebar.upgrade';
export var upgradeTooltipLearnMore = 'sidebar.upgrade.tooltip.learnMoreLink';
export var upgradeTooltipText = 'sidebar.upgrade.tooltip';
export var noPermissionsSupportArticle = '/article/roles-permissions-information-for-site-collaborators';
export var tooltipClickBiEventName = 'noPermissionsSupportLink';
export var tooltipClickBiEventOrigin = 'sidebar.upgradeButton.tooltip';
var UpgradeButtonView = /** @class */ (function (_super) {
    __extends(UpgradeButtonView, _super);
    function UpgradeButtonView(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            showDisabledTooltip: false
        };
        return _this;
    }
    UpgradeButtonView.prototype.render = function () {
        var _this = this;
        var _a = this.props, t = _a.t, premiumState = _a.premiumState, msid = _a.msid, hasPermission = _a.hasPermission, biParams = _a.biParams, isNewDashboardEnabled = _a.isNewDashboardEnabled, locale = _a.locale;
        var showDisabledTooltip = this.state.showDisabledTooltip;
        if (premiumState === PremiumState.PREMIUM_MAX || premiumState === PremiumState.UNDETERMINED) {
            return null;
        }
        var url = "/wix/api/premiumStart?siteGuid=" + msid + "&referralAdditionalInfo=bizMgrSidebar";
        var handleClick = function () {
            sendUpgradeClickBi();
            window.open(url);
        };
        var sendUpgradeClickBi = function () {
            log(__assign(__assign({}, biParams), { src: BISource.myAccount, evid: BIEvent.UPGRADE_BUTTON_CLICKED, origin: 'sidebar' }));
        };
        var sendNoPermissionsLearnMoreClickBi = function () {
            log(__assign(__assign({}, biParams), { src: BISource.myAccount, evid: BIEvent.TOOLTIP_LINK_CLICKED, name: tooltipClickBiEventName, origin: tooltipClickBiEventOrigin }));
        };
        var disabled = !hasPermission;
        var key = premiumState === PremiumState.PREMIUM ? SECOND_UPGRADE_KEY : UPGRADE_KEY;
        var priority = premiumState === PremiumState.PREMIUM ? 'secondary' : 'primary';
        var button = (React.createElement(Button, { skin: "premium-light", dataHook: "sidebar-upgrade-button", onClick: handleClick, size: "small", disabled: disabled, priority: priority, className: isNewDashboardEnabled ? css.newDashboardOverride : null }, t(key)));
        if (disabled) {
            var contextData = { article: noPermissionsSupportArticle, locale: locale };
            var PageComponentLink = getPageComponentLinkComponent();
            return (React.createElement("div", null,
                React.createElement(Popover, { dataHook: "business-manager-disabled-upgrade-button-popover", maxWidth: 180, shown: showDisabledTooltip, placement: "right-end", moveBy: { x: 12, y: 0 }, showArrow: true, animate: true, appendTo: "window", onMouseEnter: function () { return _this.setState({ showDisabledTooltip: true }); }, onMouseLeave: function () { return _this.setState({ showDisabledTooltip: false }); } },
                    React.createElement(Popover.Content, null,
                        React.createElement(Box, { direction: "vertical", padding: "11px 24px" },
                            React.createElement(Text, { dataHook: "business-manager-disabled-upgrade-button-popover-text", weight: "thin", size: "small", secondary: true }, t(upgradeTooltipText)),
                            React.createElement(Text, { dataHook: "business-manager-disabled-upgrade-button-popover-link-wrapper", size: "small", weight: "thin" },
                                React.createElement(PageComponentLink, { pageComponentId: ExternalPageId.Support, openInNewTab: true, contextData: contextData, onClick: sendNoPermissionsLearnMoreClickBi }, t(upgradeTooltipLearnMore))))),
                    React.createElement(Popover.Element, null, button))));
        }
        return button;
    };
    return UpgradeButtonView;
}(React.Component));
var mapStateToProps = function (state) { return ({
    premiumState: state.premiumState,
    msid: selectMetaSiteId(state),
    locale: selectLocale(state),
    hasPermission: hasPermissions(state, managePremiumPermission),
    biParams: state.biParams,
    isNewDashboardEnabled: experimentsSelectors(state).enabled('specs.wos1.useNewDashboard2020')
}); };
export var UpgradeButton = connect(mapStateToProps)(withTranslation()(UpgradeButtonView));
//# sourceMappingURL=UpgradeButton.js.map