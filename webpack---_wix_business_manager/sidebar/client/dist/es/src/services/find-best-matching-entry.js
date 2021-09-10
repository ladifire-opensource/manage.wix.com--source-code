import { __spreadArrays } from "tslib";
import { ROOT_ENTRY_ID } from './convert-entries-to-nodes';
import { buildPageComponentLink } from '@wix/business-manager-api';
import { flatMap } from 'lodash';
import { isCategory, isLink } from '@wix/business-manager-sidebar-data';
import { extractEntryPath } from './extract-entry-path';
import { filterByExperiments } from './filter-entries-by-experiments';
import { filterEntries } from './filter-entries';
export var buildFindBestMatchingEntry = function (_extractPagePath) {
    var sortByPathLengthDescending = function (node1, node2) {
        return node2.path.length - node1.path.length;
    };
    var isLinkNode = function (node) { return !!node.paths; };
    var createPathToNodeTuple = function (link) { return link.paths.map(function (path) { return ({ path: path, link: link }); }); };
    var sortAndFindBestItem = function (items) {
        return items.sort(sortByPathLengthDescending).find(function (_a) {
            var path = _a.path;
            return _extractPagePath().startsWith(path);
        });
    };
    return {
        findActiveNodeId: function (nodes) {
            var links = nodes.filter(isLinkNode);
            var pathToNodes = flatMap(links, createPathToNodeTuple);
            var bestMatch = sortAndFindBestItem(pathToNodes);
            return bestMatch ? bestMatch.link.id : ROOT_ENTRY_ID;
        },
        findActiveEntry: function (entries, experiments) {
            if (!entries) {
                return null;
            }
            var filterEntryByExperiment = filterByExperiments(experiments.all());
            var filterEntry = function (entry) {
                return entry.id === 'dummySettingsItems' || filterEntryByExperiment(entry);
            };
            var flatEntries = flattenBySubitems(entries, [filterEntry]);
            var links = flatEntries.filter(isLink);
            var pathToEntryTuples = createPathToEntryTuples(links);
            var bestMatch = sortAndFindBestItem(pathToEntryTuples);
            return bestMatch ? bestMatch.link : null;
        }
    };
};
var getSubitemsIfCategory = function (item) { return isCategory(item) ? item.subItems : [item]; };
function flattenBySubitems(entries, filters) {
    return filterEntries(entries, filters).reduce(function (prev, entry) {
        return __spreadArrays(prev, filterEntries(getSubitemsIfCategory(entry), filters));
    }, []);
}
function createPathToEntryTuples(links) {
    return links
        .filter(linkHasValidNavigationConfig)
        .reduce(function (acc, link) {
        var mainPath = extractEntryPath(buildPageComponentLink(link.navigateToConfig));
        var aliasPaths = link.aliasPaths || [];
        return __spreadArrays(acc, [
            { path: mainPath, link: link }
        ], aliasPaths.map(function (path) { return ({ path: path, link: link }); }));
    }, []);
}
function linkHasValidNavigationConfig(link) {
    return !!buildPageComponentLink(link.navigateToConfig);
}
//# sourceMappingURL=find-best-matching-entry.js.map