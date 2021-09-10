import * as React from 'react';
import styles from './Badge.scss';
import { getRequiredBadge } from './Badges';
import { withTooltip } from './tooltip/TooltipWrapper';
export var BadgeWrapper = function (props) {
    var badge = props.badge, itemId = props.itemId, biParams = props.biParams, showTooltip = props.showTooltip;
    var requiredBadge = getRequiredBadge(badge);
    if (!requiredBadge) {
        return null;
    }
    var RequiredBadge = function () { return requiredBadge; };
    var BadgeComponent = showTooltip ? function () { return withTooltip(RequiredBadge, badge.tooltip, biParams); } : RequiredBadge;
    return (React.createElement("div", { className: styles.badgeWrapper, "data-hook": "badge-" + itemId },
        React.createElement("div", { className: styles.badge },
            React.createElement(BadgeComponent, null))));
};
//# sourceMappingURL=BadgeWrapper.js.map