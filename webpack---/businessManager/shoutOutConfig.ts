"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShoutOutConfig = void 0;
var templateTypes_1 = require("@wix/wixstores-dashboard-business-manager-components/dist/src/types/templateTypes");
var componentName_1 = require("@wix/wixstores-dashboard-business-manager-components/dist/src/types/componentName");
function getShoutOutConfig() {
    var templates;
    templates = [
        {
            templateId: templateTypes_1.PromotionTemplateId.PRODUCT,
            component: componentName_1.ComponentName.PromotionModalLazy,
        },
        {
            templateId: templateTypes_1.PromotionTemplateId.COLLECTION,
            component: componentName_1.ComponentName.PromotionModalLazy,
        },
    ];
    return {
        integrationType: 'templates',
        data: {
            templates: templates,
        },
    };
}
exports.getShoutOutConfig = getShoutOutConfig;
