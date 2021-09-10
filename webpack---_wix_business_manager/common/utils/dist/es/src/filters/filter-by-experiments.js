import { default as Experiments } from '@wix/wix-experiments';
import { isGroupEnabled } from './common-filters';
export var buildFilterByExperiments = function (conductedExperiments) {
    return function (requiredExperiments) {
        if (requiredExperiments === void 0) { requiredExperiments = []; }
        var isEnabled = function (requiredExperiment) {
            if (typeof (requiredExperiment) === 'string') {
                var _a = requiredExperiment.startsWith('!') ?
                    [requiredExperiment.split('!')[1], false] :
                    [requiredExperiment, true], specName = _a[0], shouldBeEnabled = _a[1];
                return new Experiments({ experiments: conductedExperiments }).enabled(specName) === shouldBeEnabled;
            }
            else if (typeof (requiredExperiment) === 'object') {
                var specIsAsRequired = function (_a) {
                    var specName = _a[0], value = _a[1];
                    return conductedExperiments[specName] ? conductedExperiments[specName] === value : value === 'false';
                    //todo: stop supporting fallback after migrating sidebar data to use strings for experiments when needed.
                };
                return Object.entries(requiredExperiment).every(specIsAsRequired);
            }
            else {
                return false;
            }
        };
        return isGroupEnabled(isEnabled, requiredExperiments);
    };
};
//# sourceMappingURL=filter-by-experiments.js.map