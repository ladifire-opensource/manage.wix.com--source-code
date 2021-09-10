import { __assign } from "tslib";
import * as React from 'react';
import { TranslationsProvider } from '../../i18next';
import s from './style.scss';
import { sendSolutionImpressionBi } from '../../bi/events';
import { VisibilityDetector } from '../common/visibilityDetector/visibilityDetector';
import { composer } from '../../component-decorators/composer';
import { ImpressionContext } from '../common/visibilityDetector/impressionContext';
// tslint:disable-next-line:no-duplicate-imports
import { useCallback, useState, useEffect } from 'react';
import { PromoBox } from './promo-box';
import { Cell, FontUpgrade, Layout, Carousel, Box } from 'wix-style-react';
import { PromoBoxCompact } from "./promo-box-compact";
import { getAppBadgeTheme, getAppBadgeTitle, getAppBadgeTooltipContent } from "../common";
import { useMediaQuery } from 'react-responsive';
var PromoWidgetBase = composer()
    .withExperiments()
    .compose(function (_a) {
    var solution = _a.solution, solutionsBiData = _a.solutionsBiData, locale = _a.locale, onPromoClickHandler = _a.onPromoClickHandler, onBoxClick = _a.onBoxClick, as = _a.as, i18n = _a.i18n, permissions = _a.permissions, withPermissions = _a.withPermissions, hideCTA = _a.hideCTA, isMobile = _a.isMobile, index = _a.index, experiments = _a.experiments, hideTagsBadge = _a.hideTagsBadge;
    var badgeTitle = getAppBadgeTitle(solution.isBundleAppInstalled, solution.isBundleAppNotInstalled, solution.Tags, experiments, hideTagsBadge);
    return (React.createElement(PromoBoxCompact, { key: index, solution: solution, solutionBiData: solutionsBiData && solutionsBiData[index], onPromoClickHandler: onPromoClickHandler, onBoxClick: onBoxClick, as: as, permissions: permissions, withPermissions: withPermissions, hideCTA: hideCTA, badgeTitle: badgeTitle, badgeTheme: getAppBadgeTheme(badgeTitle), showTooltip: solution.isBundleAppInstalled || solution.isBundleAppNotInstalled, tooltipContent: getAppBadgeTooltipContent(solution.isBundleAppInstalled, solution.isBundleAppNotInstalled, solution.isVoucherApp), isMobile: isMobile }));
});
export var PromoWidget = composer()
    .withExperiments()
    .compose(function (props) {
    // tslint:disable-next-line: react-hooks-nesting
    var isInMobile = useMediaQuery({ query: '(max-width: 600px)' });
    // tslint:disable-next-line: react-hooks-nesting
    var bigScreen = useMediaQuery({ query: '(min-width: 1484px)' });
    // tslint:disable-next-line:react-hooks-nesting
    var _a = useState(false), isImpression = _a[0], setIsImpression = _a[1];
    // tslint:disable-next-line:react-hooks-nesting
    var _b = useState(true), isBigScreen = _b[0], setIsBigScreen = _b[1];
    // tslint:disable-next-line:react-hooks-nesting
    var onImpression = useCallback(function () {
        !isImpression &&
            props.solutionsBiData.map(function (solutionBiData) {
                sendSolutionImpressionBi(solutionBiData);
                setIsImpression(true);
            });
    }, [setIsImpression, isImpression]);
    // tslint:disable-next-line:react-hooks-nesting
    useEffect(function () {
        setIsBigScreen(bigScreen);
    }, [bigScreen]);
    return (isInMobile ?
        React.createElement("div", { "data-testid": "promo-widget" },
            React.createElement(TranslationsProvider, { i18n: props.i18n, locale: props.locale },
                React.createElement(ImpressionContext.Provider, { value: { onImpression: onImpression } },
                    React.createElement(ImpressionContext.Consumer, null, function (value) { return (React.createElement(VisibilityDetector, { onImpression: value.onImpression },
                        React.createElement(Carousel, { variableWidth: true, dots: false, controlsPosition: 'none', infinite: true }, props.solutions
                            .slice(0, 4)
                            .map(function (solution, index) {
                            return (React.createElement(Box, { width: '222px', marginRight: '12px', key: index },
                                React.createElement(PromoWidgetBase, __assign({}, __assign(__assign({}, props), { isMobile: true, index: index, solution: solution })))));
                        })))); })))) :
        props.useNewBox ? React.createElement(FontUpgrade, null,
            React.createElement("div", { "data-testid": "promo-widget" },
                React.createElement(TranslationsProvider, { i18n: props.i18n, locale: props.locale },
                    React.createElement(ImpressionContext.Provider, { value: { onImpression: onImpression } },
                        React.createElement(ImpressionContext.Consumer, null, function (value) { return (React.createElement(VisibilityDetector, { onImpression: value.onImpression },
                            React.createElement(Layout, { gap: '24px', cols: 12 }, props.solutions
                                .slice(0, isBigScreen ? 4 : 3)
                                .map(function (solution, index) {
                                return (React.createElement(Cell, { span: isBigScreen ? 3 : 4, rows: 1, key: solution.id },
                                    React.createElement(PromoWidgetBase, __assign({}, __assign(__assign({}, props), { isMobile: false, index: index, solution: solution })))));
                            })))); }))))) :
            React.createElement(FontUpgrade, null,
                React.createElement("div", { "data-testid": "promo-widget" },
                    React.createElement(TranslationsProvider, { i18n: props.i18n, locale: props.locale },
                        React.createElement(ImpressionContext.Provider, { value: { onImpression: onImpression } },
                            React.createElement(ImpressionContext.Consumer, null, function (value) { return (React.createElement(VisibilityDetector, { onImpression: value.onImpression },
                                React.createElement("div", { className: s.promoGrid }, props.solutions
                                    .slice(0, 4)
                                    .map(function (solution, index) {
                                    return (React.createElement(PromoBox, { key: index, solution: solution, solutionBiData: props.solutionsBiData && props.solutionsBiData[index], onPromoClickHandler: props.onPromoClickHandler, onBoxClick: props.onBoxClick, as: props.as, permissions: props.permissions, withPermissions: props.withPermissions, hideCTA: props.hideCTA }));
                                })))); }))))));
});
//# sourceMappingURL=promo-widget.js.map