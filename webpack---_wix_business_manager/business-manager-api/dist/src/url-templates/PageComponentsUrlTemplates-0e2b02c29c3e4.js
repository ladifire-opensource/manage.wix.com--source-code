"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBusinessManagerPageComponentTemplate = void 0;
function getBusinessManagerPageComponentTemplate(metaSiteId, pageComponentRoute) {
    return {
        baseUrl: function (ctx) { return "/" + metaSiteId + "/" + pageComponentRoute + "/" + (ctx.appState ? ctx.appState : ''); },
        query: { referralInfo: function (ctx) { return ctx.referrer; }, dataCapsuleId: '=' }
    };
}
exports.getBusinessManagerPageComponentTemplate = getBusinessManagerPageComponentTemplate;
//# sourceMappingURL=PageComponentsUrlTemplates.js.map