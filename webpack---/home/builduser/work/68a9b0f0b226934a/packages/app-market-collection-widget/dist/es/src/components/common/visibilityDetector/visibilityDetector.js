import { __extends } from "tslib";
import * as React from 'react';
var VisibilityDetector = /** @class */ (function (_super) {
    __extends(VisibilityDetector, _super);
    function VisibilityDetector() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ref = React.createRef();
        return _this;
    }
    VisibilityDetector.prototype.componentDidMount = function () {
        var _this = this;
        this.observer = new IntersectionObserver(function (_a) {
            var entry = _a[0];
            if (entry.intersectionRatio > 0) {
                _this.props.onImpression();
            }
        }, {
            root: null,
            rootMargin: '0px',
            threshold: [0.0],
        });
        if (this.ref.current) {
            this.observer.observe(this.ref.current);
        }
    };
    VisibilityDetector.prototype.componentWillUnmount = function () {
        this.observer && this.observer.disconnect();
        this.observer = undefined;
    };
    VisibilityDetector.prototype.render = function () {
        return React.createElement("div", { ref: this.ref }, this.props.children);
    };
    return VisibilityDetector;
}(React.PureComponent));
export { VisibilityDetector };
//# sourceMappingURL=visibilityDetector.js.map