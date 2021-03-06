"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.businessManagerModuleName = exports.businessManagerComponentName = exports.provisionApp = exports.businessManagerAppDataUrl = exports.businessManagerPageMapEnum = exports.businessManagerTopologyEnum = void 0;
var businessManagerTopologyEnum;
(function (businessManagerTopologyEnum) {
    businessManagerTopologyEnum[businessManagerTopologyEnum["getStoreManagerShippingRulesUrl"] = '/_api/wix-ecommerce-renderer-web/store-manager/shipping-rules'] = "getStoreManagerShippingRulesUrl";
    businessManagerTopologyEnum[businessManagerTopologyEnum["getStoreManagerCategoriesListUrl"] = '/_api/wix-ecommerce-renderer-web/store-manager/categories'] = "getStoreManagerCategoriesListUrl";
    businessManagerTopologyEnum[businessManagerTopologyEnum["couponCommandsUrl"] = '/_api/wix-ecommerce-renderer-web/store-manager/executeCouponCommand/{commandName}'] = "couponCommandsUrl";
    businessManagerTopologyEnum[businessManagerTopologyEnum["getNotificationsUrl"] = '/_api/wix-ecommerce-renderer-web/store-manager/get-notifications'] = "getNotificationsUrl";
    businessManagerTopologyEnum[businessManagerTopologyEnum["couponBulkCommandsUrl"] = '/_api/wix-ecommerce-renderer-web/store-manager/executeCouponCommands'] = "couponBulkCommandsUrl";
    businessManagerTopologyEnum[businessManagerTopologyEnum["catalogCommandsUrl"] = '/_api/wix-ecommerce-renderer-web/store-manager/catalog/{commandName}'] = "catalogCommandsUrl";
    businessManagerTopologyEnum[businessManagerTopologyEnum["storeSettingsCommandUrl"] = '/_api/wix-ecommerce-renderer-web/store-manager/store-settings/{commandName}'] = "storeSettingsCommandUrl";
    businessManagerTopologyEnum[businessManagerTopologyEnum["addCollectionToSiteModalUrl"] = 'https://ecom.wix.com/storefront/collectionModal/'] = "addCollectionToSiteModalUrl";
    businessManagerTopologyEnum[businessManagerTopologyEnum["frogUrl"] = '//frog.wix.com/'] = "frogUrl";
    businessManagerTopologyEnum[businessManagerTopologyEnum["shipmentBulkCommandsUrl"] = '/_api/wix-ecommerce-renderer-web/store-manager/executeShipmentCommands'] = "shipmentBulkCommandsUrl";
    businessManagerTopologyEnum[businessManagerTopologyEnum["getProductUrl"] = '/_api/wix-ecommerce-renderer-web/store-manager/products/{productId}'] = "getProductUrl";
    businessManagerTopologyEnum[businessManagerTopologyEnum["getProductsListUrl"] = '/_api/wix-ecommerce-renderer-web/store-manager/products'] = "getProductsListUrl";
    businessManagerTopologyEnum[businessManagerTopologyEnum["bulkExecutionUrl"] = '/_api/wix-ecommerce-renderer-web/store-manager/executeCatalogCommands'] = "bulkExecutionUrl";
    businessManagerTopologyEnum[businessManagerTopologyEnum["commonExecutionUrl"] = '/_api/wix-ecommerce-renderer-web/store-manager/executeCommonCommands'] = "commonExecutionUrl";
    businessManagerTopologyEnum[businessManagerTopologyEnum["graphqlClientUrl"] = '/_api/wix-ecommerce-graphql-web/api'] = "graphqlClientUrl";
    businessManagerTopologyEnum[businessManagerTopologyEnum["shippingBulkCommandsUrl"] = '/_api/wix-ecommerce-renderer-web/store-manager/executeShippingCommands'] = "shippingBulkCommandsUrl";
})(businessManagerTopologyEnum = exports.businessManagerTopologyEnum || (exports.businessManagerTopologyEnum = {}));
var businessManagerPageMapEnum;
(function (businessManagerPageMapEnum) {
    businessManagerPageMapEnum[businessManagerPageMapEnum["gallery"] = 'products_gallery'] = "gallery";
    businessManagerPageMapEnum[businessManagerPageMapEnum["product"] = 'product_page'] = "product";
    businessManagerPageMapEnum[businessManagerPageMapEnum["cart"] = 'shopping_cart'] = "cart";
    businessManagerPageMapEnum[businessManagerPageMapEnum["thankyou"] = 'thank_you_page'] = "thankyou";
})(businessManagerPageMapEnum = exports.businessManagerPageMapEnum || (exports.businessManagerPageMapEnum = {}));
exports.businessManagerAppDataUrl = '/_api/wix-ecommerce-renderer-web/store-manager/business-manager-info';
exports.provisionApp = '/_api/wix-ecommerce-renderer-web/store-manager/provision-store';
exports.businessManagerComponentName = 'store-manager';
exports.businessManagerModuleName = 'storeManagerAppWrapper';
