import { __assign, __awaiter, __generator } from "tslib";
import { UPDATE_ENTRIES } from './types';
import { updateSidebarState } from './update-active-id';
import { getModulesSidebarConfigs, toSidebarConfigs } from '../services/getModulesSidebarConfigs';
import { updateNodes } from './calculate-nodes';
import { calculateEntriesBadges } from './badges';
import { calculateAvailableNodes } from '../services/convert-entries-to-nodes';
import { populateSlots } from '../services/populate-slots';
import { showNoPermissionsPageIfNeeded } from './show-no-permissions-if-needed';
import { selectEntriesDataPath } from '../selectors/select-entries-data-path';
export var fetchSidebarNodes = function () { return function (dispatch, getState, _a) {
    var serverApi = _a.serverApi, fedopsLogger = _a.fedopsLogger;
    return __awaiter(void 0, void 0, void 0, function () {
        var entriesDataPath, _b, entries, slotConfigs, resolvedSidebarConfigs;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    fedopsLogger.appLoadingPhaseStart('get-slots-configs');
                    fedopsLogger.appLoadingPhaseStart('fetch-entries');
                    entriesDataPath = selectEntriesDataPath(getState());
                    return [4 /*yield*/, Promise.all([
                            serverApi.fetchEntries(entriesDataPath).then(function (ents) {
                                fedopsLogger.appLoadingPhaseFinish('fetch-entries');
                                return ents;
                            }),
                            getModulesSidebarConfigs().then(function (confs) {
                                if (!confs.unresolved.length) {
                                    fedopsLogger.appLoadingPhaseFinish('get-slots-configs');
                                }
                                return confs;
                            })
                        ])];
                case 1:
                    _b = _c.sent(), entries = _b[0], slotConfigs = _b[1];
                    resolvedSidebarConfigs = slotConfigs.resolved.reduce(toSidebarConfigs, {});
                    dispatch(processEntries(entries, resolvedSidebarConfigs));
                    dispatch(handleUnresolvedConfigs(resolvedSidebarConfigs, slotConfigs.unresolved, entries, fedopsLogger));
                    return [2 /*return*/];
            }
        });
    });
}; };
export var processEntries = function (entries, configs) { return function (dispatch, getState) {
    var entriesWithSlots = populateSlots(entries, configs);
    dispatch(fetchEntriesSuccess(entriesWithSlots));
    var nodes = calculateAvailableNodes(getState(), entriesWithSlots);
    dispatch(updateNodes(nodes));
    dispatch(showNoPermissionsPageIfNeeded());
    dispatch(updateSidebarState());
    dispatch(calculateEntriesBadges());
}; };
var handleUnresolvedConfigs = function (resolvedConfigs, unresolvedConfigs, entries, fedopsLogger) { return function (dispatch) { return __awaiter(void 0, void 0, void 0, function () {
    var resolvedConfs_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!unresolvedConfigs.length) return [3 /*break*/, 2];
                resolvedConfs_1 = __assign({}, resolvedConfigs);
                return [4 /*yield*/, Promise.all(unresolvedConfigs.map(function (confPromise) {
                        return confPromise.then(function (conf) {
                            if (conf.config) {
                                resolvedConfs_1[conf.moduleId] = conf.config;
                                dispatch(processEntries(entries, resolvedConfs_1));
                            }
                        });
                    }))];
            case 1:
                _a.sent();
                fedopsLogger.appLoadingPhaseFinish('get-slots-configs');
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); }; };
var fetchEntriesSuccess = function (entries) {
    return { type: UPDATE_ENTRIES, entries: entries };
};
//# sourceMappingURL=fetch-sidebar-nodes.js.map