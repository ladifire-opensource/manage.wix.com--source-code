import * as React from 'react';
import { composer } from "../../../../component-decorators/composer";
import { ConditionalLinkRenderer } from "../solution-box";
import * as style from './solution-box-compact.scss';
import { SolutionTopSection } from './solution-top-section';
import { SolutionDetails } from './solution-details';
import { SolutionBottomAction } from './solution-bottom-action-bar';
import { sendSolutionImpressionBi, sendOpenSolutionPageBi, } from '../../../../bi/events';
import { getAppBadgeTheme, getAppBadgeTitle, getAppBadgeTooltipContent, } from '../../../common';
import { ImpressionContext } from '../../../common/visibilityDetector/impressionContext';
import { VisibilityDetector } from '../../../common/visibilityDetector/visibilityDetector';
import { getClientImageURL } from '../../../common/getClientImageURL';
import { Box } from 'wix-style-react';
export var SolutionBoxCompact = composer()
    .withExperiments()
    .compose(function (_a) {
    var solution = _a.solution, solutionBiData = _a.solutionBiData, onButtonClick = _a.onButtonClick, onBoxClick = _a.onBoxClick, isInstalled = _a.isInstalled, showPremiumLabel = _a.showPremiumLabel, experiments = _a.experiments, isBundleAppInstalled = _a.isBundleAppInstalled, isBundleAppNotInstalled = _a.isBundleAppNotInstalled, savedPrice = _a.savedPrice, isVoucherApp = _a.isVoucherApp, hideCTA = _a.hideCTA, layout = _a.layout, to = _a.to, as = _a.as, hideRate = _a.hideRate, hideTagsBadge = _a.hideTagsBadge;
    var icon = solution.icon, teaser = solution.teaser, numberOfReviews = solution.numberOfReviews, reviewStars = solution.reviewStars, name = solution.name, pricing = solution.pricing;
    // tslint:disable-next-line:react-hooks-nesting
    var _b = React.useState(false), isImpression = _b[0], setIsImpression = _b[1];
    var onImpression = function () {
        if (!isImpression) {
            sendSolutionImpressionBi(solutionBiData);
            setIsImpression(true);
        }
    };
    var badgeTitle = getAppBadgeTitle(isBundleAppInstalled, isBundleAppNotInstalled, solution.Tags, experiments, hideTagsBadge);
    var useNewGrid = experiments === null || experiments === void 0 ? void 0 : experiments.enabled('specs.marketplace.reducedSpacing');
    return (React.createElement(ImpressionContext.Provider, { value: { onImpression: onImpression } },
        React.createElement(ImpressionContext.Consumer, null, function (value) { return (React.createElement(VisibilityDetector, { onImpression: value.onImpression },
            React.createElement(Box, { className: hideRate ? style.solutionBoxNoRate : style.solutionBox, dataHook: "solution-box", paddingTop: useNewGrid ? '0' : '15px', paddingBottom: useNewGrid ? '0' : '15px' },
                React.createElement("div", { "data-appid": solution.id, onClick: function () {
                        sendOpenSolutionPageBi(solutionBiData);
                        onBoxClick(solution);
                    }, className: layout && layout !== 'marketplace'
                        ? style.solutionBoxWrapperIntegrationsLayout
                        : style.solutionBoxWrapperMarketplaceLayout },
                    React.createElement(ConditionalLinkRenderer, { to: to, as: as },
                        React.createElement(SolutionTopSection, { alt: name + " logo", solutionIcon: getClientImageURL(icon, {
                                toHeight: 42,
                                toWidth: 42,
                            }), badgeTitle: badgeTitle, badgeTheme: getAppBadgeTheme(badgeTitle), showTooltip: isBundleAppInstalled || isBundleAppNotInstalled, tooltipContent: getAppBadgeTooltipContent(isBundleAppInstalled, isBundleAppNotInstalled, isVoucherApp), solutionName: name }),
                        React.createElement(SolutionDetails, { teaser: teaser, name: name })),
                    React.createElement(Box, { height: '29px' }),
                    React.createElement(SolutionBottomAction, { isInstalled: isInstalled, showPremiumLabel: showPremiumLabel, pricing: pricing, reviews: { numberOfReviews: numberOfReviews, reviewStars: reviewStars }, isBundleAppInstalled: isBundleAppInstalled, isBundleAppNotInstalled: isBundleAppNotInstalled, savedPrice: savedPrice, isVoucherApp: isVoucherApp, hideRate: hideRate }))))); })));
});
//# sourceMappingURL=index.js.map