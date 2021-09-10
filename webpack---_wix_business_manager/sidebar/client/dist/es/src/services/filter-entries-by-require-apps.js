import { buildFilterByInstalledApps } from '@wix/business-manager-common-utils';
import { isAppInstalled } from '@wix/business-manager-api';
export var filterByInstalledApps = function (entry) { return (buildFilterByInstalledApps(isAppInstalled)(entry.requireApps)); };
//# sourceMappingURL=filter-entries-by-require-apps.js.map