import { __assign, __decorate, __extends } from "tslib";
import * as React from 'react';
import * as style from './solution-box.scss';
import { SolutionTopSection } from './solution-top-section';
import { SolutionDetails } from './solution-details';
import { SolutionBottomAction } from './solution-bottom-action-bar';
import { sendSolutionImpressionBi, sendOpenSolutionPageBi, sendAddClick, sendOpenClick, } from '../../../../bi/events';
import { getAppBadgeTheme, getAppBadgeTitle, getAppBadgeTooltipContent, } from '../../../common';
import { ImpressionContext } from '../../../common/visibilityDetector/impressionContext';
import { VisibilityDetector } from '../../../common/visibilityDetector/visibilityDetector';
import { getClientImageURL } from '../../../common/getClientImageURL';
import { Box } from 'wix-style-react';
import { withExperiments } from '../../../../component-decorators/with-experiments';
var SolutionBox = /** @class */ (function (_super) {
    __extends(SolutionBox, _super);
    function SolutionBox(props) {
        var _this = _super.call(this, props) || this;
        _this.getLinkProps = function () {
            var _a = _this.props, to = _a.to, as = _a.as;
            return {
                to: to,
                as: as,
            };
        };
        _this.onImpression = function () {
            if (!_this.state.isImpression) {
                sendSolutionImpressionBi(_this.props.solutionBiData);
                _this.setState({ isImpression: true });
            }
        };
        _this.state = { isImpression: false };
        return _this;
    }
    SolutionBox.prototype.componentDidMount = function () {
        if (this.props.onBoxRender) {
            this.props.onBoxRender();
        }
    };
    SolutionBox.prototype.render = function () {
        var _this = this;
        var _a = this.props, solution = _a.solution, solutionBiData = _a.solutionBiData, onButtonClick = _a.onButtonClick, onBoxClick = _a.onBoxClick, isInstalled = _a.isInstalled, showPremiumLabel = _a.showPremiumLabel, as = _a.as, isCompany = _a.isCompany, experiments = _a.experiments, isBundleAppInstalled = _a.isBundleAppInstalled, isBundleAppNotInstalled = _a.isBundleAppNotInstalled, savedPrice = _a.savedPrice, isVoucherApp = _a.isVoucherApp, hideCTA = _a.hideCTA, hideTagsBadge = _a.hideTagsBadge;
        var icon = solution.icon, teaser = solution.teaser, numberOfReviews = solution.numberOfReviews, reviewStars = solution.reviewStars, name = solution.name, company = solution.company, pricing = solution.pricing, Tags = solution.Tags;
        var areReviews = true;
        if (experiments &&
            experiments.enabled('specs.marketplace.solutionBox.removeReviewRating')) {
            areReviews = false;
        }
        var badgeTitle = getAppBadgeTitle(isBundleAppInstalled, isBundleAppNotInstalled, Tags, experiments, hideTagsBadge);
        return (React.createElement(ImpressionContext.Provider, { value: { onImpression: this.onImpression } },
            React.createElement(ImpressionContext.Consumer, null, function (value) { return (React.createElement(VisibilityDetector, { onImpression: value.onImpression },
                React.createElement(Box, { className: style.solutionBox, dataHook: "solution-box", height: isCompany && areReviews
                        ? '291px'
                        : isCompany
                            ? '267px'
                            : '276px', marginTop: "15px", marginBottom: "15px" },
                    React.createElement("div", { "data-appid": solution.id, onClick: function () {
                            sendOpenSolutionPageBi(solutionBiData);
                            onBoxClick(solution);
                        }, className: _this.props.layout && _this.props.layout !== 'marketplace'
                            ? style.solutionBoxWrapperIntegrationsLayout
                            : style.solutionBoxWrapperMarketplaceLayout },
                        React.createElement(ConditionalLinkRenderer, __assign({}, _this.getLinkProps()),
                            React.createElement(SolutionTopSection, { alt: name + " logo", solutionIcon: getClientImageURL(icon), badgeTitle: badgeTitle, badgeTheme: getAppBadgeTheme(badgeTitle), showTooltip: isBundleAppInstalled || isBundleAppNotInstalled, tooltipContent: getAppBadgeTooltipContent(isBundleAppInstalled, isBundleAppNotInstalled, isVoucherApp), solutionName: name }),
                            React.createElement(SolutionDetails, { teaser: teaser, name: name, isCompany: isCompany, company: company.name, reviews: { numberOfReviews: numberOfReviews, reviewStars: reviewStars }, layout: _this.props.layout })),
                        React.createElement(Box, { height: isCompany ? '24px' : '25px' }),
                        React.createElement(SolutionBottomAction, { isInstalled: isInstalled, showPremiumLabel: showPremiumLabel, pricing: pricing, reviews: areReviews ? { numberOfReviews: numberOfReviews, reviewStars: reviewStars } : null, onButtonClick: function () {
                                isInstalled
                                    ? sendOpenClick(solutionBiData)
                                    : sendAddClick(solutionBiData);
                                onButtonClick(solution);
                            }, isBundleAppInstalled: isBundleAppInstalled, isBundleAppNotInstalled: isBundleAppNotInstalled, savedPrice: savedPrice, isVoucherApp: isVoucherApp, hideCTA: hideCTA }))))); })));
    };
    SolutionBox = __decorate([
        withExperiments
    ], SolutionBox);
    return SolutionBox;
}(React.Component));
export { SolutionBox };
var FakeLink = function (_a) {
    var to = _a.to, className = _a.className, children = _a.children;
    return (React.createElement("a", { href: to, className: className, onClick: function (e) { return e.preventDefault(); } }, children));
};
export var ConditionalLinkRenderer = function (_a) {
    var as = _a.as, to = _a.to, className = _a.className, children = _a.children;
    if (as === 'link') {
        if (to === undefined) {
            console.warn("trying to render component as 'link' without passing 'to' prop");
        }
        return (React.createElement(FakeLink, { to: to, className: style.boxLink + " " + className }, children));
    }
    return children;
};
//# sourceMappingURL=index.js.map