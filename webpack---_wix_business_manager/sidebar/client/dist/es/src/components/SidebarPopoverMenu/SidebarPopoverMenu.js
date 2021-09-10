import { __assign, __awaiter, __extends, __generator } from "tslib";
import * as React from 'react';
import css from './SidebarPopoverMenu.scss';
import { Popover } from 'wix-style-react';
import SidebarPopoverMenuContent from '../SidebarPopoverMenuContent/SidebarPopoverMenuContent';
import { createMoveByProp, resetMoveByProp } from '../../services/popover-menu-dom';
import SidebarPopoverIntent from './SidebarPopoverIntent';
import { SidebarPopoverContext } from './SidebarPopoverContext';
export var OPEN_POPOVER_AFTER_INTENT_EVENT = 'openPopoverAfterIntentEvent';
import { BIEvent, BISource, log } from '../../services/biLogger';
import { connect } from 'react-redux';
import { selectCurrentPageId } from '../../selectors/select-active-node';
import { experimentsSelectors } from '@wix/wix-experiments-redux';
import classnames from 'classnames';
import { selectBiItemsListWithCount } from '../../selectors/select-node';
var SHOW_DELAY = 200;
var SidebarPopoverMenu = /** @class */ (function (_super) {
    __extends(SidebarPopoverMenu, _super);
    function SidebarPopoverMenu(props) {
        var _this = _super.call(this, props) || this;
        _this.timeouts = [];
        _this.state = {
            isMouseEnter: false,
            moveBy: resetMoveByProp(),
            popoverClientRect: undefined,
            isShow: false
        };
        _this.contentNode = React.createRef();
        _this.linkNode = React.createRef();
        _this.afterIntentClosed = _this.afterIntentClosed.bind(_this);
        return _this;
    }
    SidebarPopoverMenu.prototype.mouseEnter = function () {
        return __awaiter(this, void 0, void 0, function () {
            var contentElement;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.preparePopover()];
                    case 1:
                        contentElement = _a.sent();
                        return [4 /*yield*/, this.showPopover(contentElement)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SidebarPopoverMenu.prototype.preparePopover = function () {
        return __awaiter(this, void 0, void 0, function () {
            var contentElement;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setState({ isMouseEnter: true });
                        return [4 /*yield*/, this.wait(0)];
                    case 1:
                        _a.sent();
                        contentElement = this.contentNode.current;
                        this.togglePopoverClass(false);
                        return [2 /*return*/, contentElement];
                }
            });
        });
    };
    SidebarPopoverMenu.prototype.showPopover = function (contentElement) {
        return __awaiter(this, void 0, void 0, function () {
            var popoverClientRect, height, top, moveBy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setState({ isShow: true });
                        return [4 /*yield*/, this.wait(SHOW_DELAY)];
                    case 1:
                        _a.sent();
                        popoverClientRect = contentElement && contentElement.getBoundingClientRect();
                        height = popoverClientRect.height, top = popoverClientRect.top;
                        moveBy = createMoveByProp(height, top);
                        this.setState({ moveBy: moveBy });
                        this.togglePopoverClass(true);
                        this.setState({ popoverClientRect: popoverClientRect });
                        this.sendOpenBI();
                        return [2 /*return*/];
                }
            });
        });
    };
    SidebarPopoverMenu.prototype.sendOpenBI = function () {
        var _a = this.props, _b = _a.categoryNode, biName = _b.biName, id = _b.id, biParams = _a.biParams, biItemsListWithCount = _a.biItemsListWithCount;
        log(__assign(__assign({}, biParams), { src: BISource.myAccount, evid: BIEvent.SHOW_QUICK_ACCESS, name: biName, sidebar_name: id, section_name: biName, category_items_list: JSON.stringify(biItemsListWithCount), origin: 'tooltip' }));
    };
    SidebarPopoverMenu.prototype.togglePopoverClass = function (isShow) {
        var contentElement = this.contentNode.current;
        if (!contentElement) {
            return;
        }
        var portalElement = contentElement.closest && contentElement.closest('[data-hook="popover-portal"]');
        var portalClassList = portalElement && portalElement.classList;
        if (portalClassList) {
            isShow ? portalClassList.add(css.show) : portalClassList.remove(css.show);
        }
    };
    SidebarPopoverMenu.prototype.closePopover = function () {
        this.clean();
    };
    SidebarPopoverMenu.prototype.clean = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.timeouts.forEach(clearTimeout);
                this.setState({ isMouseEnter: false, moveBy: resetMoveByProp(), isShow: false });
                return [2 /*return*/];
            });
        });
    };
    SidebarPopoverMenu.prototype.wait = function (time) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.timeouts.push(setTimeout(resolve, time));
        });
    };
    SidebarPopoverMenu.prototype.componentDidMount = function () {
        this.linkNode.current.addEventListener(OPEN_POPOVER_AFTER_INTENT_EVENT, this.afterIntentClosed);
    };
    SidebarPopoverMenu.prototype.afterIntentClosed = function () {
        this.mouseEnter();
    };
    SidebarPopoverMenu.prototype.componentWillUnmount = function () {
        this.linkNode.current.removeEventListener(OPEN_POPOVER_AFTER_INTENT_EVENT, this.afterIntentClosed);
        this.clean();
    };
    SidebarPopoverMenu.prototype.onClickContent = function (e) {
        e.stopPropagation();
    };
    SidebarPopoverMenu.prototype.render = function () {
        var _a;
        var _this = this;
        var _b = this.props, children = _b.children, categoryNode = _b.categoryNode, isNewDashboardEnabled = _b.isNewDashboardEnabled;
        var _c = this.state, isMouseEnter = _c.isMouseEnter, moveBy = _c.moveBy, popoverClientRect = _c.popoverClientRect, isShow = _c.isShow;
        var id = categoryNode.id;
        var popoverClassname = classnames(css.popover, (_a = {},
            _a[css.oldDashboard] = !isNewDashboardEnabled,
            _a));
        return (React.createElement(Popover, { dataHook: "popover-menu-" + id, placement: "right", shown: isMouseEnter, appendTo: "window", showArrow: true, moveBy: moveBy, className: popoverClassname, zIndex: isShow ? 1000 : -1000, theme: "dark", fixed: true, flip: false, onMouseEnter: function () { return _this.mouseEnter(); }, onMouseLeave: function () { return _this.closePopover(); } },
            React.createElement(Popover.Element, null,
                React.createElement("div", { ref: this.linkNode, className: css.linkWrapper }, children)),
            React.createElement(Popover.Content, null,
                React.createElement(SidebarPopoverContext.Provider, { value: { isPopoverMenu: true } },
                    React.createElement("div", { "data-hook": "sidebar-popover-content-wrapper", className: css.content, ref: this.contentNode, onClick: function (e) { return _this.onClickContent(e); } },
                        React.createElement(SidebarPopoverIntent, { popoverClientRect: popoverClientRect, moveBy: moveBy, closePopover: function () { return _this.closePopover(); } }),
                        React.createElement(SidebarPopoverMenuContent, { categoryNode: categoryNode, onLinkClick: function () { return _this.closePopover(); } }))))));
    };
    return SidebarPopoverMenu;
}(React.Component));
var mapStateToProps = function (state, _a) {
    var categoryNode = _a.categoryNode;
    var page_view = selectCurrentPageId(state);
    var isNewDashboardEnabled = experimentsSelectors(state).enabled('specs.wos1.useNewDashboard2020');
    return {
        biParams: __assign(__assign({}, state.biParams), { page_view: page_view }),
        biItemsListWithCount: selectBiItemsListWithCount(state, categoryNode.id),
        isNewDashboardEnabled: isNewDashboardEnabled
    };
};
export default connect(mapStateToProps)(SidebarPopoverMenu);
//# sourceMappingURL=SidebarPopoverMenu.js.map