import { __assign } from "tslib";
import { ROOT_ENTRY_ID } from '../services/convert-entries-to-nodes';
import { isEnabledLink } from './select-item-type';
import { selectBiItemsListWithCount, selectNode } from './select-node';
import { BIEvent, BISource, ClickType } from '../services/biLogger';
import { getBadgeByItemId } from './select-badge';
import { selectActiveNodeId, selectActiveNodeParentId, selectCurrentPageId } from './select-active-node';
import { experimentsSelectors } from '@wix/wix-experiments-redux';
import { selectIsCollapsible } from './select-is-collapsible';
export var selectCategoryNavigateToConfig = function (state, node) {
    var sidebarExperimentCollapsible = selectIsCollapsible(state);
    var navigationLink = !sidebarExperimentCollapsible ?
        node.subItemIds.find(isEnabledLink(state)) :
        node.subItemIds.find(function (id) { return id === state.active.current; }) || node.subItemIds.find(isEnabledLink(state));
    return navigationLink && selectNode(state, navigationLink).navigateToConfig;
};
export var selectCategoryViewProps = function (state, _a) {
    var id = _a.id;
    var node = selectNode(state, id);
    var page_view = selectCurrentPageId(state);
    var categoryNavigateToConfig = selectCategoryNavigateToConfig(state, node);
    var biItemsListWithCount = selectBiItemsListWithCount(state, node.id);
    var isSidebarCollapseExpandEnabled = selectIsCollapsible(state);
    var useBmCollapsibleSidebarBI = experimentsSelectors(state).enabled('specs.wosbm.useBmCollapsibleSidebarBI');
    return {
        id: node.id,
        navigateToConfig: categoryNavigateToConfig,
        label: node.label,
        active: selectActiveNodeId(state) === id,
        isActiveParent: selectActiveNodeParentId(state) === id,
        enabled: node.enabled,
        hasSubItems: true,
        hasBadge: !!getBadgeByItemId(state, id),
        biParams: __assign(__assign({}, state.biParams), { app_id: categoryNavigateToConfig && categoryNavigateToConfig.pageComponentId, name: node.biName, sidebar_name: node.id, src: BISource.myAccount, section_name: ROOT_ENTRY_ID, page_view: page_view, category_items_list: JSON.stringify(biItemsListWithCount), type: ClickType.CLICK, evid: BIEvent.MENU_ITEM_CLICKED //550
         }),
        useBmCollapsibleSidebarBI: useBmCollapsibleSidebarBI,
        itemKey: node.id,
        isSidebarCollapseExpandEnabled: isSidebarCollapseExpandEnabled,
    };
};
//# sourceMappingURL=select-category-props.js.map