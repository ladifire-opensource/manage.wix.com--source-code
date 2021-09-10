"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageLinkBuilderFactory = void 0;
var URI = require("urijs");
var PageComponentsUrlTemplates_1 = require("./url-templates/PageComponentsUrlTemplates");
var ExternalPageUrlTemplates_1 = require("./url-templates/ExternalPageUrlTemplates");
var isGuidLike = function (str) { return str.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i) !== null; };
function pageLinkBuilderFactory(metaSiteId, pageComponentsInfo) {
    return function (targetId, contextData) {
        if (contextData === void 0) { contextData = {}; }
        if (!targetId) {
            return;
        }
        var templateUrl = getTemplateUrl(metaSiteId, pageComponentsInfo, targetId);
        if (!templateUrl) {
            return;
        }
        return processUrlTemplate(templateUrl, contextData);
    };
}
exports.pageLinkBuilderFactory = pageLinkBuilderFactory;
function getTemplateUrl(metaSiteId, pageComponentsInfo, targetId) {
    var pageComponentInfo = getPageComponentInfoByPageComponentId(pageComponentsInfo, targetId) ||
        getPageComponentInfoByAppDefId(pageComponentsInfo, targetId);
    if (pageComponentInfo) {
        return PageComponentsUrlTemplates_1.getBusinessManagerPageComponentTemplate(metaSiteId, pageComponentInfo.route);
    }
    var externalPageUrlTemplate = ExternalPageUrlTemplates_1.getExternalPageUrlTemplate(metaSiteId, targetId);
    if (externalPageUrlTemplate) {
        return externalPageUrlTemplate;
    }
    else if (isGuidLike(targetId)) {
        return PageComponentsUrlTemplates_1.getBusinessManagerPageComponentTemplate(metaSiteId, "app/" + targetId);
    }
}
function getPageComponentInfoByAppDefId(pageComponentsInfo, appDefId) {
    return Object
        .keys(pageComponentsInfo)
        .map(function (pageComponentId) { return pageComponentsInfo[pageComponentId]; })
        .find(function (pageComponentInfo) { return pageComponentInfo.appDefId === appDefId && pageComponentInfo.isMain === true; });
}
function getPageComponentInfoByPageComponentId(pageComponentsInfo, pageComponentId) {
    return pageComponentsInfo[pageComponentId];
}
function processUrlTemplate(urlTemplate, context) {
    var uri = new URI(urlTemplate.baseUrl(context));
    if (urlTemplate.query) {
        uri.setQuery(interpolateOptions(urlTemplate.query, context));
    }
    return uri.toString();
}
function interpolateOptions(options, context) {
    return Object.keys(options || {}).reduce(function (result, key) {
        var interpolated;
        if (options[key] === '=') {
            interpolated = context[key];
        }
        else if (typeof options[key] === 'function') {
            interpolated = options[key](context);
        }
        else {
            interpolated = options[key];
        }
        if (interpolated) {
            result[key] = interpolated;
        }
        return result;
    }, {});
}
//# sourceMappingURL=pageLinkBuilderFactory.js.map