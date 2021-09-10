import { __assign, __extends, __rest } from "tslib";
import * as React from 'react';
import { ModuleRegistry } from 'react-module-container';
import { Provider } from 'react-redux';
import { fetchSidebarNodes } from '../../actions/fetch-sidebar-nodes';
import { configureStore } from '../../configure-store';
import { updateActiveId } from '../../actions/update-active-id';
import { extractPagePath, isAppInstalled, appDefIds } from '@wix/business-manager-api';
import { buildFindBestMatchingEntry } from '../../services/find-best-matching-entry';
import { I18nextProvider } from '@wix/wix-i18n-config';
import { configureI18N } from '../../services/i18n-config';
import { buildServerApi } from '../../services/server-api';
import { fetchPremiumState } from '../../actions/set-premium-state';
import { DefaultTooltip } from '../TooltipComponents/DefaultTooltip';
import { AscendTooltip } from '../TooltipComponents/AscendTooltip';
import { registerShowBadgeApi } from '../../api/showBadge';
import { DEFAULT_TOOLTIP } from '../../services/add-tooltip-to-entry';
import { registerHideSidebarApi } from '../../api/hide-sidebar';
import { NewAscendTooltip } from '../TooltipComponents/NewAscendTooltip';
import { BusinessManagerSidebar, BusinessManagerSidebarWrappedWithBi } from './Sidebar';
import { experimentsSelectors } from '@wix/wix-experiments-redux';
import { create } from '@wix/fedops-logger';
import { updateSidebarOnNavigation } from '../../actions/update-sidebar-on-navigation';
import { FontUpgrade, ThemeProvider, WixStyleReactProvider } from 'wix-style-react';
import { theme } from 'wix-style-react/themes/businessDashboard';
import { getIsInExpertsDashboard } from '../../selectors/select-is-in-experts-dashboard';
import { selectIsCollapsible } from '../../selectors/select-is-collapsible';
var buildServices = function (dataBaseUrl) { return ({
    findBestMatchingEntry: buildFindBestMatchingEntry(extractPagePath),
    serverApi: buildServerApi({ dataBaseUrl: dataBaseUrl }),
}); };
var Sidebar = /** @class */ (function (_super) {
    __extends(Sidebar, _super);
    function Sidebar(props) {
        var _this = _super.call(this, props) || this;
        var store = props.store;
        store.dispatch(fetchSidebarNodes());
        store.dispatch(fetchPremiumState());
        ModuleRegistry.registerComponent(DEFAULT_TOOLTIP, function () { return DefaultTooltip; });
        var showNewAscendTooltip = experimentsSelectors(store.getState()).enabled('specs.wos.SidebarNewAscendTooltip');
        ModuleRegistry.registerComponent('sidebar.tooltip.ascend', function () { return showNewAscendTooltip ? NewAscendTooltip : AscendTooltip; });
        return _this;
    }
    Sidebar.prototype.componentDidUpdate = function () {
        this.props.store.dispatch(updateActiveId());
    };
    Sidebar.prototype.getSidebarInstance = function (state) {
        var shouldSendIbOnSidebarActualRender = experimentsSelectors(state).enabled('specs.wosbm.sidebarSendDisplayBiOnActualRender');
        return shouldSendIbOnSidebarActualRender ?
            React.createElement(BusinessManagerSidebar, null) :
            React.createElement(BusinessManagerSidebarWrappedWithBi, null);
    };
    Sidebar.prototype.render = function () {
        var store = this.props.store;
        var state = store.getState();
        var useNewDashboardEnabled = experimentsSelectors(state).enabled('specs.wos1.useNewDashboard2020');
        var isExpertsDashboard = getIsInExpertsDashboard(state);
        var sidebarExperimentCollapsible = selectIsCollapsible(state);
        return (React.createElement(ThemeProvider, { theme: theme({ active: useNewDashboardEnabled }) },
            React.createElement(FontUpgrade, null,
                React.createElement(Provider, { store: store },
                    React.createElement(I18nextProvider, { i18n: this.props.i18n }, !isExpertsDashboard ?
                        React.createElement(WixStyleReactProvider, { as: "span", features: { sidebarExperimentCollapsible: sidebarExperimentCollapsible } }, this.getSidebarInstance(state)) :
                        this.getSidebarInstance(state))))));
    };
    return Sidebar;
}(React.Component));
export var configureSidebar = function (params) {
    var services = params.services, dataBaseUrl = params.dataBaseUrl, translationsBaseUrl = params.translationsBaseUrl, locale = params.locale, experiments = params.experiments, isDebug = params.isDebug, initialState = __rest(params, ["services", "dataBaseUrl", "translationsBaseUrl", "locale", "experiments", "isDebug"]);
    var i18n = configureI18N({ translationsUrl: translationsBaseUrl, locale: locale, experiments: experiments });
    var isInExpertsDashboard = isAppInstalled(appDefIds.wixExpertsDashboard);
    var fedopsLogger = create('business-manager-sidebar', {
        phasesConfig: 'SEND_ON_FINISH'
    });
    fedopsLogger.appLoadStarted();
    var sidebarServices = __assign(__assign({ fedopsLogger: fedopsLogger }, (services || buildServices(dataBaseUrl))), { i18n: i18n });
    var store = configureStore(__assign(__assign({}, initialState), { locale: locale, experiments: experiments, isInExpertsDashboard: isInExpertsDashboard }), sidebarServices, isDebug);
    registerShowBadgeApi(store);
    registerHideSidebarApi(store);
    store.dispatch(updateSidebarOnNavigation());
    return function () { return React.createElement(Sidebar, { store: store, i18n: i18n }); };
};
//# sourceMappingURL=SidebarContainer.js.map