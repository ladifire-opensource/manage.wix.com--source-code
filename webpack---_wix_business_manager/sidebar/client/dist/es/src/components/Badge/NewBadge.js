import { __assign, __extends } from "tslib";
import * as React from 'react';
import { withTranslation } from '@wix/wix-i18n-config';
import { Badge } from 'wix-style-react';
import { log, BIEvent, BISource } from '../../services/biLogger';
import { connect } from 'react-redux';
import { selectNode } from '../../selectors/select-node';
import styles from './Badge.scss';
var NewBadge = /** @class */ (function (_super) {
    __extends(NewBadge, _super);
    function NewBadge() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.reportNewBadgeShownBI = function () {
            var _a = _this.props, biParams = _a.biParams, sidebarItem = _a.sidebarItem;
            log(__assign(__assign({}, biParams), { src: BISource.myAccount, evid: BIEvent.NEW_BADGE_SHOWN, name: sidebarItem && sidebarItem.biName, sidebar_name: sidebarItem && sidebarItem.id }));
        };
        return _this;
    }
    NewBadge.prototype.componentDidMount = function () {
        this.reportNewBadgeShownBI();
    };
    NewBadge.prototype.render = function () {
        return (
        //TODO: remove this div when merging specs.wos2.newBadgeOnVirtualNumbers
        React.createElement("div", { className: styles.newBadge },
            React.createElement(Badge, { dataHook: "new-badge", size: "small", skin: "warning", type: "solid", uppercase: true }, this.props.t('sidebar.newBadge.new'))));
    };
    return NewBadge;
}(React.Component));
var mapStateToProps = function (state, ownProps) {
    return ({
        sidebarItem: selectNode(state, ownProps.itemId),
        biParams: state.biParams
    });
};
export var NewBadgeComponent = withTranslation()(connect(mapStateToProps)(NewBadge));
//# sourceMappingURL=NewBadge.js.map