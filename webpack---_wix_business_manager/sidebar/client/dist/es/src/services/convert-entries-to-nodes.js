import { __spreadArrays } from "tslib";
import { removeRedundantEntries } from './remove-redundant-entries';
import { isCategory, isLink } from '@wix/business-manager-sidebar-data';
import { buildEntryToNodeConverter } from './entry-to-node-converter';
import { filterByInstalledApps } from './filter-entries-by-require-apps';
import { filterByExperiments } from './filter-entries-by-experiments';
import { filterEntries } from './filter-entries';
import * as BusinessManagerAPI from '@wix/business-manager-api';
import { filterByPermissions } from './filter-by-permission';
import { filterBySitelessExperience } from './filter-by-siteless-experience';
import { filterByViewMode } from './filter-by-view-mode';
export var ROOT_ENTRY_ID = 'ROOT';
export var ROOT_LEVEL = 0;
var rootEntry = function (entries) {
    if (entries === void 0) { entries = []; }
    return ({
        id: ROOT_ENTRY_ID,
        subItems: entries,
        label: ROOT_ENTRY_ID,
        biName: ROOT_ENTRY_ID
    });
};
export var defaultSidebarNodes = [{
        id: ROOT_ENTRY_ID,
        parentId: ROOT_ENTRY_ID,
        level: ROOT_LEVEL,
        subItemIds: [],
        enabled: true,
        biName: ROOT_ENTRY_ID
    }];
export var convertToSidebarNodes = function (entries, converter) {
    var flattenNodes = function (es, parentId, level) {
        var arrayOfNodes = es.map(function (entry) { return __spreadArrays(flattenNodes(isCategory(entry) ? entry.subItems : [], entry.id, level + 1), [
            converter.convert(entry, parentId, level)
        ]); });
        return [].concat.apply([], arrayOfNodes);
    };
    return flattenNodes([rootEntry(entries)], ROOT_ENTRY_ID, ROOT_LEVEL);
};
var flattenOneCategory = function (entries) {
    var first = entries[0];
    if (entries.length === 1 && isCategory(first)) {
        return flattenOneCategory(first.subItems);
    }
    return entries;
};
var flattenSingleChild = function (entries) {
    return entries.map(function (entry) {
        var avoidCollapsing = isCategory(entry) && entry.isNotCollapsible;
        if (isCategory(entry) && entry.subItems.filter(isLink).length === 1 && !avoidCollapsing) {
            return entry.subItems.filter(isLink)[0];
        }
        return entry;
    });
};
export var calculateAvailableNodes = function (state, entries, bmAPI) {
    if (bmAPI === void 0) { bmAPI = BusinessManagerAPI; }
    var experiments = state.experiments;
    if (!entries) {
        return;
    }
    var filters = [filterByInstalledApps, filterByExperiments(experiments), filterByPermissions(state), filterBySitelessExperience(state), filterByViewMode(state)];
    var visibleEntries = filterEntries(entries, filters);
    var cleanEntries = removeRedundantEntries(visibleEntries);
    var converter = buildEntryToNodeConverter(state, bmAPI);
    var flattenedCategories = flattenOneCategory(cleanEntries);
    var flattenedSingleChild = flattenSingleChild(flattenedCategories);
    return convertToSidebarNodes(flattenedSingleChild, converter);
};
//# sourceMappingURL=convert-entries-to-nodes.js.map