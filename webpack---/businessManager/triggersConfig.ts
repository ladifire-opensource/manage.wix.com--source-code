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
exports.getTriggersConfig = void 0;
var businessManagerDef_1 = require("./businessManagerDef");
function getTriggersConfig(appDefId, translations, componentName, httpClient) {
    var _a;
    var _this = this;
    function translate(key) {
        return translations[key] || key;
    }
    return {
        appTitle: translate('automations.setUp.appTitle'),
        appDefId: appDefId,
        events: {
            'e_commerce/purchase': {
                displayName: translate('automations.purchase.setUp.trigger'),
                displayDescription: translate('automations.purchase.setUp.triggerDescription'),
                displayColor: '#3370FB',
                displayOrder: 2,
                conditions: (_a = {},
                    _a['product-ids'] = {
                        displayName: translate('automations.purchase.setUp.conditionSelect'),
                        optionalConditionHeader: translate('automations.purchase.setUp.conditionSelectHeader'),
                        useConditionOptionText: translate('automations.purchase.setUp.condition.specificProducts'),
                        dontUseConditionOptionText: translate('automations.purchase.setUp.condition.allProducts'),
                        options: function () { return __awaiter(_this, void 0, void 0, function () {
                            var products;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, fetchProducts(httpClient)];
                                    case 1:
                                        products = _a.sent();
                                        return [2 /*return*/, products.reduce(function (productsMap, product) {
                                                var _a;
                                                return (__assign(__assign({}, productsMap), (_a = {}, _a[product.id] = product.name, _a)));
                                            }, {})];
                                }
                            });
                        }); },
                    },
                    _a),
            },
            'e_commerce/cart_abandonment': {
                displayName: translate('automations.abandonedCart.setUp.trigger'),
                displayColor: '#3370FB',
                displayDescription: translate('automations.abandonedCart.setUp.triggerDescription'),
                providesContactInfo: true,
                supportsImmediateChat: false,
                actionComponentInfo: {
                    componentName: componentName,
                    actionConfig: {
                        templateTag: 'abandoned_cart',
                    },
                },
            },
        },
        generateEventSchema: function () {
            var _a;
            return Promise.resolve((_a = {},
                _a['product.name'] = {
                    displayName: translate('automations.abandonedCart.variables.productName'),
                    type: 'string',
                },
                _a['product.image.url'] = {
                    displayName: translate('automations.abandonedCart.variables.productImageURL'),
                    type: 'imageUrl',
                },
                _a['product.price'] = {
                    displayName: translate('automations.abandonedCart.variables.productPrice'),
                    type: 'string',
                },
                _a['contact.Name.First'] = {
                    displayName: translate('automations.abandonedCart.variables.contactNameFirst'),
                    type: 'string',
                },
                _a['contact.Name.Last'] = {
                    displayName: translate('automations.abandonedCart.variables.contactNameLast'),
                    type: 'string',
                },
                _a['checkout.url'] = {
                    displayName: translate('automations.abandonedCart.variables.checkoutURL'),
                    type: 'linkUrl',
                },
                _a));
        },
    };
}
exports.getTriggersConfig = getTriggersConfig;
var fetchProducts = function (httpClient) { return __awaiter(void 0, void 0, void 0, function () {
    var body, response, products;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = {
                    query: getProductsForAutomationsQuery,
                    variables: {
                        limit: 100,
                    },
                };
                return [4 /*yield*/, httpClient.post(businessManagerDef_1.businessManagerTopologyEnum.graphqlClientUrl, body)];
            case 1:
                response = _a.sent();
                products = response.data.data.catalog.products.list;
                return [2 /*return*/, products];
        }
    });
}); };
var getProductsForAutomationsQuery = "query getProducts($limit: Int) {\n  catalog {\n    products(limit: $limit) {\n      list {\n        id\n        name\n      }\n    }\n  }\n}";
