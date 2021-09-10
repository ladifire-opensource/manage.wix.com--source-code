import { CounterBadge } from 'wix-style-react';
import * as React from 'react';
import { connect } from 'react-redux';
import { CountBadgeSkin, } from '@wix/business-manager-api';
import { getIsInExpertsDashboard } from '../../selectors/select-is-in-experts-dashboard';
export var CountBadge = function (_a) {
    var badge = _a.badge, changeSkinAllowed = _a.changeSkinAllowed;
    var count = badge.count, skin = badge.skin;
    var displaySkin = changeSkinAllowed && skin === CountBadgeSkin.SUCCESS
        ? 'success'
        : 'general';
    return (React.createElement(CounterBadge, { skin: displaySkin, dataHook: "count-badge" }, count));
};
var mapStateToProps = function (state, badge) {
    return ({
        badge: badge,
        changeSkinAllowed: getIsInExpertsDashboard(state),
    });
};
export var WrappedCountBadge = connect(mapStateToProps)(CountBadge);
//# sourceMappingURL=CountBadge.js.map