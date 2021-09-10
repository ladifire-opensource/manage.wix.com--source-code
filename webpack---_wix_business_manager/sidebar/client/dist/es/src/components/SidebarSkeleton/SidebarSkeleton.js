import * as React from 'react';
import css from './SidebarSkeleton.scss';
import classNames from 'classnames';
import { Skeleton } from 'wix-style-react';
var SidebarSkeletonItem = function (_a) {
    var _b;
    var _c = _a.isLong, isLong = _c === void 0 ? false : _c;
    return React.createElement("div", { className: classNames(css.skeletonItem, (_b = {}, _b[css.long] = isLong, _b)) });
};
export var SidebarSkeleton = function (_a) {
    var isLight = _a.isLight;
    return (isLight ? React.createElement("div", { className: css.lightSkeleton },
        React.createElement(Skeleton, { spacing: "small", content: [
                { type: 'line', size: 'medium' },
                { type: 'line', size: 'large' },
            ] }),
        React.createElement(Skeleton, { spacing: "small", content: [
                { type: 'line', size: 'large' },
                { type: 'line', size: 'medium' },
                { type: 'line', size: 'large' },
                { type: 'line', size: 'medium' },
            ] })) :
        React.createElement("div", { className: css.container },
            React.createElement(SidebarSkeletonItem, null),
            React.createElement(SidebarSkeletonItem, { isLong: true }),
            React.createElement(SidebarSkeletonItem, { isLong: true }),
            React.createElement("div", { className: css.separator }),
            React.createElement(SidebarSkeletonItem, null),
            React.createElement(SidebarSkeletonItem, { isLong: true }),
            React.createElement(SidebarSkeletonItem, null)));
};
//# sourceMappingURL=SidebarSkeleton.js.map