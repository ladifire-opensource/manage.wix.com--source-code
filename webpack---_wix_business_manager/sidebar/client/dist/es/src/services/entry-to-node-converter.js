import { __assign, __spreadArrays } from "tslib";
import { getEntryTooltip } from './add-tooltip-to-entry';
import { isCategory, isLink, isTitle } from '@wix/business-manager-sidebar-data';
import * as BusinessManagerAPI from '@wix/business-manager-api';
import { merge } from 'lodash';
import { extractEntryPath } from './extract-entry-path';
import { isHtmlSite, isSitelessExperience } from '../selectors/select-site';
export var buildEntryToNodeConverter = function (state, bmAPI) {
    if (bmAPI === void 0) { bmAPI = BusinessManagerAPI; }
    var hasPermissions = function (entry) {
        var enabledByPermissions = entry.enabledByPermissions || [];
        return state.isOwner || enabledByPermissions.every(function (p) { return state.permissions.includes(p); });
    };
    var isFlashEnabled = function (entry) {
        if (isLink(entry)) {
            return entry.enabledInFlashSite === true;
        }
        if (isCategory(entry)) {
            return entry.subItems.some(isFlashEnabled);
        }
        return false;
    };
    var isEnabledForSiteType = function (entry) {
        return isSitelessExperience(state) || isHtmlSite(state) || isFlashEnabled(entry);
    };
    var hasEnabledSubItems = function (entry) {
        return !isCategory(entry) || entry.subItems.filter(function (item) { return isCategory(item) || isLink(item); }).some(isEnabled);
    };
    var isEnabled = function (entry) {
        return isEnabledForSiteType(entry) && hasPermissions(entry) && hasEnabledSubItems(entry);
    };
    var convert = function (entry, parentId, level) {
        var enabled = isEnabled(entry);
        var showNewBadge = entry.showNewBadge, id = entry.id;
        return (__assign(__assign(__assign({ id: id,
            parentId: parentId,
            level: level, subItemIds: [], enabled: enabled }, (showNewBadge && { showNewBadge: showNewBadge })), getEntryTooltip(state, enabled, entry, isEnabledForSiteType(entry))), nodeBuilder(bmAPI).build(entry)));
    };
    return { convert: convert };
};
var nodeBuilder = function (bmAPI) {
    var buildCategoryNode = function (category) { return ({
        label: category.label,
        subItemIds: category.subItems.map(function (item) { return item.id; }),
        biName: category.biName
    }); };
    var getLinkPath = function (_a) {
        var navigateToConfig = _a.navigateToConfig;
        return extractEntryPath(bmAPI.buildPageComponentLink(navigateToConfig));
    };
    var buildLinkNode = function (link) {
        var paths = __spreadArrays([getLinkPath(link)], (link.aliasPaths || []));
        return {
            label: link.label,
            navigateToConfig: merge({}, link.navigateToConfig, { contextData: { referrer: 'sidebar' } }),
            paths: paths.filter(Boolean),
            biName: link.biName
        };
    };
    var buildTitleNode = function (title) { return ({
        label: title.label
    }); };
    var buildNode = function (entry) {
        if (isCategory(entry)) {
            return buildCategoryNode(entry);
        }
        if (isLink(entry)) {
            return buildLinkNode(entry);
        }
        if (isTitle(entry)) {
            return buildTitleNode(entry);
        }
        return {};
    };
    return {
        build: buildNode
    };
};
//# sourceMappingURL=entry-to-node-converter.js.map