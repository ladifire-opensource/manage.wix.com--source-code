import { __assign, __extends, __rest } from "tslib";
import * as React from 'react';
import css from './SidebarPopoverMenu.scss';
import { OPEN_POPOVER_AFTER_INTENT_EVENT } from './SidebarPopoverMenu';
import { Triangle } from '../Triangle/Triangle';
var LINK_HEIGHT = 36;
var LINK_WIDTH = 235;
var GRACE = 1;
var SidebarPopoverIntent = /** @class */ (function (_super) {
    __extends(SidebarPopoverIntent, _super);
    function SidebarPopoverIntent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            width: LINK_WIDTH
        };
        return _this;
    }
    SidebarPopoverIntent.prototype.checkIntent = function () {
        var _this = this;
        this.prevX = this.currentX;
        this.timeout = setTimeout(function () {
            _this.currentX > _this.prevX ? _this.checkIntent() : _this.close();
        }, 100);
    };
    SidebarPopoverIntent.prototype.close = function () {
        this.props.closePopover();
        var event = new Event(OPEN_POPOVER_AFTER_INTENT_EVENT, {
            bubbles: true //"bubbles" means that the event will trigger upwards to the parents and not downwards to the children
        });
        var mouseOnLink = document.elementFromPoint(this.currentX, this.currentY);
        mouseOnLink && mouseOnLink.dispatchEvent(event);
    };
    SidebarPopoverIntent.prototype.onMouseMove = function (x, y) {
        this.currentX = x;
        this.currentY = y;
    };
    SidebarPopoverIntent.prototype.onMouseEnter = function (x) {
        this.currentX = x;
        this.setState({ width: LINK_WIDTH - x + GRACE });
        this.checkIntent();
    };
    SidebarPopoverIntent.prototype.onMouseOut = function () {
        clearTimeout(this.timeout);
        this.setState({ width: LINK_WIDTH });
    };
    SidebarPopoverIntent.prototype.componentWillUnmount = function () {
        clearTimeout(this.timeout);
    };
    SidebarPopoverIntent.prototype.getTopHeight = function (height) {
        return height / 2 - this.props.moveBy.y - LINK_HEIGHT / 2;
    };
    SidebarPopoverIntent.prototype.getBottomHeight = function (height) {
        return height / 2 + this.props.moveBy.y - LINK_HEIGHT / 2;
    };
    SidebarPopoverIntent.prototype.render = function () {
        var _this = this;
        var content = this.props.popoverClientRect;
        if (!content) {
            return null;
        }
        var width = this.state.width;
        var topHeight = this.getTopHeight(content.height);
        var bottomHeight = this.getBottomHeight(content.height);
        return (React.createElement(Triangles, { width: width, topHeight: topHeight, bottomHeight: bottomHeight, fullHeight: content.height, onMouseMove: function (e) { return _this.onMouseMove(e.clientX, e.clientY); }, onMouseEnter: function (e) { return _this.onMouseEnter(e.clientX); }, onMouseOut: function () { return _this.onMouseOut(); } }));
    };
    return SidebarPopoverIntent;
}(React.Component));
var Triangles = function (_a) {
    var width = _a.width, topHeight = _a.topHeight, bottomHeight = _a.bottomHeight, fullHeight = _a.fullHeight, events = __rest(_a, ["width", "topHeight", "bottomHeight", "fullHeight"]);
    return (React.createElement("div", { className: css.trianglesWrapper },
        React.createElement("div", { className: css.triangles, style: { height: fullHeight + "px" } },
            React.createElement(Triangle, __assign({ bottom: width, right: topHeight }, events)),
            React.createElement("div", __assign({ className: css.bridge, style: { height: fullHeight - topHeight - bottomHeight + "px" } }, events)),
            React.createElement(Triangle, __assign({ top: width, right: bottomHeight }, events)))));
};
export default SidebarPopoverIntent;
//# sourceMappingURL=SidebarPopoverIntent.js.map