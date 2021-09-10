var _a;
import * as React from 'react';
import { connect } from 'react-redux';
import { SidebarLink, SidebarLinkView } from './SidebarLink';
import { selectItemType, selectTooltipContent, SidebarComponentsTypes } from '../../selectors/select-item-type';
import { withTooltip } from './withTooltip';
import { withBadge } from '../Badge/withBadge';
import { selectCategoryViewProps } from '../../selectors/select-category-props';
import { SidebarTitle } from '../SidebarTitle/SidebarTitle';
var SidebarCategory = connect(selectCategoryViewProps)(SidebarLinkView);
var SidebarComponents = (_a = {},
    _a[SidebarComponentsTypes.link] = SidebarLink,
    _a[SidebarComponentsTypes.title] = SidebarTitle,
    _a[SidebarComponentsTypes.category] = SidebarCategory,
    _a);
var SidebarItemView = function (_a) {
    var type = _a.type, id = _a.id, tooltip = _a.tooltip, itemKey = _a.itemKey, isMenuExpanded = _a.isMenuExpanded;
    var Component = withTooltip(tooltip)(withBadge(id)(SidebarComponents[type]));
    return React.createElement(Component, { id: id, itemKey: itemKey, isMenuExpanded: isMenuExpanded });
};
var mapStateToProps = function (state, _a) {
    var id = _a.id;
    return ({
        id: id,
        type: selectItemType(state, id),
        tooltip: selectTooltipContent(state, id),
        itemKey: id,
    });
};
export var SidebarItem = connect(mapStateToProps)(SidebarItemView);
//# sourceMappingURL=SidebarItem.js.map