import { __assign, __extends } from "tslib";
import css from './Triangle.scss';
import * as React from 'react';
import { omit } from 'lodash';
var Triangle = /** @class */ (function (_super) {
    __extends(Triangle, _super);
    function Triangle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Triangle.prototype.tan = function (a, b) {
        return Math.atan2(a, b) * 180 / Math.PI;
    };
    Triangle.prototype.getData = function () {
        var _a = this.props, top = _a.top, right = _a.right, bottom = _a.bottom, left = _a.left;
        var height = right || left;
        var width = top || bottom;
        var deg, ziz;
        if ((right && bottom) || (left && top)) {
            deg = this.tan(width, height) + (left && top ? 90 : 0);
            ziz = { top: 0 };
        }
        if ((left && bottom) || (right && top)) {
            deg = this.tan(height, width) + 90 + (right && top ? 90 : 0);
            ziz = { bottom: 0 };
        }
        return { deg: deg, ziz: ziz, height: height, width: width };
    };
    Triangle.prototype.render = function () {
        var _a = this.props.color, color = _a === void 0 ? 'transparent' : _a;
        var _b = this.getData(), height = _b.height, width = _b.width, deg = _b.deg, ziz = _b.ziz;
        var diagonalLine = pythagorean(height, width);
        return (React.createElement("div", { className: css.mask, style: { height: height + "px", width: width + "px" } },
            React.createElement("div", { className: css.ziz, style: ziz },
                React.createElement("div", __assign({ className: css.triangle, style: {
                        transform: "rotate(" + deg + "deg)",
                        height: diagonalLine + "px",
                        width: diagonalLine + "px",
                        backgroundColor: color
                    } }, omit(this.props, ['top', 'bottom', 'left', 'right', 'color']))))));
    };
    return Triangle;
}(React.Component));
export { Triangle };
var pythagorean = function (a, b) { return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)); };
//# sourceMappingURL=Triangle.js.map