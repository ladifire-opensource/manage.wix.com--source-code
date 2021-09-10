import { __extends } from "tslib";
import * as React from 'react';
var styles = require('./Clock.scss');
var Clock = /** @class */ (function (_super) {
    __extends(Clock, _super);
    function Clock(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            time: _this.getTimeString(props.locale, _this.props.timezone)
        };
        return _this;
    }
    Clock.prototype.UNSAFE_componentWillReceiveProps = function (nextProps) {
        if (nextProps.timezone !== this.props.timezone) {
            this.updateTime(nextProps.locale, nextProps.timezone);
        }
    };
    Clock.prototype.componentDidMount = function () {
        this.updateClock();
    };
    Clock.prototype.componentWillUnmount = function () {
        clearInterval(this.clockInterval);
    };
    Clock.prototype.updateClock = function () {
        var _this = this;
        this.clockInterval = setInterval(function () {
            _this.updateTime(_this.props.locale, _this.props.timezone);
        }, 1000);
    };
    Clock.prototype.updateTime = function (locale, timezone) {
        this.setState({
            time: this.getTimeString(locale, timezone)
        });
    };
    Clock.prototype.getTimeString = function (locale, timezone) {
        try {
            var normalizedLocale = locale.replace('_', '-');
            return this.props.getTime().toLocaleTimeString(normalizedLocale, {
                timeZone: timezone,
                hour: '2-digit',
                minute: '2-digit'
            });
        }
        catch (err) { //partial browser support
            return '';
        }
    };
    Clock.prototype.render = function () {
        return (React.createElement("span", { "data-hook": "clock", className: styles.wrapper }, this.state.time));
    };
    return Clock;
}(React.PureComponent));
export { Clock };
//# sourceMappingURL=Clock.js.map