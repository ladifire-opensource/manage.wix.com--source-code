import { getIsInExpertsDashboard } from './select-is-in-experts-dashboard';
export var selectEntriesDataPath = function (state) {
    if (getIsInExpertsDashboard(state)) {
        return 'assets/partners-dashboard-items.json';
    }
    return 'assets/sidebar-items.json';
};
//# sourceMappingURL=select-entries-data-path.js.map