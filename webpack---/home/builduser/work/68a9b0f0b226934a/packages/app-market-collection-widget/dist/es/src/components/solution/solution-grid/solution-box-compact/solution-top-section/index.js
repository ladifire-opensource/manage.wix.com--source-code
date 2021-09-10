import { __assign } from "tslib";
import * as React from 'react';
import * as style from './solution-top-section.scss';
import { Badge, Box, Tooltip } from 'wix-style-react';
import { composer } from '../../../../../component-decorators/composer';
export var SolutionTopSection = composer()
    .withTranslation()
    .compose(function (props) { return (React.createElement(Box, { dataHook: "solution-top-section", className: style.topSection },
    React.createElement("img", { alt: props.alt || 'solution-icon', src: props.solutionIcon, className: style.appIcon }),
    props.showTooltip && props.tooltipContent ? (React.createElement(Tooltip, { placement: "top", content: props.t(props.tooltipContent, {
            appName: props.solutionName,
        }) },
        React.createElement(SolutionTopSectionBadgeBase, __assign({}, props, { badgeTitle: props.t(props.badgeTitle) })))) : (React.createElement(SolutionTopSectionBadgeBase, __assign({}, props, { badgeTitle: props.t(props.badgeTitle) }))))); });
export var SolutionTopSectionBadgeBase = function (_a) {
    var badgeTitle = _a.badgeTitle, badgeTheme = _a.badgeTheme;
    return (React.createElement(React.Fragment, null, badgeTitle && (React.createElement(Badge, __assign({ dataHook: "solution-badge" }, badgeTheme), badgeTitle))));
};
//      <Tooltip placement='top' content={props.t(props.tooltipContent, {appName: props.solutionName})}>
//# sourceMappingURL=index.js.map