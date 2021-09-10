import { __assign, __awaiter, __generator } from "tslib";
import { getAllModules } from '@wix/business-manager-api';
export var SLOT_FETCHING_TIMEOUT = 5000;
var withSidebarConfig = function (module) {
    return typeof (module.getSidebarConfig) === 'function';
};
var reportSidebarConfigError = function (moduleId, e) {
    console.error('error getting sidebar config from module', moduleId, e); //tslint:disable-line
};
var toConfigWithModuleId = function (module) { return __awaiter(void 0, void 0, void 0, function () {
    var config, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, module.getSidebarConfig()];
            case 1:
                config = _a.sent();
                return [2 /*return*/, {
                        moduleId: module.moduleId,
                        config: config
                    }];
            case 2:
                e_1 = _a.sent();
                reportSidebarConfigError(module.moduleId, e_1);
                return [2 /*return*/, {
                        moduleId: module.moduleId,
                        config: null
                    }];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var toSidebarConfigs = function (all, _a) {
    var _b;
    var moduleId = _a.moduleId, config = _a.config;
    if (!config) {
        return all;
    }
    return (__assign(__assign({}, all), (_b = {}, _b[moduleId] = config, _b)));
};
var ResolveStatus;
(function (ResolveStatus) {
    ResolveStatus["RESOLVED"] = "resolved";
    ResolveStatus["UNRESOLVED"] = "unresolved";
})(ResolveStatus || (ResolveStatus = {}));
export var getModulesSidebarConfigs = function () { return __awaiter(void 0, void 0, void 0, function () {
    var configsPromises;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!window['__deferredModuleScriptsPoc__loadSlotModuleFilesUrls']) return [3 /*break*/, 2];
                return [4 /*yield*/, window['__deferredModuleScriptsPoc__loadSlotModuleFilesUrls']()];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2:
                configsPromises = getAllModules()
                    .filter(withSidebarConfig)
                    .map(toConfigWithModuleId);
                return [2 /*return*/, getResolvedAndUnresolvedConfigs(configsPromises)];
        }
    });
}); };
var getResolvedAndUnresolvedConfigs = function (promises) { return __awaiter(void 0, void 0, void 0, function () {
    var delay, configs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                delay = function (timeoutTime) {
                    return new Promise(function (resolve) {
                        setTimeout(resolve, timeoutTime);
                    });
                };
                return [4 /*yield*/, Promise.all(promises.map(function (confPromise) {
                        return Promise.race([
                            confPromise.then(function (conf) {
                                return ({
                                    type: ResolveStatus.RESOLVED,
                                    value: conf
                                });
                            }),
                            delay(SLOT_FETCHING_TIMEOUT).then(function () {
                                return ({
                                    type: ResolveStatus.UNRESOLVED,
                                    value: confPromise
                                });
                            })
                        ]);
                    }))];
            case 1:
                configs = _a.sent();
                return [2 /*return*/, sortToResolvedAndUnresolved(configs)];
        }
    });
}); };
var sortToResolvedAndUnresolved = function (configs) {
    var _a;
    var res = (_a = {}, _a[ResolveStatus.RESOLVED] = [], _a[ResolveStatus.UNRESOLVED] = [], _a);
    configs.forEach(function (conf) {
        res[conf.type].push(conf.value);
    });
    return res;
};
//# sourceMappingURL=getModulesSidebarConfigs.js.map