import * as React from 'react';
import { composer } from '../../../component-decorators/composer';
import { SolutionBadge } from '../../solution-badge/index';
export var PricingPlanOrInstalledBadge = composer()
    .withTranslation()
    .compose(function (_a) {
    var isInstalled = _a.isInstalled, pricing = _a.pricing, t = _a.t, showPremiumLabel = _a.showPremiumLabel, isBundleAppInstalled = _a.isBundleAppInstalled, isBundleAppNotInstalled = _a.isBundleAppNotInstalled, savedPrice = _a.savedPrice;
    return (React.createElement(SolutionBadge, { t: function (k, o) { return t(k, o); }, isInstalled: isInstalled, showPremiumLabel: showPremiumLabel, pricing: pricing, isBundleAppInstalled: isBundleAppInstalled, isBundleAppNotInstalled: isBundleAppNotInstalled, savedPrice: savedPrice }));
});
//# sourceMappingURL=index.js.map