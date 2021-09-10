import { __assign, __rest } from "tslib";
import * as React from 'react';
import styles from './Badge.scss';
import { connect } from 'react-redux';
import { getBadgeByItemId } from '../../selectors/select-badge';
import { BadgeWrapper } from './BadgeWrapper';
import { isNewBadge } from './Badges';
import { selectNode } from '../../selectors/select-node';
import { isCategory } from '../../selectors/select-item-type';
export var connectedWithBadge = function (Component) { return function (props) {
    var badge = props.badge, itemId = props.itemId, biParams = props.biParams, showTooltip = props.showTooltip, componentProps = __rest(props, ["badge", "itemId", "biParams", "showTooltip"]);
    if (!badge) {
        return React.createElement(Component, __assign({}, componentProps));
    }
    if (isNewBadge(badge)) {
        return React.createElement(Component, __assign({}, componentProps, { showNewBadge: true }));
    }
    return (React.createElement("div", { "data-hook": "item-with-badge", className: styles.itemWithBadgeWrapper },
        React.createElement(Component, __assign({}, componentProps)),
        React.createElement(BadgeWrapper, { badge: badge, itemId: itemId, biParams: biParams, showTooltip: showTooltip })));
}; };
var mapStateToProps = function (state, itemId) {
    var node = selectNode(state, itemId);
    var showTooltip = !isCategory(node);
    return ({
        badge: getBadgeByItemId(state, itemId),
        itemId: itemId,
        biParams: state.biParams,
        showTooltip: showTooltip
    });
};
export var withBadge = function (itemId) { return function (comp) {
    return connect(function (state) { return mapStateToProps(state, itemId); })(connectedWithBadge(comp));
}; };
//# sourceMappingURL=withBadge.js.map