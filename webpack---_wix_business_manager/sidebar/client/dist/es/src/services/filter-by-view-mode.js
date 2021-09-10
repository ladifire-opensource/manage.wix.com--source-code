import { selectHosting } from '../selectors/select-hosting';
import { IViewMode } from '@wix/business-manager-api';
export var filterByViewMode = function (state) { return function (entry) {
    var isInDashboard = selectHosting(state) === IViewMode.DASHBOARD;
    var shouldHide = !isInDashboard && entry.hideInEditorMode;
    return !shouldHide;
}; };
//# sourceMappingURL=filter-by-view-mode.js.map