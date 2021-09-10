import { buildFilterByExperiments } from '@wix/business-manager-common-utils';
export var filterByExperiments = function (experiments) { return function (entry) { return (buildFilterByExperiments(experiments)(entry.visibleByExperiments)); }; };
//# sourceMappingURL=filter-entries-by-experiments.js.map