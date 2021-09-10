import { __extends, __spreadArrays } from "tslib";
import * as React from 'react';
import css from './Sidebar.scss';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Footer } from '../Footer/Footer';
import { selectNodeType, SidebarComponentsTypes } from '../../selectors/select-item-type';
import { SidebarItem as SidebarItemView } from '../SidebarItem/SidebarItem';
import { goToParentMenu } from '../../actions/go-to-parent-menu';
import { reportAppLoaded } from '../../actions/fedops-actions';
import { PersistentHeader } from '../Header/PersistentHeader';
import { Sidebar, SidebarDivider, Box, SidebarItemContextConsumer } from 'wix-style-react';
import { selectIsHidden } from '../../selectors/select-is-hidden';
import { FirstTimeExperienceManager } from '../../services/FirstTimeExperienceManager';
import { SidebarSkeleton } from '../SidebarSkeleton/SidebarSkeleton';
import { BackButton } from '../BackButton/BackButton.container';
import { getIsInExpertsDashboard } from '../../selectors/select-is-in-experts-dashboard';
import { selectActiveNodeId } from '../../selectors/select-active-node';
import { isSitelessExperience } from '../../selectors/select-site';
import { withMenuDisplayedBi } from './withMenuDisplayedBI/withMenuDisplayedBi';
import { selectIsRootNodeReady } from '../../selectors/select-node';
import SidebarPopoverMenu from '../SidebarPopoverMenu/SidebarPopoverMenu';
import { experimentsSelectors } from '@wix/wix-experiments-redux';
import { ROOT_ENTRY_ID } from '../../services/convert-entries-to-nodes';
var CollapsibleInnerMenuWithoutTitles = 'no-titles';
var CollapsibleInnerMenu = 'titles';
var SidebarView = /** @class */ (function (_super) {
    __extends(SidebarView, _super);
    function SidebarView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.backClickStorage = new FirstTimeExperienceManager();
        _this.mounted = false;
        _this.state = { firstTimeUser: false };
        _this.loadFinishedReported = false;
        _this.WrappedSidebarItemForDisplayBi = withMenuDisplayedBi(React.Fragment);
        _this.onBackButtonClick = function (e) {
            e.preventDefault();
            _this.backClickStorage.setNotFirstTime();
            _this.props.goToParentMenu();
        };
        _this.reportAppLoadedIfNeeded = function () {
            if (selectIsRootNodeReady(_this.props.nodes) && !_this.loadFinishedReported) {
                _this.props.reportAppLoaded();
                _this.loadFinishedReported = true;
            }
        };
        _this.renderSubMenuItems = function (item) {
            var _a = _this.props, sidebarExperimentCollapsible = _a.sidebarExperimentCollapsible, hideInnerDividersAndTitles = _a.hideInnerDividersAndTitles;
            var subMenuItems = _this.renderSubMenuById(item.id, hideInnerDividersAndTitles);
            var backButton = React.createElement(Sidebar.BackButton, { key: '_SidebarBackButton', onClick: _this.onBackButtonClick }, React.createElement(BackButton, { animateArrow: _this.state.firstTimeUser }));
            if (subMenuItems.length > 0) {
                return !sidebarExperimentCollapsible ? __spreadArrays([backButton], subMenuItems) : subMenuItems;
            }
            return null;
        };
        _this.renderSubMenuById = function (parentId, hideDividersAndTitles) {
            if (hideDividersAndTitles === void 0) { hideDividersAndTitles = false; }
            var _a = _this.props, isSidebarPopoverMenuEnabled = _a.isSidebarPopoverMenuEnabled, nodes = _a.nodes;
            return nodes[parentId].subItemIds.map(function (itemId) {
                var node = nodes[itemId];
                switch (selectNodeType(node)) {
                    case SidebarComponentsTypes.link: {
                        return React.createElement(Sidebar.Item, { key: itemId, itemKey: itemId, disable: !node.enabled },
                            React.createElement(SidebarItemView, { id: itemId }));
                    }
                    case SidebarComponentsTypes.category: {
                        var showPopoverMenu_1 = isSidebarPopoverMenuEnabled && node.enabled;
                        return (React.createElement(Sidebar.Item, { key: itemId, itemKey: itemId, disable: !node.enabled, innerMenu: _this.renderSubMenuItems(node) },
                            React.createElement(SidebarItemContextConsumer, null, function (_a) {
                                var getIsMenuExpanded = _a.getIsMenuExpanded;
                                var isMenuExpanded = getIsMenuExpanded();
                                return (React.createElement(React.Fragment, null,
                                    showPopoverMenu_1 && React.createElement(SidebarPopoverMenu, { categoryNode: node },
                                        React.createElement(SidebarItemView, { id: itemId, itemKey: itemId, isMenuExpanded: isMenuExpanded })),
                                    !showPopoverMenu_1 && React.createElement(SidebarItemView, { id: itemId, itemKey: itemId, isMenuExpanded: isMenuExpanded })));
                            })));
                    }
                    case SidebarComponentsTypes.separator: {
                        return hideDividersAndTitles ? React.createElement(React.Fragment, null) : React.createElement(SidebarDivider, { key: itemId, dataHook: "sidebar-divider" });
                    }
                    case SidebarComponentsTypes.title: {
                        return hideDividersAndTitles ? React.createElement(React.Fragment, null) : React.createElement(SidebarItemView, { key: itemId, label: node.label, id: itemId });
                    }
                    default:
                        return null;
                }
            });
        };
        _this.wrapSidebarItems = function () {
            var shouldSendIbOnSidebarActualRender = _this.props.shouldSendIbOnSidebarActualRender;
            return shouldSendIbOnSidebarActualRender ? __spreadArrays(_this.renderSubMenuById(ROOT_ENTRY_ID), [React.createElement(_this.WrappedSidebarItemForDisplayBi, null)]) :
                _this.renderSubMenuById(ROOT_ENTRY_ID);
        };
        return _this;
    }
    SidebarView.prototype.componentDidMount = function () {
        var _this = this;
        var shouldSendIbOnSidebarActualRender = this.props.shouldSendIbOnSidebarActualRender;
        if (!shouldSendIbOnSidebarActualRender) {
            this.reportAppLoadedIfNeeded();
        }
        this.mounted = true;
        this.backClickStorage.isFirstTime().then(function (val) { return _this.mounted && _this.setState({ firstTimeUser: val }); });
    };
    SidebarView.prototype.componentWillUnmount = function () {
        this.mounted = false;
    };
    SidebarView.prototype.componentDidUpdate = function () {
        this.reportAppLoadedIfNeeded();
    };
    SidebarView.prototype.render = function () {
        var _a = this.props, isHidden = _a.isHidden, activeNodeId = _a.activeNodeId, isExpertsDashboard = _a.isExpertsDashboard, nodes = _a.nodes, isSidebarPopoverMenuEnabled = _a.isSidebarPopoverMenuEnabled;
        return React.createElement("div", { className: css.sidebarWrapper, "data-hook": "sidebar", "data-is-hidden": isHidden },
            React.createElement(Sidebar, { "data-hook": "sidebar-inner", selectedKey: activeNodeId, isHidden: isHidden, skin: isExpertsDashboard ? 'light' : 'dark', classNames: isSidebarPopoverMenuEnabled ? { content: css.content } : null },
                !isExpertsDashboard && (React.createElement(Sidebar.PersistentHeader, null,
                    React.createElement(PersistentHeader, null))),
                React.createElement(Box, { marginBottom: "12px" }),
                selectIsRootNodeReady(nodes) ?
                    this.wrapSidebarItems() :
                    React.createElement(SidebarSkeleton, { isLight: isExpertsDashboard }),
                React.createElement(Sidebar.PersistentFooter, null, !this.props.isSitelessExperience ? React.createElement(Footer, null) : null)));
    };
    return SidebarView;
}(Component));
var mapStateToProps = function (state) {
    var InnerMenuType = experimentsSelectors(state).get('specs.wosbm.useBmCollapsibleSidebar');
    var isExpertsDashboard = getIsInExpertsDashboard(state);
    var hideInnerDividersAndTitles = !isExpertsDashboard && InnerMenuType === CollapsibleInnerMenuWithoutTitles;
    return {
        nodes: state.nodes,
        activeNodeId: selectActiveNodeId(state),
        isHidden: selectIsHidden(state),
        isExpertsDashboard: getIsInExpertsDashboard(state),
        isSitelessExperience: isSitelessExperience(state),
        isSidebarPopoverMenuEnabled: !isSitelessExperience(state),
        sidebarExperimentCollapsible: !isExpertsDashboard && (InnerMenuType === CollapsibleInnerMenu || InnerMenuType === CollapsibleInnerMenuWithoutTitles),
        hideInnerDividersAndTitles: hideInnerDividersAndTitles,
        shouldSendIbOnSidebarActualRender: experimentsSelectors(state).enabled('specs.wosbm.sidebarSendDisplayBiOnActualRender')
    };
};
export var BusinessManagerSidebar = connect(mapStateToProps, {
    goToParentMenu: goToParentMenu,
    reportAppLoaded: reportAppLoaded
})(SidebarView);
export var BusinessManagerSidebarWrappedWithBi = withMenuDisplayedBi(connect(mapStateToProps, {
    goToParentMenu: goToParentMenu,
    reportAppLoaded: reportAppLoaded
})(SidebarView));
//# sourceMappingURL=Sidebar.js.map