"use strict";
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
exports.getProductList = exports.getProductListConfig = exports.navigateToStoresProductList = exports.getInventoryStatusMessage = exports.ProductInventoryStatus = exports.PAGE_LIMIT = exports.PRODUCT_LIST_SELECTION_BI = void 0;
var businessManagerDef_1 = require("./businessManagerDef");
var crm_financial_products_list_api_1 = require("@wix/crm-financial-products-list-api");
var business_manager_api_1 = require("@wix/business-manager-api");
var componentName_1 = require("@wix/wixstores-dashboard-business-manager-components/dist/src/types/componentName");
var Translate_1 = require("@wix/wixstores-client-core/dist/src/utils/Translate");
exports.PRODUCT_LIST_SELECTION_BI = 'stores-product-selected';
exports.PAGE_LIMIT = 250;
var ProductInventoryStatus;
(function (ProductInventoryStatus) {
    ProductInventoryStatus["OUT_OF_STOCK"] = "out_of_stock";
    ProductInventoryStatus["IN_STOCK"] = "in_stock";
})(ProductInventoryStatus = exports.ProductInventoryStatus || (exports.ProductInventoryStatus = {}));
var getTrackedInventoryStatusMessage = function (_a) {
    var inventoryCount = _a.inventoryCount, translate = _a.translate;
    return inventoryCount > 0
        ? translate('invoices.createNew.serviceDropdown.stockQuantity.label', {
            quantity: inventoryCount,
        })
        : translate('invoices.createNew.serviceDropdown.noStock.label');
};
var getUntrackedInventoryStatusMessage = function (_a) {
    var isInStock = _a.isInStock, translate = _a.translate;
    return isInStock
        ? translate('invoices.createNew.serviceDropdown.inStock.label')
        : translate('invoices.createNew.serviceDropdown.noStock.label');
};
exports.getInventoryStatusMessage = function (_a) {
    var translate = _a.translate, _b = _a.productDTO, inventory = _b.inventory, isTrackingInventory = _b.isTrackingInventory, isManageProductItems = _b.isManageProductItems, productItemsSummary = _b.productItemsSummary;
    if (isManageProductItems) {
        if (isTrackingInventory) {
            return getTrackedInventoryStatusMessage({ inventoryCount: productItemsSummary.inventoryQuantity, translate: translate });
        }
        else {
            return getUntrackedInventoryStatusMessage({
                isInStock: productItemsSummary.inStockProductItemsCount > 0,
                translate: translate,
            });
        }
    }
    else if (inventory) {
        if (isTrackingInventory) {
            return getTrackedInventoryStatusMessage({ inventoryCount: inventory.quantity, translate: translate });
        }
        return getUntrackedInventoryStatusMessage({
            isInStock: inventory.status === ProductInventoryStatus.IN_STOCK,
            translate: translate,
        });
    }
    return '';
};
exports.navigateToStoresProductList = function (_a) {
    var text = _a.text, buttonText = _a.buttonText;
    return business_manager_api_1.navigateToAndShowBackToast({
        pageComponentId: business_manager_api_1.PageComponentId.Stores,
        contextData: {
            appState: "products",
        },
    }, {
        pageComponentId: business_manager_api_1.PageComponentId.Invoices,
        contextData: { appState: "create" },
    }, {
        text: text,
        buttonText: buttonText,
    });
};
var mapProductDTOToProduct = function (_a) {
    var productDTO = _a.productDTO, translate = _a.translate;
    if (!productDTO) {
        return null;
    }
    var mediaItem = productDTO.media[0];
    var metadata = new Map([
        ['sku', productDTO.sku || null],
        ['weight', productDTO.weight ? productDTO.weight.toString() : null],
        ['fulfillerId', productDTO.fulfillerId || null],
        ['taxGroupId', productDTO.taxGroupId || null],
        ['lineItemType', productDTO.productType ? productDTO.productType.toUpperCase() : null],
        ['mediaItemId', mediaItem ? mediaItem.id : null],
    ]);
    return {
        name: productDTO.name,
        price: {
            amount: productDTO.price,
            currencyCode: productDTO.currency,
        },
        description: productDTO.description,
        additionalInfo: exports.getInventoryStatusMessage({ productDTO: productDTO, translate: translate }),
        hasVariants: productDTO.hasOptions,
        id: productDTO.id,
        metadata: metadata,
    };
};
var mapProductListDTOToProductList = function (_a) {
    var productListDTO = _a.productListDTO, translate = _a.translate;
    if (!productListDTO) {
        return [];
    }
    return productListDTO.map(function (product) { return mapProductDTOToProduct({ productDTO: product, translate: translate }); });
};
exports.getProductListConfig = function (translationsPromise) { return __awaiter(void 0, void 0, Promise, function () {
    function translate(key) {
        return translations[key] || key;
    }
    var translations;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, translationsPromise];
            case 1:
                translations = _a.sent();
                return [2 /*return*/, {
                        title: {
                            text: translate('invoices.createNew.serviceDropdown.storeProducts.header'),
                        },
                        hint: {
                            text: translate('invoices.createNew.serviceDropdown.storeProducts.tooltip'),
                            navigateToProductsCatalogActionText: translate('invoices.createNew.serviceDropdown.storeProducts.link'),
                        },
                        onNavigateToProductsCatalog: function () {
                            return exports.navigateToStoresProductList({
                                text: translate('catalog.products.invoices.notificationBar.return.text'),
                                buttonText: translate('catalog.products.invoices.notificationBar.return.button'),
                            });
                        },
                        onProductSelection: function (_a) {
                            var _b = _a.statusContext, withOrder = _b.withOrder, invoiceStatus = _b.invoiceStatus;
                            var doesProductNotAffectInventory = !withOrder && (!invoiceStatus || invoiceStatus === crm_financial_products_list_api_1.InvoiceStatus.DRAFT);
                            if (!doesProductNotAffectInventory) {
                                return;
                            }
                            return business_manager_api_1.showToast({
                                message: translate('invoices.createNew.notificationBar.inventoryNote'),
                                type: business_manager_api_1.ToastType.WARNING,
                                biName: exports.PRODUCT_LIST_SELECTION_BI,
                            });
                        },
                        orderCreationConfig: {
                            isEnabled: true,
                        },
                        productVariantsModal: {
                            componentName: componentName_1.ComponentName.ProductVariantsModalLazy,
                        },
                    }];
        }
    });
}); };
exports.getProductList = function (httpClient, translationsPromise) { return __awaiter(void 0, void 0, Promise, function () {
    var _a, products, translations, translate, eligibleProducts;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, Promise.all([fetchProducts(httpClient), translationsPromise])];
            case 1:
                _a = _b.sent(), products = _a[0], translations = _a[1];
                translate = function (translationKey, options) {
                    if (options === void 0) { options = {}; }
                    return Translate_1.translate(translations[translationKey] || translationKey, options);
                };
                eligibleProducts = products.filter(function (product) {
                    var isPhysicalProduct = product.productType === 'physical';
                    var hasNoSubscriptionPlans = product.subscriptionPlans.list.length === 0;
                    return isPhysicalProduct && hasNoSubscriptionPlans;
                });
                return [2 /*return*/, {
                        products: mapProductListDTOToProductList({ productListDTO: eligibleProducts, translate: translate }),
                    }];
        }
    });
}); };
var fetchProducts = function (httpClient) { return __awaiter(void 0, void 0, void 0, function () {
    var totalCount, pageResults, offset, results, body, pageSize, response, e_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                pageResults = [], offset = 0, results = [], pageSize = exports.PAGE_LIMIT;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                _b.label = 2;
            case 2:
                body = {
                    query: getProductsForProductListQuery,
                    variables: {
                        limit: pageSize,
                        offset: offset,
                    },
                };
                return [4 /*yield*/, httpClient.post(businessManagerDef_1.businessManagerTopologyEnum.graphqlClientUrl, body)];
            case 3:
                response = _b.sent();
                (_a = response.data.data.catalog.products, totalCount = _a.totalCount, pageResults = _a.list);
                results = results.concat(pageResults);
                offset += pageResults.length;
                _b.label = 4;
            case 4:
                if (totalCount - offset > 0) return [3 /*break*/, 2];
                _b.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                e_1 = _b.sent();
                console.log('Failed to fetch the full product list');
                return [2 /*return*/, results];
            case 7: return [2 /*return*/, results];
        }
    });
}); };
var getProductsForProductListQuery = "query getProducts($limit: Int, $offset: Int) {\n  catalog {\n    products(limit: $limit, offset: $offset, onlyVisible: true) {\n      list {\n        id\n        name\n        price\n        currency \n        description\n        hasOptions\n        subscriptionPlans {\n          list {\n            id\n          }\n        }\n        media {\n          id\n        }\n        inventory {\n          status\n          quantity\n        }\n        isTrackingInventory\n        isManageProductItems\n        productItemsSummary {\n          productItemsCount\n          inStockProductItemsCount\n          inventoryQuantity\n        }\n        taxGroupId\n        productType\n        fulfillerId\n        weight\n        sku\n      }\n      totalCount\n    }\n  }\n}";
