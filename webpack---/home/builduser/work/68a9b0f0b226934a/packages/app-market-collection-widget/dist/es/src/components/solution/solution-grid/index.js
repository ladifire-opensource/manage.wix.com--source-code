import React, { useEffect, useState } from 'react';
import * as style from './solution-grid.scss';
import { SolutionBox } from './solution-box';
import { SolutionGridLayout, } from '@wix/marketplace-interfaces';
import { TranslationsProvider } from '../../../i18next';
import { composer } from '../../../component-decorators/composer';
import { FontUpgrade, Layout, Cell } from 'wix-style-react';
import { PermissionsCtx } from '../permissions-ctx';
import { SolutionBoxCompact } from "./solution-box-compact";
import { useMediaQuery } from 'react-responsive';
export var SolutionGrid = composer()
    .withExperiments()
    .compose(function (_a) {
    var solutions = _a.solutions, solutionsBiData = _a.solutionsBiData, isCompany = _a.isCompany, layout = _a.layout, locale = _a.locale, onBoxClick = _a.onBoxClick, onButtonClick = _a.onButtonClick, onBoxRender = _a.onBoxRender, as = _a.as, i18n = _a.i18n, withPermissions = _a.withPermissions, permissions = _a.permissions, hideCTA = _a.hideCTA, numberOfLines = _a.numberOfLines, useNewBox = _a.useNewBox, hideRate = _a.hideRate, experiments = _a.experiments, hideTagsBadge = _a.hideTagsBadge;
    var useNewGrid = experiments === null || experiments === void 0 ? void 0 : experiments.enabled('specs.marketplace.reducedSpacing');
    var rowHeight = useNewGrid ? 240 : useNewBox ? 246 : 306;
    var widgetHeight = rowHeight * numberOfLines;
    // tslint:disable-next-line: react-hooks-nesting
    var bigScreen = useMediaQuery({ query: '(min-width: 1484px)' });
    // tslint:disable-next-line: react-hooks-nesting
    var inMobile = useMediaQuery({ query: '(max-width: 600px)' });
    // tslint:disable-next-line:react-hooks-nesting
    var _b = useState(true), isBigScreen = _b[0], setIsBigScreen = _b[1];
    // tslint:disable-next-line:react-hooks-nesting
    var _c = useState(false), isInMobile = _c[0], setIsInMobile = _c[1];
    // tslint:disable-next-line:react-hooks-nesting
    var _d = useState(false), shouldSetHeight = _d[0], setShouldSetHeight = _d[1];
    // tslint:disable-next-line:react-hooks-nesting
    var _e = useState(true), isLoading = _e[0], setIsLoading = _e[1];
    // tslint:disable-next-line:react-hooks-nesting
    useEffect(function () {
        setIsBigScreen(bigScreen);
        setIsInMobile(inMobile);
        setShouldSetHeight(numberOfLines ? numberOfLines && !inMobile : false);
        setIsLoading(false);
    }, [bigScreen, inMobile]);
    return (useNewGrid ? (React.createElement(TranslationsProvider, { i18n: i18n, locale: locale },
        React.createElement(PermissionsCtx.Provider, { value: { withPermissions: withPermissions, permissions: permissions } },
            React.createElement("div", { style: {
                    height: shouldSetHeight ? widgetHeight : 'auto',
                    overflow: 'hidden',
                    paddingTop: '15px',
                    visibility: isLoading ? 'hidden' : 'unset'
                } },
                React.createElement(Layout, { gap: '24px', cols: 12 }, solutions.map(function (solution, index) { return (React.createElement(Cell, { span: isInMobile ? 12 : isBigScreen ? 3 : 4, rows: 1, key: solution.id },
                    React.createElement(FontUpgrade, null,
                        React.createElement(SolutionBoxCompact, { as: as, to: solution.to, solution: solution, solutionBiData: solutionsBiData && solutionsBiData[index], layout: layout || SolutionGridLayout.MARKETPLACE, onBoxClick: onBoxClick, onButtonClick: onButtonClick, onBoxRender: onBoxRender, isInstalled: solution.isInstalled, showPremiumLabel: solution.showPremiumLabel, isBundleAppNotInstalled: solution.isBundleAppNotInstalled, isBundleAppInstalled: solution.isBundleAppInstalled, savedPrice: solution.savedPrice, isVoucherApp: solution.isVoucherApp, hideCTA: hideCTA, hideRate: hideRate, hideTagsBadge: hideTagsBadge })))); })))))) :
        React.createElement(TranslationsProvider, { i18n: i18n, locale: locale },
            React.createElement(PermissionsCtx.Provider, { value: { withPermissions: withPermissions, permissions: permissions } },
                React.createElement("div", { style: {
                        height: shouldSetHeight ? widgetHeight : 'auto',
                        overflow: 'hidden',
                    } },
                    React.createElement("div", { className: style.grid }, useNewBox ?
                        solutions.map(function (solution, index) { return (React.createElement("div", { key: solution.id },
                            React.createElement(FontUpgrade, null,
                                React.createElement(SolutionBoxCompact, { as: as, to: solution.to, solution: solution, solutionBiData: solutionsBiData && solutionsBiData[index], layout: layout || SolutionGridLayout.MARKETPLACE, onBoxClick: onBoxClick, onButtonClick: onButtonClick, onBoxRender: onBoxRender, isInstalled: solution.isInstalled, showPremiumLabel: solution.showPremiumLabel, isBundleAppNotInstalled: solution.isBundleAppNotInstalled, isBundleAppInstalled: solution.isBundleAppInstalled, savedPrice: solution.savedPrice, isVoucherApp: solution.isVoucherApp, hideCTA: hideCTA, hideRate: hideRate, hideTagsBadge: hideTagsBadge })))); }) :
                        solutions &&
                            solutions.map(function (solution, index) { return (React.createElement("div", { key: solution.id },
                                React.createElement(FontUpgrade, null,
                                    React.createElement(SolutionBox, { as: as, to: solution.to, solution: solution, solutionBiData: solutionsBiData && solutionsBiData[index], isCompany: isCompany, layout: layout || SolutionGridLayout.MARKETPLACE, onBoxClick: onBoxClick, onButtonClick: onButtonClick, onBoxRender: onBoxRender, isInstalled: solution.isInstalled, showPremiumLabel: solution.showPremiumLabel, isBundleAppNotInstalled: solution.isBundleAppNotInstalled, isBundleAppInstalled: solution.isBundleAppInstalled, savedPrice: solution.savedPrice, isVoucherApp: solution.isVoucherApp, hideCTA: hideCTA, hideTagsBadge: hideTagsBadge })))); }))))));
});
//# sourceMappingURL=index.js.map