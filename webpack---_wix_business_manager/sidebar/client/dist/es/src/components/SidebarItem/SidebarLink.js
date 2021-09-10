import { __assign, __extends, __rest } from "tslib";
import * as React from 'react';
import { BadgeType, getPageComponentLinkComponent } from '@wix/business-manager-api';
import { connect } from 'react-redux';
import { selectLinkViewProps } from '../../selectors/select-link-props';
import { withTranslation } from '@wix/wix-i18n-config';
import css from './SidebarLink.scss';
import { BIEvent, ClickType, log } from '../../services/biLogger';
import { NewBadgeComponent } from '../Badge/NewBadge';
import { SidebarSectionItem } from 'wix-style-react';
import classnames from 'classnames';
import { SidebarPopoverContext } from '../SidebarPopoverMenu/SidebarPopoverContext';
var reportItemClickBI = function (biParams, useBmCollapsibleSidebarBI, hasSubItems, isMenuExpanded, activeParent) { return function (event) {
    if (useBmCollapsibleSidebarBI) {
        var page_view = biParams.page_view, category_items_list = biParams.category_items_list, app_id = biParams.app_id, is_from_main_sidebar = biParams.is_from_main_sidebar, type = biParams.type, commonBiParams = __rest(biParams, ["page_view", "category_items_list", "app_id", "is_from_main_sidebar", "type"]);
        var clickType = type;
        if (!event.defaultPrevented) {
            if (hasSubItems) {
                var isExpanding = !(activeParent && isMenuExpanded);
                clickType = isExpanding ? ClickType.EXPAND : ClickType.COLLAPSE;
                if (isExpanding) {
                    log(__assign(__assign({}, commonBiParams), { page_view: page_view, category_items_list: category_items_list, evid: BIEvent.SHOW_QUICK_ACCESS }));
                }
            }
            log(__assign(__assign({}, commonBiParams), { is_from_main_sidebar: is_from_main_sidebar, app_id: app_id, type: clickType }));
        }
    }
    else {
        if (!event.defaultPrevented) {
            log(biParams);
        }
    }
}; };
var View = /** @class */ (function (_super) {
    __extends(View, _super);
    function View(props) {
        var _this = _super.call(this, props) || this;
        _this.wrapperRef = React.createRef();
        return _this;
    }
    View.prototype.render = function () {
        var _a;
        var _this = this;
        var isPopoverMenu = this.context.isPopoverMenu;
        var _b = this.props, t = _b.t, id = _b.id, itemKey = _b.itemKey, navigateToConfig = _b.navigateToConfig, label = _b.label, active = _b.active, isActiveParent = _b.isActiveParent, enabled = _b.enabled, hasSubItems = _b.hasSubItems, biParams = _b.biParams, showNewBadge = _b.showNewBadge, badge = _b.badge, useBmCollapsibleSidebarBI = _b.useBmCollapsibleSidebarBI, isSidebarCollapseExpandEnabled = _b.isSidebarCollapseExpandEnabled, isMenuExpanded = _b.isMenuExpanded;
        var rightSideItem = showNewBadge && React.createElement(NewBadgeComponent, { itemId: id });
        var linkClass = classnames(css.link, (_a = {}, _a[css.inPopover] = isPopoverMenu, _a));
        if (!enabled) {
            return (React.createElement("div", { "data-hook": id, className: linkClass },
                React.createElement(SidebarSectionItem, { itemKey: itemKey, disabled: true, suffix: rightSideItem, dataHook: id + "-item" },
                    React.createElement("span", null, t(label)))));
        }
        var Link = getPageComponentLinkComponent();
        var biEvent = __assign({ is_from_main_sidebar: !isPopoverMenu, origin: isPopoverMenu ? 'tooltip' : 'sidebar' }, biParams);
        var genrateSidebarItemWithoutLink = function () { return React.createElement(SidebarSectionItem, { selected: active, drillable: hasSubItems, alwaysDisplayChevron: true, suffix: rightSideItem, dataHook: id + "-item", itemKey: itemKey, onClick: reportItemClickBI(biEvent, useBmCollapsibleSidebarBI, hasSubItems, isMenuExpanded, isActiveParent) },
            React.createElement("span", { "data-hook": id + "-span", ref: _this.wrapperRef }, t(label))); };
        if (badge && badge.type === BadgeType.COUNT) {
            biEvent.counter = badge.count;
        }
        return (isSidebarCollapseExpandEnabled && isActiveParent ?
            genrateSidebarItemWithoutLink() :
            React.createElement(Link, __assign({ className: linkClass, onClick: reportItemClickBI(biEvent, useBmCollapsibleSidebarBI, hasSubItems, isMenuExpanded, isActiveParent) }, navigateToConfig, { "data-hook": id, "data-is-active": active }),
                React.createElement(SidebarSectionItem, { selected: active, drillable: hasSubItems, alwaysDisplayChevron: true, suffix: rightSideItem, dataHook: id + "-item", itemKey: itemKey },
                    React.createElement("span", null, t(label))),
                React.createElement("div", { ref: this.wrapperRef, "data-hook": id + "-scrollable" })));
    };
    View.prototype._scrollIntoView = function () {
        var _this = this;
        var isPopoverMenu = this.context.isPopoverMenu;
        var innerMenusMaxAnimationDuration = 1100;
        if (this.props.shouldScrollIntoView && this.props.active && !isPopoverMenu) {
            setTimeout(function () {
                _this.wrapperRef.current && _this.wrapperRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                });
            }, innerMenusMaxAnimationDuration);
        }
    };
    View.prototype.componentDidUpdate = function () {
        this._scrollIntoView();
    };
    View.prototype.componentDidMount = function () {
        this._scrollIntoView();
    };
    View.contextType = SidebarPopoverContext;
    return View;
}(React.Component));
export var SidebarLinkView = withTranslation()(View);
export var SidebarLink = connect(selectLinkViewProps)(SidebarLinkView);
//# sourceMappingURL=SidebarLink.js.map