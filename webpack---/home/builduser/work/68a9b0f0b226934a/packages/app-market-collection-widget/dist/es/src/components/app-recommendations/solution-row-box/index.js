import * as React from 'react';
import * as style from './solution-row-box.scss';
import { AppIntro } from '../app-intro';
import { SolutionButtonAction } from '../solution-button-action';
import { Box } from 'wix-style-react';
import { ImpressionContext } from '../../common/visibilityDetector/impressionContext';
import { VisibilityDetector } from '../../common/visibilityDetector/visibilityDetector';
export var SolutionRowBox = React.memo(function (_a) {
    var solution = _a.solution, onAddClick = _a.onAddClick, onCategoryClick = _a.onCategoryClick, onSubCategoryClick = _a.onSubCategoryClick, onImpression = _a.onImpression, isBundleAppInstalled = _a.isBundleAppInstalled, isBundleAppNotInstalled = _a.isBundleAppNotInstalled, savedPrice = _a.savedPrice;
    var _b = React.useState(false), isImpression = _b[0], setIsImpression = _b[1];
    var handleOnImpression = function () {
        if (!isImpression) {
            onImpression(solution.slug);
            setIsImpression(true);
        }
    };
    return (React.createElement(ImpressionContext.Provider, { value: { onImpression: handleOnImpression } },
        React.createElement(ImpressionContext.Consumer, null, function (value) { return (React.createElement(VisibilityDetector, { onImpression: value.onImpression },
            React.createElement(Box, { align: "space-between", padding: "24px 30px", className: style.solutionBoxRow },
                React.createElement(AppIntro, { solution: solution, onCategoryClick: onCategoryClick, onSubCategoryClick: onSubCategoryClick }),
                React.createElement(SolutionButtonAction, { onAddClick: function (e) { return onAddClick(e, solution.slug); }, isBundleAppInstalled: isBundleAppInstalled, isBundleAppNotInstalled: isBundleAppNotInstalled, savedPrice: savedPrice })))); })));
});
//# sourceMappingURL=index.js.map