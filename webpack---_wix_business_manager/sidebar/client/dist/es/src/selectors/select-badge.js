import { __assign } from "tslib";
import { selectNode } from './select-node';
import { BadgeType } from '@wix/business-manager-api';
export var getBadgeByItemId = function (state, itemId) {
    var _a = state.badges, notificationBadge = _a.notificationBadge, badgeByItemId = _a.badgeByItemId;
    if (notificationBadge && notificationBadge.itemId === itemId) {
        return notificationBadge;
    }
    else if (badgeByItemId[itemId]) {
        return badgeByItemId[itemId];
    }
    else if (hasAChildWithNotificationBadge(state, itemId)) {
        return __assign(__assign({}, notificationBadge), { itemId: itemId });
    }
    var childCountersSum = getSumOfChildCounters(state, itemId);
    if (childCountersSum !== 0) {
        return { itemId: itemId, type: BadgeType.COUNT, count: childCountersSum };
    }
};
var hasAChildWithNotificationBadge = function (state, id) {
    if (!state.badges.notificationBadge) {
        return false;
    }
    if (state.badges.notificationBadge.itemId === id) {
        return true;
    }
    else {
        var node = selectNode(state, id);
        var subItemIds = (node && node.subItemIds) || [];
        return subItemIds.some(function (childId) { return hasAChildWithNotificationBadge(state, childId); });
    }
};
export var getSumOfChildCounters = function (state, itemId) {
    if (state.badges.badgeByItemId[itemId] && state.badges.badgeByItemId[itemId].type === BadgeType.COUNT) {
        return state.badges.badgeByItemId[itemId].count;
    }
    else {
        var node = selectNode(state, itemId);
        var subItemIds = (node && node.subItemIds) || [];
        return subItemIds.reduce(function (sum, subItem) { return sum + getSumOfChildCounters(state, subItem); }, 0);
    }
};
//# sourceMappingURL=select-badge.js.map