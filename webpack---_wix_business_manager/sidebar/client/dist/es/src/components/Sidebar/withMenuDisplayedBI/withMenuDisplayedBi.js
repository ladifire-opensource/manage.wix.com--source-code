import { __assign, __extends, __rest } from "tslib";
import * as React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import { BIEvent, BISource, log } from '../../../services/biLogger';
import { selectActiveNode, selectActiveParentNode } from '../../../selectors/select-active-node';
import { selectCategoryNavigateToConfig } from '../../../selectors/select-category-props';
import { selectBiItemsListWithCount, selectIsRootNodeReady, selectSubItemNodes } from '../../../selectors/select-node';
import { ROOT_ENTRY_ID } from '../../../services/convert-entries-to-nodes';
import { getIsInExpertsDashboard } from '../../../selectors/select-is-in-experts-dashboard';
import { selectIsCollapsible } from '../../../selectors/select-is-collapsible';
import { reportAppLoaded } from '../../../actions/fedops-actions';
import { experimentsSelectors } from '@wix/wix-experiments-redux';
export var withMenuDisplayedBi = function (WrappedComponent) {
    var loadFinishedReported = false;
    var MenuDisplayedBiEnricher = /** @class */ (function (_super) {
        __extends(MenuDisplayedBiEnricher, _super);
        function MenuDisplayedBiEnricher(props) {
            var _this = _super.call(this, props) || this;
            _this.reportMenuDisplayBiIfNeeded = function () {
                if (_this.isSidebarReady() && !loadFinishedReported) {
                    _this.fireMenuDisplayedBiEvent();
                    _this.props.reportAppLoaded();
                    loadFinishedReported = true;
                }
            };
            _this.isSidebarReady = function () {
                var _a = _this.props, shouldSendIbOnSidebarActualRender = _a.shouldSendIbOnSidebarActualRender, isRootNodeReady = _a.isRootNodeReady, activeNode = _a.activeNode;
                var isAnyNodeSelected = activeNode && activeNode.id !== ROOT_ENTRY_ID;
                if (shouldSendIbOnSidebarActualRender) {
                    return isAnyNodeSelected;
                }
                return isRootNodeReady && isAnyNodeSelected;
            };
            _this.fireMenuDisplayedBiEvent = function () {
                var _a = _this.props, activeNode = _a.activeNode, activeMenu = _a.activeMenu, activeNavigateToConfig = _a.activeNavigateToConfig, biItemsListWithCount = _a.biItemsListWithCount, biSubItemsListWithCount = _a.biSubItemsListWithCount;
                _this.setState({ reportedMenuId: activeMenu.id });
                log(__assign(__assign({ src: BISource.myAccount, evid: BIEvent.MENU_DISPLAYED }, _this.props.commonBiParams), { view: activeNavigateToConfig && activeNavigateToConfig.pageComponentId, section_name: activeMenu.biName, active_item: activeNode.biName, category_items_list: JSON.stringify(biItemsListWithCount), sub_category_items_list: JSON.stringify(biSubItemsListWithCount) }));
            };
            _this.state = {
                reportedMenuId: null
            };
            return _this;
        }
        MenuDisplayedBiEnricher.prototype.componentDidMount = function () {
            var shouldSendIbOnSidebarActualRender = this.props.shouldSendIbOnSidebarActualRender;
            if (shouldSendIbOnSidebarActualRender) {
                this.reportMenuDisplayBiIfNeeded();
            }
            else if (this.isSidebarReady()) {
                this.fireMenuDisplayedBiEvent();
            }
        };
        MenuDisplayedBiEnricher.prototype.componentDidUpdate = function (prevProps) {
            var shouldSendIbOnSidebarActualRender = this.props.shouldSendIbOnSidebarActualRender;
            var menuHasBeenReported = this.props.activeMenu.id === this.state.reportedMenuId;
            if (shouldSendIbOnSidebarActualRender) {
                this.reportMenuDisplayBiIfNeeded();
            }
            else if (this.isSidebarReady() && !menuHasBeenReported) {
                this.fireMenuDisplayedBiEvent();
            }
        };
        MenuDisplayedBiEnricher.prototype.render = function () {
            var _a = this.props, commonBiParams = _a.commonBiParams, activeNode = _a.activeNode, activeNavigateToConfig = _a.activeNavigateToConfig, activeMenu = _a.activeMenu, menuItems = _a.menuItems, isRootNodeReady = _a.isRootNodeReady, otherProps = __rest(_a, ["commonBiParams", "activeNode", "activeNavigateToConfig", "activeMenu", "menuItems", "isRootNodeReady"]);
            var shouldSendIbOnSidebarActualRender = this.props.shouldSendIbOnSidebarActualRender;
            if (shouldSendIbOnSidebarActualRender) {
                return React.createElement(WrappedComponent, null);
            }
            return React.createElement(WrappedComponent, __assign({}, otherProps));
        };
        return MenuDisplayedBiEnricher;
    }(Component));
    function mapStateToProps(state) {
        var menu = selectActiveParentNode(state);
        var menuItems = selectSubItemNodes(state, menu.id);
        var activeNode = selectActiveNode(state);
        var isCollapsible = selectIsCollapsible(state);
        var biSubItemsListWithCount = selectBiItemsListWithCount(state, menu.id);
        var isExpertsDashboard = getIsInExpertsDashboard(state);
        var shouldSendSubCategory = isCollapsible && !isExpertsDashboard && menu.id !== ROOT_ENTRY_ID;
        return {
            commonBiParams: state.biParams,
            activeNode: activeNode,
            activeNavigateToConfig: activeNode && (activeNode.subItemIds && activeNode.subItemIds.length ?
                selectCategoryNavigateToConfig(state, activeNode) :
                activeNode.navigateToConfig),
            activeMenu: menu,
            menuItems: menuItems,
            biItemsListWithCount: shouldSendSubCategory ? selectBiItemsListWithCount(state, ROOT_ENTRY_ID) : biSubItemsListWithCount,
            biSubItemsListWithCount: shouldSendSubCategory ? biSubItemsListWithCount : {},
            isRootNodeReady: selectIsRootNodeReady(state.nodes),
            shouldSendIbOnSidebarActualRender: experimentsSelectors(state).enabled('specs.wosbm.sidebarSendDisplayBiOnActualRender')
        };
    }
    return connect(mapStateToProps, {
        reportAppLoaded: reportAppLoaded
    })(MenuDisplayedBiEnricher);
};
//# sourceMappingURL=withMenuDisplayedBi.js.map