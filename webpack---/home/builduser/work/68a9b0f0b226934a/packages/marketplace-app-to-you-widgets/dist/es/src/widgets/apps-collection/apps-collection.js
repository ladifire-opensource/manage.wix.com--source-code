import { __assign, __awaiter, __generator } from "tslib";
import React, { useState, useEffect } from 'react';
import { SolutionGrid, AppsCollectionPageWrapper, } from '@wix/app-market-collection-widget';
import { ExperimentsProvider, useExperiments, } from '@wix/wix-experiments-react';
import { AppMarketWidget, AppGroup, } from '@wix/marketplace-interfaces';
import { navigateTo, PageComponentId, getCurrentInstance, } from '@wix/business-manager-api';
import axios from 'axios';
import { loadI18nInstance } from '../../_i18n';
import { biLogger } from '../../bi';
import { ChangeLocationModal } from '../change-location-modal';
var METASITE_APP_DEF_ID = '22bef345-3c5b-4c18-b782-74d4085112ff';
var DEFAULT_DOMAIN = 'https://www.wix.com';
var navigateToApp = function (slug, referrer, ctaMetadata) {
    var contextData = {
        appState: "web-solution/" + slug,
        referrer: referrer,
    };
    navigateTo({
        pageComponentId: PageComponentId.AppMarket,
        contextData: contextData,
        payload: { ctaMetadata: ctaMetadata },
    });
};
export var navigateToMarket = function () {
    var contextData = { referrer: AppMarketWidget.FINANCE_INTEGRATIONS };
    navigateTo({ pageComponentId: PageComponentId.AppMarket, contextData: contextData });
};
export var AppsCollection = function (props) {
    function isPageWrapper() {
        return ((props === null || props === void 0 ? void 0 : props.pageWrapperMetadata) ||
            (props === null || props === void 0 ? void 0 : props.collectionTag) === 'financial-integrations');
    }
    return (React.createElement(ExperimentsProvider, { options: { scope: 'app-market-editor' } }, isPageWrapper() ? (React.createElement(AppsCollectionPageWrapper, __assign({ onGoToMarketClick: navigateToMarket }, props),
        React.createElement(AppsCollectionContainer, __assign({}, props)))) : (React.createElement(AppsCollectionContainer, __assign({}, props)))));
};
var AppsCollectionContainer = function (_a) {
    var locale = _a.locale, metaSiteId = _a.metaSiteId, collectionTag = _a.collectionTag, referralInfo = _a.referralInfo, ctaMetadata = _a.ctaMetadata, geoFilter = _a.geoFilter, numberOfLines = _a.numberOfLines, pageWrapperMetadata = _a.pageWrapperMetadata, _b = _a.siteCountryCode, siteCountryCode = _b === void 0 ? 'US' : _b;
    var _c = useState([]), collectionSolutions = _c[0], setCollectionSolutions = _c[1];
    var _d = useState([]), installedSolutions = _d[0], setInstalledSolutions = _d[1];
    var _e = useState([]), bundleSolutions = _e[0], setBundleApps = _e[1];
    var _f = useState([]), solutionsToDisplay = _f[0], setSolutionsToDisplay = _f[1];
    var _g = useState(false), widgetLoaded = _g[0], setWidgetLoaded = _g[1];
    var _h = useState(), i18nInstance = _h[0], setI18nInstance = _h[1];
    var _j = useState(siteCountryCode), countryCode = _j[0], setCountryCode = _j[1];
    var _k = useExperiments({
        suspense: false,
    }), experiments = _k.experiments, areExperimentsReady = _k.ready;
    var loadSolutions = function () { return __awaiter(void 0, void 0, void 0, function () {
        var solutions, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Promise.all([
                            loadCollectionSolutions(collectionTag, locale, countryCode, geoFilter),
                            loadInstalledSolutions(),
                            loadBundleSolutions(),
                        ])];
                case 1:
                    solutions = _a.sent();
                    setSolutions(solutions);
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    useEffect(function () {
        loadSolutions();
    }, [collectionTag, locale, countryCode]);
    var setSolutions = function (_a) {
        var _collectionSolutions = _a[0], _installedSolutions = _a[1], _bundleSolutions = _a[2];
        _collectionSolutions && setCollectionSolutions(_collectionSolutions);
        _installedSolutions && setInstalledSolutions(_installedSolutions);
        _bundleSolutions && setBundleApps(_bundleSolutions);
    };
    useEffect(function () {
        if (!widgetLoaded) {
            sendWidgetLoadedBi(referralInfo, collectionTag, metaSiteId);
            setWidgetLoaded(true);
        }
    }, [collectionTag, metaSiteId]);
    useEffect(function () {
        loadI18nInstance(setI18nInstance, locale);
    }, [locale]);
    useEffect(function () {
        var solutions = getSolutionsToDisplay(collectionSolutions, installedSolutions, bundleSolutions);
        setSolutionsToDisplay(solutions);
    }, [collectionSolutions, installedSolutions, bundleSolutions, countryCode]);
    var handleChangeCountryCode = function (newCountryCode) {
        setCountryCode(newCountryCode);
    };
    var useNewBox = experiments === null || experiments === void 0 ? void 0 : experiments.enabled('specs.marketplace.useNewAppBox');
    return (React.createElement("div", null, i18nInstance && (solutionsToDisplay === null || solutionsToDisplay === void 0 ? void 0 : solutionsToDisplay.length) && areExperimentsReady ? (React.createElement("div", null,
        geoFilter && (React.createElement(ChangeLocationModal, { locale: locale, i18n: i18nInstance, metaSiteId: metaSiteId, getAppsCollectionAccordingToCountryCode: handleChangeCountryCode, countryCode: countryCode })),
        React.createElement(SolutionGrid, { locale: locale, as: "link", solutions: solutionsToDisplay, solutionsBiData: getSolutionsBiData(solutionsToDisplay, metaSiteId, collectionTag, referralInfo), isCompany: true, onBoxClick: function (solution) {
                return navigateToApp(solution.slug, referralInfo || collectionTag, ctaMetadata);
            }, onButtonClick: function (solution) {
                return navigateToApp(solution.slug, referralInfo || collectionTag, ctaMetadata);
            }, onBoxRender: function () { }, i18n: i18nInstance, layout: 'integrations', numberOfLines: numberOfLines, useNewBox: useNewBox }))) : (React.createElement("div", null))));
};
var collectionTagToWidgetName = function (collectionTag) {
    switch (collectionTag) {
        case 'fulfillment-apps':
            return AppMarketWidget.FULLFILLMENT_SERVICES;
        case 'marketing-integrations':
            return AppMarketWidget.MARKETING_INTEGRATIONS;
        case 'marketing-dashboard':
            return AppMarketWidget.MARKETING_HOME;
        default:
            return null;
    }
};
var getSolutionsToDisplay = function (collectionSolutions, installedSolutions, bundleSolutions) {
    return collectionSolutions
        .map(function (solution) { return (__assign(__assign({}, solution), { isInstalled: installedSolutions.some(function (_a) {
            var installed = _a.webSolutionBase;
            return installed.id === solution.id;
        }), isBundleAppNotInstalled: bundleSolutions.length &&
            isBundleAppAndNotInstalled(solution.id, bundleSolutions), isBundleAppInstalled: bundleSolutions.length &&
            isBundleAppAndInstalled(solution.id, bundleSolutions), savedPrice: bundleSolutions.length &&
            getBundleAppSavedPrice(solution.id, bundleSolutions) })); })
        .sort(function (a, b) { return Number(a.isInstalled) - Number(b.isInstalled); });
};
var loadCollectionSolutions = function (collectionTag, locale, countryCode, geoFilter) { return __awaiter(void 0, void 0, void 0, function () {
    var domain, collectionSolutionsUrl, data, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                domain = window.location.hostname === 'localhost'
                    ? DEFAULT_DOMAIN
                    : window.location.origin;
                console.log(countryCode);
                collectionSolutionsUrl = geoFilter
                    ? domain + "/_api/marketplace-api/v1/web-solutions/tags/" + collectionTag + "?lang=" + locale + "&filter=GEO_FILTER&country=" + countryCode
                    : domain + "/_api/marketplace-api/v1/web-solutions/tags/" + collectionTag + "?lang=" + locale + "&order=GEO&country=" + countryCode;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, axios.get(collectionSolutionsUrl)];
            case 2:
                data = (_a.sent()).data;
                return [2 /*return*/, data.webSolutions.map(function (solution) { return solution.baseInfo; })];
            case 3:
                e_2 = _a.sent();
                console.log(e_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
export var loadInstalledSolutions = function () { return __awaiter(void 0, void 0, void 0, function () {
    var domain, installedSolutionsUrl, signedInstance, data, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                domain = window.location.hostname === 'localhost'
                    ? DEFAULT_DOMAIN
                    : window.location.origin;
                installedSolutionsUrl = domain + "/_api/marketplace-api/v1/managed-apps";
                signedInstance = getCurrentInstance(METASITE_APP_DEF_ID);
                if (!signedInstance) return [3 /*break*/, 2];
                return [4 /*yield*/, axios.get(installedSolutionsUrl, {
                        headers: { Authorization: signedInstance },
                    })];
            case 1:
                data = (_a.sent()).data;
                return [2 /*return*/, data.managedWebSolutions];
            case 2: return [3 /*break*/, 4];
            case 3:
                e_3 = _a.sent();
                console.log(e_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
export var loadBundleSolutions = function () { return __awaiter(void 0, void 0, void 0, function () {
    var domain, bundleSolutionsUrl, signedInstance, data, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                domain = window.location.hostname === 'localhost'
                    ? DEFAULT_DOMAIN
                    : window.location.origin;
                bundleSolutionsUrl = domain + "/_api/marketplace-api/v1/bundle-apps?lang=en";
                signedInstance = getCurrentInstance(METASITE_APP_DEF_ID);
                if (!signedInstance) return [3 /*break*/, 2];
                return [4 /*yield*/, axios.get(bundleSolutionsUrl, {
                        headers: { Authorization: signedInstance },
                        withCredentials: true,
                    })];
            case 1:
                data = (_a.sent()).data;
                return [2 /*return*/, data.bundleWebSolutions];
            case 2: return [3 /*break*/, 4];
            case 3:
                e_4 = _a.sent();
                console.log(e_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var getSolutionsBiData = function (solutions, msid, collectionTag, referralInfo) {
    return solutions.map(function (solution, index) {
        return {
            app_id: solution.id,
            impressionType: 'box',
            index: index,
            msid: msid,
            tagType: collectionTag,
            appId: solution.id,
            git: collectionTag,
            widgetReferral: referralInfo || collectionTagToWidgetName(collectionTag),
        };
    });
};
var sendWidgetLoadedBi = function (referralInfo, collectionTag, metaSiteId) {
    biLogger.appMarketWidgetLoaded({
        origin: collectionTag,
        widget_name: referralInfo,
        msid: metaSiteId,
    });
};
export var isBundleAppAndInstalled = function (appID, bundleApps) {
    var bundleApp = bundleApps && bundleApps.find(function (app) { return app.webSolutionBase.id === appID; });
    return (bundleApp &&
        bundleApp.group === AppGroup.BUNDLE &&
        bundleApp.upgradeSuggestion);
};
export var isBundleAppAndNotInstalled = function (appID, bundleApps) {
    var bundleApp = bundleApps && bundleApps.find(function (app) { return app.webSolutionBase.id === appID; });
    return (bundleApp &&
        bundleApp.group === AppGroup.BUNDLE &&
        !bundleApp.upgradeSuggestion);
};
export var getBundleAppSavedPrice = function (appID, bundleApps) {
    var bundleApp = bundleApps && bundleApps.find(function (app) { return app.webSolutionBase.id === appID; });
    return bundleApp && bundleApp.appSavedPrice;
};
//# sourceMappingURL=apps-collection.js.map