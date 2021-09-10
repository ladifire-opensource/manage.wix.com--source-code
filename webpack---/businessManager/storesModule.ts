"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var business_manager_api_1 = require("@wix/business-manager-api");
var Sentry = require("@sentry/browser");
var react_module_container_1 = require("react-module-container");
var businessManager_1 = require("./businessManager");
var tpa_1 = require("@wix/wixstores-dashboard-storemanager-common/dist/src/common/constants/tpa");
var http_client_1 = require("@wix/wixstores-dashboard-storemanager-common/dist/src/common/services/axiosHttpClient/http-client");
var ExploreProductsLazyComponent_1 = require("@wix/wixstores-dashboard-business-manager-components/dist/src/businessManager/lazyComponents/ExploreProductsLazyComponent");
var PromotionModalLazyComponent_1 = require("@wix/wixstores-dashboard-business-manager-components/dist/src/businessManager/lazyComponents/PromotionModalLazyComponent");
var ProductVariantsModalLazyComponent_1 = require("@wix/wixstores-dashboard-business-manager-components/dist/src/businessManager/lazyComponents/ProductVariantsModalLazyComponent");
var componentName_1 = require("@wix/wixstores-dashboard-business-manager-components/dist/src/types/componentName");
var shoutOutConfig_1 = require("./shoutOutConfig");
var getTranslations_1 = require("./getTranslations");
var addPaymentPimple_1 = require("./addPaymentPimple");
var componentName_2 = require("@wix/wixstores-dashboard-abandoned-carts/dist/src/types/componentName");
var componentName_3 = require("@wix/wixstores-dashboard-orders-manager/dist/src/types/componentName");
var triggersConfig_1 = require("./triggersConfig");
var LazyComponent_1 = require("@wix/wixstores-dashboard-abandoned-carts/dist/src/businessManager/lazyComponents/LazyComponent");
var LazyComponent_2 = require("@wix/wixstores-dashboard-orders-manager/dist/src/businessManager/lazyComponents/LazyComponent");
var LazyTabComponent_1 = require("@wix/wixstores-dashboard-orders-manager/dist/src/businessManager/lazyComponents/LazyTabComponent");
var LazyComponent_3 = require("@wix/wixstores-dashboard-sales-channels/dist/src/businessManager/lazyComponents/LazyComponent");
var componentName_4 = require("@wix/wixstores-dashboard-sales-channels/dist/src/types/componentName");
var LazyComponent_4 = require("@wix/wixstores-dashboard-inkfrog/dist/src/businessManager/lazyComponents/LazyComponent");
var componentName_5 = require("@wix/wixstores-dashboard-inkfrog/dist/src/types/componentName");
var LazyComponent_5 = require("@wix/wixstores-dashboard-amazon-sales-channel/dist/src/businessManager/lazyComponents/LazyComponent");
var componentName_6 = require("@wix/wixstores-dashboard-amazon-sales-channel/dist/src/types/componentName");
var lazyComponent_1 = require("@wix/wixstores-dashboard-pos/dist/src/businessManager/lazyComponents/lazyComponent");
var componentName_7 = require("@wix/wixstores-dashboard-pos/dist/src/types/componentName");
var LazyComponent_6 = require("@wix/wixstores-dashboard-purchase-plans/dist/src/businessManager/lazyComponents/LazyComponent");
var componentName_8 = require("@wix/wixstores-dashboard-purchase-plans/dist/src/types/componentName");
var LazyComponent_7 = require("@wix/wixstores-client-edit-address-modal/dist/src/businessManager/lazyComponents/LazyComponent");
var componentName_9 = require("@wix/wixstores-client-edit-address-modal/dist/src/types/componentName");
var registerReportUnsupportedLanguages_1 = require("./registerReportUnsupportedLanguages");
var crm_financial_products_list_api_1 = require("@wix/crm-financial-products-list-api");
var productListConfig_1 = require("./productListConfig");
var StoreManagerComp = /** @class */ (function (_super) {
    __extends(StoreManagerComp, _super);
    function StoreManagerComp(props) {
        return _super.call(this, props, businessManager_1.createManifest(props)) || this;
    }
    StoreManagerComp.prefetch = function (params) {
        return businessManager_1.getFilesList(params);
    };
    return StoreManagerComp;
}(react_module_container_1.AngularLazyComponent));
var StoresModule = /** @class */ (function (_super) {
    __extends(StoresModule, _super);
    function StoresModule(moduleId) {
        var _this = _super.call(this, moduleId) || this;
        _this.appDefId = tpa_1.ECOM_APPDEFID;
        window['ModuleRegistry'].registerComponent(business_manager_api_1.PageComponentId.Stores, function () { return StoreManagerComp; });
        window['ModuleRegistry'].registerComponent(componentName_1.ComponentName.ExploreProductsLazy, function () { return ExploreProductsLazyComponent_1.ExploreProductsLazyComponent; });
        window['ModuleRegistry'].registerComponent(componentName_1.ComponentName.PromotionModalLazy, function () { return PromotionModalLazyComponent_1.PromotionModalLazyComponent; });
        window['ModuleRegistry'].registerComponent(componentName_1.ComponentName.ProductVariantsModalLazy, function () { return ProductVariantsModalLazyComponent_1.ProductVariantsModalLazyComponent; });
        window['ModuleRegistry'].registerComponent(componentName_2.ComponentName.AbandonedCartPageLazy, function () { return LazyComponent_1.LazyComponent; });
        window['ModuleRegistry'].registerComponent(componentName_4.ComponentName.SalesPageLazy, function () { return LazyComponent_3.LazyComponent; });
        _this.registerComponentWithModuleParams(componentName_8.ComponentName.PurchasePlansPageLazy, LazyComponent_6.LazyComponent);
        window['ModuleRegistry'].registerComponent(componentName_9.ComponentName.EditAddressModalLazy, function () { return LazyComponent_7.LazyComponent; });
        window['ModuleRegistry'].registerComponent(componentName_5.ComponentName.InkfrogPageLazy, function () { return LazyComponent_4.LazyComponent; });
        window['ModuleRegistry'].registerComponent(componentName_6.ComponentName.AmazonSalesChannelPageLazy, function () { return LazyComponent_5.LazyComponent; });
        window['ModuleRegistry'].registerComponent(componentName_7.ComponentName.PosPageLazy, function () { return lazyComponent_1.LazyComponent; });
        window['ModuleRegistry'].registerComponent(componentName_3.ComponentName.OrderPageLazy, function () { return LazyComponent_2.LazyComponent; });
        window['ModuleRegistry'].registerComponent(componentName_3.ComponentName.ContactOrdersTabLazy, function () { return LazyTabComponent_1.ContactsOrdersTab; });
        return _this;
    }
    StoresModule.prototype.init = function (moduleParams) {
        return __awaiter(this, void 0, void 0, function () {
            var sentryClient, sentryClientPos, sentryClientSalesChannels, sentryClientInkfrog, sentryClientAmazonSalesChannel, abandonedCartsSentryClient, httpClient, translationsPromise_1, translations_1, key_1, getProducts, getConfig, e_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sentryClient = new Sentry.BrowserClient({
                            dsn: 'https://6c047395476740f0b558c79e450d0868@sentry.io/276734',
                        });
                        business_manager_api_1.registerPageComponentMonitors(business_manager_api_1.PageComponentId.Stores, { sentryClient: sentryClient });
                        sentryClientPos = new Sentry.BrowserClient({
                            dsn: 'https://ebfaa0f87aae49bfab2db5e6b35d093f@sentry.io/5508541',
                        });
                        business_manager_api_1.registerPageComponentMonitors(business_manager_api_1.PageComponentId.StoresPos, {
                            sentryClient: sentryClientPos,
                        });
                        sentryClientSalesChannels = new Sentry.BrowserClient({
                            dsn: 'https://d35b7805e77b45a9a37468d938f44f5d@sentry.io/5508546',
                        });
                        business_manager_api_1.registerPageComponentMonitors(business_manager_api_1.PageComponentId.StoresSalesChannels, {
                            sentryClient: sentryClientSalesChannels,
                        });
                        sentryClientInkfrog = new Sentry.BrowserClient({
                            dsn: 'https://2d2a4002ae8c4fe2afeeb5b5c3db75fd@sentry.io/5508549',
                        });
                        business_manager_api_1.registerPageComponentMonitors(business_manager_api_1.PageComponentId.StoresInkfrog, {
                            sentryClient: sentryClientInkfrog,
                        });
                        sentryClientAmazonSalesChannel = new Sentry.BrowserClient({
                            dsn: 'https://31e6df74863348beaa263e5853b010a2@sentry.io/5508550',
                        });
                        business_manager_api_1.registerPageComponentMonitors(business_manager_api_1.PageComponentId.StoresAmazon, {
                            sentryClient: sentryClientAmazonSalesChannel,
                        });
                        abandonedCartsSentryClient = new Sentry.BrowserClient({
                            dsn: 'https://ac940f78e17f45d9899750824d761ee0@o37417.ingest.sentry.io/5528566',
                        });
                        business_manager_api_1.registerPageComponentMonitors(business_manager_api_1.PageComponentId.StoresAbandonedCarts, { sentryClient: abandonedCartsSentryClient });
                        this.topology = moduleParams.config.topology;
                        this.moduleParams = moduleParams;
                        // hack until https://jira.wixpress.com/browse/WOS2-2459 will be fixed
                        this.instanceResolver = function () {
                            return window['ModuleRegistry'].invoke(business_manager_api_1.GET_CURRENT_INSTANCE_METHOD_NAME, _this.appDefId) || moduleParams.instance;
                        };
                        httpClient = http_client_1.configureHttpClient(window.location.origin, this.instanceResolver);
                        try {
                            business_manager_api_1.configModule(this.moduleId, business_manager_api_1.ModuleId.Invoices, {});
                        }
                        catch (e) {
                            console.log('SM configure contacts failed', e);
                        }
                        try {
                            business_manager_api_1.configModule(this.moduleId, business_manager_api_1.ModuleId.Cashier, {
                                appDefId: this.appDefId,
                                getNavigateToVerticalOrderPageConfig: function (_a) {
                                    var verticalOrderId = _a.verticalOrderId;
                                    return Promise.resolve({
                                        pageComponentId: business_manager_api_1.PageComponentId.Stores,
                                        viewId: 'orders.list.order',
                                        contextData: { appState: "orders/order/" + verticalOrderId },
                                    });
                                },
                            });
                        }
                        catch (e) {
                            console.log('SM configure Cashier failed', e);
                        }
                        try {
                            business_manager_api_1.configModule(this.moduleId, business_manager_api_1.ModuleId.Settings, { appDefIds: [this.appDefId] });
                        }
                        catch (e) {
                            console.log('SM configure Settings failed', e);
                        }
                        try {
                            business_manager_api_1.configModule(this.moduleId, business_manager_api_1.ModuleId.Subscriptions, {
                                componentName: componentName_8.ComponentName.PurchasePlansPageLazy,
                                appDefId: this.appDefId,
                                type: 'SubscriptionOverviewSection',
                                priority: 1,
                            });
                            business_manager_api_1.configModule(this.moduleId, business_manager_api_1.ModuleId.Subscriptions, {
                                componentName: componentName_8.ComponentName.PurchasePlansPageLazy,
                                appDefId: this.appDefId,
                                type: 'SubscriptionOverviewSidebar',
                                priority: 1,
                            });
                        }
                        catch (e) {
                            console.log('SM configure Subscriptions failed', e);
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        translationsPromise_1 = getTranslations_1.getTranslations(moduleParams.accountLanguage, this.getStoresBasicUrl());
                        try {
                            //addPaymentPimple should be called before any awaits in code, call to the function should be synchronous!!!
                            addPaymentPimple_1.addPaymentPimple(httpClient, moduleParams.instanceId, translationsPromise_1);
                        }
                        catch (e) {
                            console.log('Added add payment pimple to BM failed', e);
                        }
                        try {
                            if (moduleParams.liveSite.isSitePublished) {
                                business_manager_api_1.configModule(this.moduleId, business_manager_api_1.ModuleId.Shoutout, shoutOutConfig_1.getShoutOutConfig());
                            }
                        }
                        catch (e) {
                            console.log('SM configure shout out failed', e);
                        }
                        return [4 /*yield*/, translationsPromise_1];
                    case 2:
                        translations_1 = _a.sent();
                        try {
                            business_manager_api_1.configModule(this.moduleId, business_manager_api_1.ModuleId.Triggers, triggersConfig_1.getTriggersConfig(this.appDefId, translations_1, componentName_2.ComponentName.AbandonedCartPageLazy, httpClient));
                        }
                        catch (e) {
                            console.log('SM configure Triggers failed', e);
                        }
                        /*tslint:disable */
                        try {
                            key_1 = 'orderPage.orderInfo.contactView.ordersTab.header';
                            business_manager_api_1.configModule(this.moduleId, business_manager_api_1.ModuleId.Contacts, {
                                componentName: componentName_3.ComponentName.ContactOrdersTabLazy,
                                tabName: function (_a) {
                                    var TModuleParams = _a.moduleParams;
                                    return translations_1[key_1] || key_1;
                                },
                                shouldRender: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                    return [2 /*return*/, true];
                                }); }); },
                                type: 'contact-page-tab-widget',
                            });
                        }
                        catch (e) { }
                        try {
                            getProducts = function () { return productListConfig_1.getProductList(httpClient, translationsPromise_1); };
                            getConfig = function () { return productListConfig_1.getProductListConfig(translationsPromise_1); };
                            crm_financial_products_list_api_1.registerProductList(this.moduleId, {
                                appDefId: this.appDefId,
                                isEnabled: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                    return [2 /*return*/, true];
                                }); }); },
                                getProducts: getProducts,
                                getConfig: getConfig
                            });
                        }
                        catch (e) {
                            console.log('Failed to register stores product list');
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.log('SM get translation or experiments for BM configuration failed', e_1);
                        return [3 /*break*/, 4];
                    case 4:
                        try {
                            registerReportUnsupportedLanguages_1.registerReportUnsupportedLanguages();
                        }
                        catch (e) {
                            console.log('Report unsupported languages init failed', e);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    StoresModule.prototype.config = function (_sourceModule, _configPayload) {
        //
    };
    StoresModule.prototype.getStoresBasicUrl = function () {
        return this.topology.storesStaticsUrl;
    };
    StoresModule.prototype.getModuleParams = function () {
        return this.moduleParams;
    };
    return StoresModule;
}(business_manager_api_1.BusinessManagerModule));
business_manager_api_1.registerModule(business_manager_api_1.ModuleId.Stores, StoresModule);
