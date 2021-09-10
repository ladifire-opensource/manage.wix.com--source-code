import { AppMarketWidget, } from '@wix/marketplace-interfaces';
import { biLogger } from './index';
export var getSolutionBiData = function (solutionsBiData, index) {
    if (solutionsBiData && solutionsBiData.length > index) {
        return solutionsBiData[index];
    }
};
export var sendOpenSolutionPageBi = function (biData) {
    if (biData) {
        biLogger
            .appModalOpenAppModalClick({
            app_id: biData.appId,
            index: biData.index,
            market: biData.market,
            tag_name: biData.tagName,
            tag_type: biData.tagType,
            msid: biData.msid,
            section: biData.section,
            referral_info: biData.referralInfo,
            search_term: biData.searchTerm,
            widget_referral: biData.widgetReferral,
            collimp_id: biData.collimp_id,
            slug_id: biData.referralSectionName || biData.section,
        })
            .catch(function (e) { return console.log(e); });
    }
};
export var sendSolutionImpressionBi = function (biData) {
    if (biData) {
        biLogger
            .appMarketAppImpression({
            app_id: biData.appId,
            index: biData.index,
            market: biData.market,
            tag_name: biData.tagName,
            tag_type: biData.tagType,
            msid: biData.msid,
            impression_type: biData.impressionType,
            section: biData.section,
            search_term: biData.searchTerm,
            badge_name: biData.isBundleAppInstalled || biData.isBundleAppNotInstalled
                ? 'premium_benefit'
                : '',
            slug_id: biData.referralSectionName || biData.section,
        })
            .catch(function (e) { return console.log(e); });
    }
};
export var sendAddClick = function (biData) {
    if (biData) {
        biLogger
            .addAppClick({
            app_id: biData.appId,
            index: biData.index,
            market: biData.market,
            tag_name: biData.tagName,
            tag_type: biData.tagType,
            msid: biData.msid,
            section: biData.section,
            referral_info: biData.referralInfo,
            search_term: biData.searchTerm,
            widget_referral: biData.widgetReferral,
            slug_id: biData.referralSectionName || biData.section,
        })
            .catch(function (e) { return console.log(e); });
    }
};
export var sendOpenClick = function (biData) {
    if (biData) {
        biLogger
            .openAppClick({
            app_id: biData.appId,
            index: biData.index,
            market: biData.market,
            tag_name: biData.tagName,
            tag_type: biData.tagType,
            msid: biData.msid,
            section: biData.section,
            search_term: biData.searchTerm,
        })
            .catch(function (e) { return console.log(e); });
    }
};
export var sendWidgetClick = function (biData) {
    if (biData) {
        biLogger
            .appMarketWidgetsClickAction({
            // index: biData.index,
            market: biData.market,
            tag_name: biData.tagName,
            tag_name_clicked: biData.tagNameClicked,
            tag_type: biData.tagType,
            tag_type_clicked: biData.tagTypeClicked,
            msid: biData.msid,
            section: biData.section,
        })
            .catch(function (e) { return console.log(e); });
    }
};
export var sendWidgetNavigation = function (biData, direction) {
    if (biData) {
        biLogger
            .appMarketWidgetsNavigationClick({
            // index: biData.index,
            market: biData.market,
            tag_name: biData.tagName,
            tag_type: biData.tagType,
            msid: biData.msid,
            section: biData.section,
            direction: direction,
        })
            .catch(function (e) { return console.log(e); });
    }
};
export var sendAddMoreAppsClickBi = function (biData) {
    //todo: delete after finance migration
    if (biData) {
        biLogger
            .manageAppsAddApp({
            // index: biData.index,
            market: biData.market,
            msid: biData.msid,
            referral_info: AppMarketWidget.FINANCE_INTEGRATIONS,
        })
            .catch(function (e) { return console.log(e); });
    }
};
export var sendFinanceAddMoreAppsClickBi = function (msid) {
    if (msid) {
        biLogger
            .manageAppsAddApp({
            // index: biData.index,
            market: 'dashboard',
            msid: msid,
            referral_info: AppMarketWidget.FINANCE_INTEGRATIONS,
        })
            .catch(function (e) { return console.log(e); });
    }
};
export var sendFinanceIntegrationsWidgetLoadedBi = function (msid) {
    biLogger
        .appMarketWidgetLoaded({
        origin: AppMarketWidget.FINANCE_INTEGRATIONS,
        widget_name: AppMarketWidget.FINANCE_INTEGRATIONS,
        msid: msid,
    })
        .catch(function (e) { return console.log(e); });
};
//# sourceMappingURL=events.js.map