import { composer } from '../../../component-decorators/composer';
import s from '../style.scss';
import * as React from 'react';
import { sendOpenSolutionPageBi, } from '../../../bi/events';
import { Box, Card, Divider, Proportion, Text, } from 'wix-style-react';
import { ConditionalLinkRenderer } from '../../solution/solution-grid/solution-box';
import { getClientImageURL } from '../../common/getClientImageURL';
import { PricingPlanOrInstalledBadge } from '../../common/PricingPlanOrInstalledBadge';
export var PromoBox = composer()
    .withExperiments()
    .compose(function (_a) {
    var solution = _a.solution, solutionBiData = _a.solutionBiData, onPromoClickHandler = _a.onPromoClickHandler, onBoxClick = _a.onBoxClick, as = _a.as, experiments = _a.experiments, permissions = _a.permissions, withPermissions = _a.withPermissions, hideCTA = _a.hideCTA;
    return (React.createElement("div", { "data-testid": "promo-box", className: s.outline, onClick: function (e) {
            onBoxClick(solution);
            sendOpenSolutionPageBi(solutionBiData);
        } },
        React.createElement(Card, { dataHook: "promo-box-card", className: s.card },
            React.createElement(ConditionalLinkRenderer, { as: as, to: solution.to },
                React.createElement("div", { className: s.imagesStack },
                    React.createElement("div", { className: s.bottomImage },
                        React.createElement(Proportion, { aspectRatio: "1.5" },
                            React.createElement("img", { alt: solution.name + " poster", src: solution.poster, className: s.poster }))),
                    React.createElement("div", { className: s.topImage },
                        React.createElement("div", { className: s.iconOutline },
                            React.createElement("img", { alt: solution.name + " icon", src: getClientImageURL(solution.icon, {
                                    toHeight: 42,
                                    toWidth: 42,
                                }), className: s.icon })))),
                React.createElement(Divider, null)),
            React.createElement(Box, { className: s.solutionDetails, direction: "vertical", verticalAlign: "space-between", height: "128px", dataHook: "solution-details-box" },
                React.createElement(Box, { direction: "vertical" },
                    React.createElement(Text, { weight: "bold", className: s.madeforSolutionTitle, dataHook: "solution-name" }, solution.name),
                    React.createElement(Text, { size: "small", weight: "normal", className: s.solutionDescription }, solution.description)),
                React.createElement(Box, { className: s.actionBar, verticalAlign: "middle" },
                    React.createElement(PricingPlanOrInstalledBadge, { isInstalled: solution.isInstalled, pricing: solution.pricing, showPremiumLabel: solution.showPremiumLabel, isBundleAppInstalled: solution.isBundleAppInstalled, isBundleAppNotInstalled: solution.isBundleAppNotInstalled, savedPrice: solution.savedPrice }))))));
});
//# sourceMappingURL=promo-box.js.map