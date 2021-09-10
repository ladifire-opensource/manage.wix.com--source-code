import * as React from 'react';
import StatusCompleteFilledSmall from 'wix-ui-icons-common/StatusCompleteFilledSmall';
import * as style from './solution-badge.scss';
import PremiumSmall from 'wix-ui-icons-common/PremiumSmall';
import { Text } from 'wix-style-react';
import { composer } from "../../component-decorators/composer";
import { usePremiumCurrencyFormatter } from '@wix/premium-react-text';
export var SolutionBadge = composer()
    .withExperiments()
    .compose(function (_a) {
    var _b;
    var _c, _d, _e, _f, _g, _h, _j, _k, _l;
    var t = _a.t, isInstalled = _a.isInstalled, showPremiumLabel = _a.showPremiumLabel, pricing = _a.pricing, isBundleAppInstalled = _a.isBundleAppInstalled, isBundleAppNotInstalled = _a.isBundleAppNotInstalled, savedPrice = _a.savedPrice, experiments = _a.experiments;
    var fixedPrice = savedPrice && savedPrice !== 0 ? Number(savedPrice).toFixed(2) : '';
    if (isBundleAppNotInstalled) {
        return (React.createElement("span", { className: style.flexView },
            fixedPrice !== '' && (React.createElement("span", { style: { textDecoration: 'line-through' } },
                React.createElement(Text, { size: "tiny", weight: "thin" },
                    "$",
                    fixedPrice))),
            React.createElement("span", { style: { marginLeft: '6px' } },
                React.createElement(Text, { size: "tiny", weight: "thin", skin: "success" }, t('solutionBox.solutionBottomActionBar.BundleNotInstalled')))));
    }
    if (isBundleAppInstalled) {
        return (React.createElement("span", { className: style.bundleBadge },
            React.createElement(StatusCompleteFilledSmall, { className: style.installedIcon }),
            React.createElement(Text, { size: "tiny", weight: "thin", skin: "success", dataHook: "installed-text" }, t('solutionBox.solutionBottomActionBar.BundleInstalled'))));
    }
    if (isInstalled) {
        return (React.createElement("span", { className: style.centeredView },
            React.createElement(StatusCompleteFilledSmall, { className: style.installedIcon }),
            React.createElement(Text, { size: "tiny", weight: "thin", skin: "success", dataHook: "installed-text" }, t('solutionBox.solutionBottomActionBar.installedSolution'))));
    }
    if (showPremiumLabel) {
        return (React.createElement("div", { className: style.premiumBadge },
            React.createElement(PremiumSmall, null),
            React.createElement(Text, { size: "tiny", weight: "thin", skin: "standard", secondary: true, className: style.premiumText }, t('app.pricing.Premium'))));
    }
    // tslint:disable-next-line:react-hooks-nesting
    var currencyToString = usePremiumCurrencyFormatter({ currencySettings: (_b = {},
            _b[(_c = pricing === null || pricing === void 0 ? void 0 : pricing.currencySettings) === null || _c === void 0 ? void 0 : _c.code] = {
                symbol: (_d = pricing === null || pricing === void 0 ? void 0 : pricing.currencySettings) === null || _d === void 0 ? void 0 : _d.symbol,
                decimalSep: (_e = pricing === null || pricing === void 0 ? void 0 : pricing.currencySettings) === null || _e === void 0 ? void 0 : _e.decimalSeparator,
                groupSep: (_f = pricing === null || pricing === void 0 ? void 0 : pricing.currencySettings) === null || _f === void 0 ? void 0 : _f.groupSeparator,
                negPrefix: (_g = pricing === null || pricing === void 0 ? void 0 : pricing.currencySettings) === null || _g === void 0 ? void 0 : _g.negativePrefix,
                negSuffix: (_h = pricing === null || pricing === void 0 ? void 0 : pricing.currencySettings) === null || _h === void 0 ? void 0 : _h.negativeSuffix,
                posPrefix: '¤',
                posSuffix: '',
                fractionSize: 2,
            },
            _b), currencyCode: (_j = pricing === null || pricing === void 0 ? void 0 : pricing.currencySettings) === null || _j === void 0 ? void 0 : _j.code })[0];
    var shouldShowPriceWithCurrencyAndOrTax = (pricing === null || pricing === void 0 ? void 0 : pricing.businessModel) === "PREMIUM" && (pricing === null || pricing === void 0 ? void 0 : pricing.freeTrialDays) === 0 && ((_k = pricing === null || pricing === void 0 ? void 0 : pricing.currencySettings) === null || _k === void 0 ? void 0 : _k.code);
    var pricingLabel = shouldShowPriceWithCurrencyAndOrTax ? 'app.pricing.from-in-app-full' : pricing === null || pricing === void 0 ? void 0 : pricing.pricingLabel;
    var fullPrice = ((_l = pricing === null || pricing === void 0 ? void 0 : pricing.taxSettings) === null || _l === void 0 ? void 0 : _l.showPricesWithTax) ? pricing === null || pricing === void 0 ? void 0 : pricing.lowestMonthlyPriceWithTax : pricing === null || pricing === void 0 ? void 0 : pricing.lowestMonthlyPrice;
    return (React.createElement(Text, { size: "tiny", weight: "thin", skin: "standard", secondary: true, dataHook: "business-model-text", className: style.centeredView }, t(pricingLabel, {
        trialDays: pricing === null || pricing === void 0 ? void 0 : pricing.freeTrialDays,
        price: pricing.lowestMonthlyPrice,
        fullPrice: shouldShowPriceWithCurrencyAndOrTax ? currencyToString(fullPrice) : ''
    })));
});
//# sourceMappingURL=solution-badge.js.map