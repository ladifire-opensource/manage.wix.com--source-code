import { __assign } from "tslib";
import { REMOVE_BADGE, ADD_BADGE } from '../actions/types';
import { BadgeType } from '@wix/business-manager-api';
import { combineReducers } from 'redux';
import { omit } from 'lodash';
var notificationBadgeReducer = function (state, action) {
    if (state === void 0) { state = {}; }
    if (action.type === ADD_BADGE && action.badge.type === BadgeType.NOTIFICATION) {
        return action.badge;
    }
    if (action.type === REMOVE_BADGE && action.badgeType === BadgeType.NOTIFICATION) {
        return null;
    }
    return state;
};
var badgeByItemIdReducer = function (state, action) {
    var _a;
    if (state === void 0) { state = {}; }
    if (action.type === ADD_BADGE && action.badge.type !== BadgeType.NOTIFICATION) {
        return __assign(__assign({}, state), (_a = {}, _a[action.badge.itemId] = action.badge, _a));
    }
    if (action.type === REMOVE_BADGE && action.badgeType !== BadgeType.NOTIFICATION) {
        return omit(state, action.itemId);
    }
    return state;
};
export var badgesReducer = combineReducers({
    notificationBadge: notificationBadgeReducer,
    badgeByItemId: badgeByItemIdReducer
});
//# sourceMappingURL=badges-reducer.js.map