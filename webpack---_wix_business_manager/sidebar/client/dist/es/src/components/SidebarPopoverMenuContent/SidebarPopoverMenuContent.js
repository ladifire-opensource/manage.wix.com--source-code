import { __extends } from "tslib";
import * as React from 'react';
import { connect } from 'react-redux';
import css from './SidebarPopoverMenuContent.scss';
import Item from './SidebarPopoverMenuContentItem';
import { createColumns } from './columns';
import { experimentsSelectors } from '@wix/wix-experiments-redux';
import classnames from 'classnames';
import { CollapsibleInnerMenuWithoutTitles, selectIsCollapsible } from '../../selectors/select-is-collapsible';
var ROWS = 14;
var SidebarPopoverMenuContent = /** @class */ (function (_super) {
    __extends(SidebarPopoverMenuContent, _super);
    function SidebarPopoverMenuContent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SidebarPopoverMenuContent.prototype.render = function () {
        var _a;
        var _b = this.props, subItemsNodes = _b.subItemsNodes, rows = _b.rows, onLinkClick = _b.onLinkClick, isNewDashboardEnabled = _b.isNewDashboardEnabled, hideTitlesAndDividers = _b.hideTitlesAndDividers, isCollaosible = _b.isCollaosible;
        var wrapperClasses = classnames(css.wrapper, (_a = {},
            _a[css.newDashboardWrapper] = isNewDashboardEnabled,
            _a[css.collapsible] = isCollaosible,
            _a));
        var columns = createColumns(subItemsNodes, rows);
        return (React.createElement("div", { "data-hook": "sidebar-popover-menu-content", className: wrapperClasses }, columns.map(function (column, index) { return (React.createElement("div", { key: index, className: css.column }, column.map(function (item) { return (React.createElement("span", { key: item.id, className: css.itemWrapper },
            React.createElement(Item, { item: item, onLinkClick: onLinkClick, hideTitlesAndDividers: hideTitlesAndDividers }))); }))); })));
    };
    return SidebarPopoverMenuContent;
}(React.Component));
var mapStateToProps = function (state, ownProps) {
    var categoryNode = ownProps.categoryNode;
    var nodes = state.nodes;
    var subItemIds = (!!categoryNode && categoryNode.subItemIds) || [];
    var subItemsNodes = subItemIds.map(function (id) { return nodes[id]; });
    var isNewDashboardEnabled = experimentsSelectors(state).enabled('specs.wos1.useNewDashboard2020');
    var hideTitlesAndDividers = experimentsSelectors(state).get('specs.wosbm.useBmCollapsibleSidebar') === CollapsibleInnerMenuWithoutTitles;
    var isCollaosible = selectIsCollapsible(state);
    return {
        rows: ROWS,
        subItemsNodes: subItemsNodes,
        isNewDashboardEnabled: isNewDashboardEnabled,
        hideTitlesAndDividers: hideTitlesAndDividers,
        isCollaosible: isCollaosible,
    };
};
export default connect(mapStateToProps)(SidebarPopoverMenuContent);
//# sourceMappingURL=SidebarPopoverMenuContent.js.map