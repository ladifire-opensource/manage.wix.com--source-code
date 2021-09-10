import { REMOVE_BADGE, ADD_BADGE } from './types';
import { BadgeType } from '@wix/business-manager-api';
import { getBadgeByItemId } from '../selectors/select-badge';
import { selectAllNodes } from '../selectors/select-node';
export var calculateEntriesBadges = function () { return function (dispatch, getState) {
    selectAllNodes(getState()).forEach(function (node) {
        if (node.showNewBadge && !getBadgeByItemId(getState(), node.id)) {
            dispatch(setBadge({ type: BadgeType.NEW, itemId: node.id }));
        }
    });
}; };
export var setBadge = function (badge) {
    return ({
        type: ADD_BADGE,
        badge: badge
    });
};
export var removeBadge = function (itemId, badgeType) {
    return ({
        type: REMOVE_BADGE,
        itemId: itemId,
        badgeType: badgeType
    });
};
//# sourceMappingURL=badges.js.map