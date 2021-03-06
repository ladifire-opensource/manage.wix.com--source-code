"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.isExternalPageLink = exports.externalPageIdToUrl = exports.getExternalPageUrlTemplate = void 0;
var ExternalPageId_1 = require("../ExternalPageId");
function getExternalPageUrlTemplate(metaSiteId, externalPageId) {
    switch (externalPageId) {
        case ExternalPageId_1.ExternalPageId.PackagePicker:
            return {
                baseUrl: function (ctx) { return exports.externalPageIdToUrl[externalPageId]; },
                query: { appDefId: '=', instanceId: '=', referralAdditionalInfo: function (ctx) { return ctx.referrer; } }
            };
        case ExternalPageId_1.ExternalPageId.PremiumPage:
            return {
                baseUrl: function (ctx) { return exports.externalPageIdToUrl[externalPageId]; },
                query: { appDefId: '=', siteGuid: '=', referralAdditionalInfo: function (ctx) { return ctx.referrer; } }
            };
        case ExternalPageId_1.ExternalPageId.AscendPackagePicker:
            return {
                baseUrl: function (ctx) { return exports.externalPageIdToUrl[externalPageId]; },
                query: { metaSiteId: metaSiteId, pp_origin: '=', originAppSlug: '=' }
            };
        case ExternalPageId_1.ExternalPageId.UpgradeEtpa:
            return {
                baseUrl: function (ctx) { return exports.externalPageIdToUrl[externalPageId]; },
                query: {
                    applicationId: function (ctx) { return ctx.appId; },
                    metaSiteId: "" + metaSiteId,
                    referralAdditionalInfo: function (ctx) { return ctx.referrer; },
                    appDefinitionId: function (ctx) { return ctx.etpaId; },
                    vendorProductId: function (ctx) { return ctx.vendorProductId; },
                    paymentCycle: function (ctx) { return ctx.paymentCycle; }
                }
            };
        case ExternalPageId_1.ExternalPageId.Support:
            return {
                baseUrl: function (ctx) {
                    var base = exports.externalPageIdToUrl[externalPageId];
                    var locale = ctx.locale || 'en';
                    var articlePath = ctx.article ? "" + ctx.article : '/';
                    return base + "/" + locale + articlePath;
                }
            };
        default:
            return null;
    }
}
exports.getExternalPageUrlTemplate = getExternalPageUrlTemplate;
exports.externalPageIdToUrl = (_a = {},
    _a[ExternalPageId_1.ExternalPageId.PackagePicker] = '/wix/api/premiumStart',
    _a[ExternalPageId_1.ExternalPageId.PremiumPage] = '/wix/api/premiumStart',
    _a[ExternalPageId_1.ExternalPageId.AscendPackagePicker] = '/ascend-package-picker',
    _a[ExternalPageId_1.ExternalPageId.UpgradeEtpa] = '/wix/api/tpaStartPurchase',
    _a[ExternalPageId_1.ExternalPageId.Support] = 'https://support.wix.com',
    _a);
exports.isExternalPageLink = function (link) {
    return Object.values(exports.externalPageIdToUrl).some(function (path) { return link.startsWith(path); });
};
//# sourceMappingURL=ExternalPageUrlTemplates.js.map