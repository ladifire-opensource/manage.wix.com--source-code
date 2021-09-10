"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createManifest = exports.getFilesList = exports.BusinessManager = void 0;
var business_manager_api_1 = require("@wix/business-manager-api");
var businessManagerDef_1 = require("./businessManagerDef");
var business_manager_api_2 = require("@wix/business-manager-api");
var bmFiles = require("!resolve-unpkg?unpkgPrefix=unpkg!./bmFileList.json");
var replaceParams_1 = require("./replaceParams");
var tpa_1 = require("@wix/wixstores-dashboard-storemanager-common/dist/src/common/constants/tpa");
var BusinessManager = /** @class */ (function () {
    function BusinessManager(props) {
        this.manifest = this.init(props);
    }
    BusinessManager.prototype.init = function (props) {
        var _this = this;
        var instanceResolver = function () { return window['ModuleRegistry'].invoke(business_manager_api_1.GET_CURRENT_INSTANCE_METHOD_NAME, tpa_1.ECOM_APPDEFID); };
        return {
            files: getFilesList(props),
            prepare: function () {
                return _this.getBusinessManagerWixStoresInfo(instanceResolver).then(function (wixStoresAppData) {
                    var topology = props.config.topology;
                    return eCom.eComAppConfig('storeManagerApp', {
                        topology: _this.getTopology(topology),
                        experiments: wixStoresAppData.appData.experiments,
                        clientConfig: {
                            storeId: props.instanceId,
                            instance: instanceResolver(),
                            uuid: props.userId,
                            userId: props.userId,
                            visitor_id: '',
                            clientVersion: '',
                            locale: props.accountLanguage,
                            viewMode: props.viewMode,
                            debug: props.debug,
                            isMerchant: props.userRole === 'owner',
                            isOwner: props.userRole === 'owner',
                            isPremium: wixStoresAppData.isPremium ? 'true' : 'false',
                            isNewCountryList: wixStoresAppData.isNewCountryList,
                            isNewCurrencyList: false,
                            isNewLocaleList: false,
                            containerProtocol: 'https',
                            layoutDirection: 'ltr',
                            ecomSessionId: false,
                            baseHref: _this.getBaseHref(props),
                            editorUrl: props.liveSite.editUrl,
                            userPermissions: props.userPermissions,
                        },
                        pageMap: businessManagerDef_1.businessManagerPageMapEnum,
                        appData: wixStoresAppData.appData,
                    }, "" + topology.storesStaticsUrl, 'businessManagerStores', business_manager_api_2.getMandatoryBIFields());
                });
            },
            crossorigin: true,
            module: businessManagerDef_1.businessManagerModuleName,
            component: businessManagerDef_1.businessManagerComponentName,
        };
    };
    BusinessManager.prototype.getTopology = function (topologies) {
        return angular.extend({}, businessManagerDef_1.businessManagerTopologyEnum, {
            storeManagerStaticUrl: topologies.storesStaticsUrl,
            baseDomain: topologies.publicUrl,
            staticsDomain: topologies.staticsDomain,
        });
    };
    BusinessManager.prototype.getBaseHref = function (props) {
        var storeManagerBasePath = '/store/';
        return props.routeBaseName + props.metaSiteId + storeManagerBasePath;
    };
    BusinessManager.prototype.getBusinessManagerWixStoresInfo = function (instanceResolver) {
        var instance = instanceResolver();
        var headers = {
            headers: { Authorization: instance },
        };
        return new Promise(function (resolve) {
            axios.post(businessManagerDef_1.provisionApp, {}, headers).then(function () {
                axios.get(businessManagerDef_1.businessManagerAppDataUrl, headers).then(function (wixStoresAppData) {
                    resolve(wixStoresAppData.data);
                });
            });
        });
    };
    return BusinessManager;
}());
exports.BusinessManager = BusinessManager;
function getFilesList(props) {
    var topology = props.config.topology;
    var files = replaceParams_1.replaceParams(bmFiles, __assign(__assign({}, topology), { locale: props.accountLanguage, debug: props.debug ? '' : '.min' }));
    if (props.viewMode !== 'dashboard') {
        files.push(topology.staticsDomain + "services/js-sdk/1.87.0/js/wix-private.min.js");
    }
    return files;
}
exports.getFilesList = getFilesList;
function createManifest(props) {
    return new BusinessManager(props).manifest;
}
exports.createManifest = createManifest;
