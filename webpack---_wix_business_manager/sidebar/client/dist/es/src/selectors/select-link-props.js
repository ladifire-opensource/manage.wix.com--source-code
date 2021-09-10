import { __assign } from "tslib";
import { selectBiName, selectNode } from './select-node';
import { selectNodePageComponentId } from './selectNodePageComponentId';
import { BIEvent, BISource, ClickType } from '../services/biLogger';
import { getBadgeByItemId } from './select-badge';
import { selectActiveNodeId, selectCurrentPageId } from './select-active-node';
import { experimentsSelectors } from '@wix/wix-experiments-redux';
import { getIsInExpertsDashboard } from './select-is-in-experts-dashboard';
import { selectIsCollapsible } from './select-is-collapsible';
export var selectLinkViewProps = function (state, _a) {
    var id = _a.id;
    var node = selectNode(state, id);
    var isCollapsible = selectIsCollapsible(state);
    var isInExpertsDashboard = getIsInExpertsDashboard(state);
    var shouldScrollIntoView = isCollapsible && !isInExpertsDashboard && experimentsSelectors(state).enabled('specs.wosbm.useBmSidebarScrollIntoView');
    return {
        id: node.id,
        shouldScrollIntoView: shouldScrollIntoView,
        navigateToConfig: node.navigateToConfig,
        label: node.label,
        active: selectActiveNodeId(state) === id || selectCurrentPageId(state) === id,
        enabled: node.enabled,
        hasSubItems: false,
        hasBadge: !!getBadgeByItemId(state, id),
        badge: getBadgeByItemId(state, id),
        biParams: __assign(__assign({}, state.biParams), { app_id: selectNodePageComponentId(node), name: node.biName, sidebar_name: node.id, src: BISource.myAccount, section_name: selectBiName(state, node.parentId), type: ClickType.CLICK, evid: BIEvent.MENU_ITEM_CLICKED }),
        itemKey: node.id,
    };
};
//# sourceMappingURL=select-link-props.js.map