import { composer } from '../../../component-decorators/composer';
import * as s from './promo-box-compact.scss';
import * as React from 'react';
import { sendOpenSolutionPageBi, } from '../../../bi/events';
import { Box, Card, Divider, Proportion, Text, Tooltip, } from 'wix-style-react';
import { ConditionalLinkRenderer } from '../../solution/solution-grid/solution-box';
import { getClientImageURL } from '../../common/getClientImageURL';
import { PricingPlanOrInstalledBadge } from '../../common/PricingPlanOrInstalledBadge';
import { SolutionTopSectionBadgeBase } from "../../solution/solution-grid/solution-box-compact/solution-top-section";
export var PromoBoxCompact = composer()
    .withExperiments()
    .withTranslation()
    .compose(function (_a) {
    var solution = _a.solution, solutionBiData = _a.solutionBiData, onPromoClickHandler = _a.onPromoClickHandler, onBoxClick = _a.onBoxClick, as = _a.as, tooltipContent = _a.tooltipContent, badgeTitle = _a.badgeTitle, badgeTheme = _a.badgeTheme, showTooltip = _a.showTooltip, isMobile = _a.isMobile, t = _a.t;
    return (React.createElement("div", { "data-testid": "promo-box", className: s.promoBox, onClick: function (e) {
            onBoxClick(solution);
            sendOpenSolutionPageBi(solutionBiData);
        } },
        React.createElement(Card, { dataHook: "promo-box-card", className: s.promoBoxCard },
            React.createElement(ConditionalLinkRenderer, { as: as, to: solution.to },
                showTooltip &&
                    React.createElement(Box, { width: '100%', position: 'absolute', zIndex: 1, top: '12px', paddingRight: '12px', boxSizing: 'border-box', display: 'flex', align: 'right' },
                        React.createElement(Box, null,
                            React.createElement(Tooltip, { placement: "top", content: t(tooltipContent, {
                                    appName: solution.name,
                                }) },
                                React.createElement(SolutionTopSectionBadgeBase, { badgeTheme: badgeTheme, badgeTitle: t(badgeTitle) })))),
                React.createElement("div", { className: s.imagesStack },
                    React.createElement("div", { className: s.bottomImage },
                        React.createElement(Proportion, { aspectRatio: "1.5" },
                            React.createElement("img", { alt: solution.name + " poster", src: solution.poster, className: s.poster }))),
                    React.createElement("div", { className: s.topImage },
                        React.createElement(Box, { position: 'absolute', bottom: isMobile ? '-15px' : '-21px', left: isMobile ? '15px' : '27px', width: '42', height: '42', borderRadius: '6px', background: '#ffffff', className: s.iconOutline },
                            React.createElement("img", { alt: solution.name + " icon", src: getClientImageURL(solution.icon, {
                                    toHeight: 36,
                                    toWidth: 36,
                                }), className: s.icon })))),
                React.createElement(Divider, null)),
            React.createElement(Box, { className: s.solutionDetails, direction: "vertical", verticalAlign: "space-between", dataHook: "solution-details-box", paddingRight: isMobile ? '12px' : '24px', paddingLeft: isMobile ? '18px' : '24px', paddingBottom: '18px', paddingTop: isMobile ? '12px' : '18px' },
                React.createElement(Box, { direction: "vertical", paddingTop: '6px', height: '84px' },
                    React.createElement(Text, { weight: "bold", dataHook: "solution-name" }, solution.name),
                    React.createElement(Text, { size: "small", weight: "thin", className: s.solutionDescription }, solution.description)),
                React.createElement(Box, { className: s.actionBar, verticalAlign: "middle" },
                    React.createElement(PricingPlanOrInstalledBadge, { isInstalled: solution.isInstalled, pricing: solution.pricing, showPremiumLabel: solution.showPremiumLabel, isBundleAppInstalled: solution.isBundleAppInstalled, isBundleAppNotInstalled: solution.isBundleAppNotInstalled, savedPrice: solution.savedPrice }))))));
});
//# sourceMappingURL=promo-box-compact.js.map