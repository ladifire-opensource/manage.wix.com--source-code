import * as React from 'react';
import { composer } from '../../../../../component-decorators/composer';
import { SolutionBadge } from '../../../../solution-badge/index';
import { Box } from 'wix-style-react';
export var SolutionBottomAction = composer()
    .withTranslation()
    .withExperiments()
    .compose(function (_a) {
    var t = _a.t, isInstalled = _a.isInstalled, onButtonClick = _a.onButtonClick, pricing = _a.pricing, showPremiumLabel = _a.showPremiumLabel, reviews = _a.reviews, isBundleAppInstalled = _a.isBundleAppInstalled, isBundleAppNotInstalled = _a.isBundleAppNotInstalled, savedPrice = _a.savedPrice, isVoucherApp = _a.isVoucherApp, hideCTA = _a.hideCTA, experiments = _a.experiments;
    var getLeftSideView = function () { return (React.createElement(SolutionBadge, { t: function (k, o) { return t(k, o); }, isInstalled: isInstalled, showPremiumLabel: showPremiumLabel, pricing: pricing, isBundleAppInstalled: isBundleAppInstalled, isBundleAppNotInstalled: isBundleAppNotInstalled, savedPrice: savedPrice })); };
    var handleCtaClick = function (e) {
        e.stopPropagation();
        onButtonClick();
    };
    return (React.createElement(Box, { align: "space-between", verticalAlign: 'middle' }, getLeftSideView()));
});
//# sourceMappingURL=index.js.map