import * as React from 'react';
import { composer } from '../../../../../component-decorators/composer';
import { SolutionBadge } from '../../../../solution-badge/index';
import { Box } from 'wix-style-react';
import { SolutionReviewsInfo } from "../../solution-box-compact/solution-reviews-info";
export var SolutionBottomAction = composer()
    .withTranslation()
    .withExperiments()
    .compose(function (_a) {
    var t = _a.t, isInstalled = _a.isInstalled, pricing = _a.pricing, showPremiumLabel = _a.showPremiumLabel, reviews = _a.reviews, isBundleAppInstalled = _a.isBundleAppInstalled, isBundleAppNotInstalled = _a.isBundleAppNotInstalled, savedPrice = _a.savedPrice, hideRate = _a.hideRate;
    return (React.createElement(Box, { align: "space-between", verticalAlign: 'bottom' },
        React.createElement(Box, { marginRight: '6px' },
            React.createElement(SolutionBadge, { t: function (k, o) { return t(k, o); }, isInstalled: isInstalled, showPremiumLabel: showPremiumLabel, pricing: pricing, isBundleAppInstalled: isBundleAppInstalled, isBundleAppNotInstalled: isBundleAppNotInstalled, savedPrice: savedPrice })),
        !hideRate &&
            React.createElement(SolutionReviewsInfo, { reviews: reviews })));
});
//# sourceMappingURL=index.js.map