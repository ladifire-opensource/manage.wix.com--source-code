import { __assign, __awaiter, __decorate, __extends, __generator } from "tslib";
import * as React from "react";
import * as s from "../style.scss";
import axios from "axios";
import { TranslationsProvider } from "../../../i18next";
import { SolutionGridWithHeader } from "../../solution/solution-grid-with-header";
import { FontUpgrade, Loader } from "wix-style-react";
import { ExperimentsProvider } from "@wix/wix-experiments-react";
import { getAllCountries } from "../API";
import { getSolutionsBiData } from "../common";
import { composer } from "../../../component-decorators/composer";
import { sendFinanceIntegrationsWidgetLoadedBi } from "../../../bi/events";
import { withExperiments } from "../../../component-decorators/with-experiments";
import { getBundleAppSavedPrice, isBundleAppAndInstalled, isBundleAppAndNotInstalled } from "../../common";
var forbiddenCountriesShortKey = ["CW", "IR", "KP", "SY"];
export var AppMarketWidgetContainer = composer()
    .withExperiments()
    .compose(function (props) { return (React.createElement(FontUpgrade, null,
    React.createElement(ExperimentsProvider, { options: { scope: "market" } },
        React.createElement(FinanceIntegrations, __assign({}, props))))); });
var FinanceIntegrations = /** @class */ (function (_super) {
    __extends(FinanceIntegrations, _super);
    function FinanceIntegrations(props, _a) {
        var _this = _super.call(this, props) || this;
        _this.shouldFetchBundleApps = _this.props.experiments &&
            _this.props.experiments.enabled("specs.marketplace.bundle-indication-in-app-page");
        _this.domain = window.location.origin;
        _this.fetchApps = function (countryKey) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, axios
                        .get(window.location.origin + "/_api/marketplace-api/v1/web-solutions/tags/financial-integrations?geo=" + countryKey)
                        .then(function (_a) {
                        var data = _a.data;
                        return data.webSolutions.map(function (solution) { return solution.baseInfo; });
                    })
                        .catch(function (error) { return console.log("cannot fetch collection apps", error); })];
            });
        }); };
        _this.fetchInstalledSolutions = function () { return __awaiter(_this, void 0, void 0, function () {
            var installedSolutionsUrl;
            return __generator(this, function (_a) {
                if (this.props.signedInstance) {
                    installedSolutionsUrl = this.domain + "/_api/marketplace-api/v1/managed-apps";
                    return [2 /*return*/, axios
                            .get(installedSolutionsUrl, {
                            headers: { Authorization: this.props.signedInstance }
                        })
                            .then(function (res) { return res && res.data && res.data.managedWebSolutions; })
                            .catch(function (error) { return console.log("cannot fetch installed apps", error); })];
                }
                return [2 /*return*/, Promise.resolve([])];
            });
        }); };
        _this.fetchBundleApps = function () {
            if (_this.props.signedInstance && _this.shouldFetchBundleApps) {
                return axios
                    .get(_this.domain + "/_api/marketplace-api/v1/bundle-apps?lang=en", {
                    headers: { Authorization: _this.props.signedInstance },
                    withCredentials: true
                })
                    .then(function (res) { return res && res.data && res.data.bundleWebSolutions; })
                    .catch(function (error) { return console.log("cannot fetch bundle apps", error); });
            }
            return Promise.resolve([]);
        };
        _this.enrichSolutions = function (solutions, installedApps, bundleApps) {
            return solutions === null || solutions === void 0 ? void 0 : solutions.map(function (solution, appIndex) { return (__assign(__assign({}, solution), { appIndex: appIndex, isInstalled: !!(installedApps &&
                    installedApps.findIndex(function (installedApp) { return installedApp.webSolutionBase.id === solution.id; }) > -1), isBundleAppNotInstalled: isBundleAppAndNotInstalled(solution.id, bundleApps), isBundleAppInstalled: isBundleAppAndInstalled(solution.id, bundleApps), savedPrice: getBundleAppSavedPrice(solution.id, bundleApps) })); });
        };
        _this.updateDisplayedCountry = function (country) { return __awaiter(_this, void 0, void 0, function () {
            var solutions, solutionsBiData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(country !== this.state.displayedCountry)) return [3 /*break*/, 2];
                        this.setState({ displayedCountry: country, isFetchingApps: true });
                        return [4 /*yield*/, this.fetchApps(country.shortKey)];
                    case 1:
                        solutions = _a.sent();
                        solutionsBiData = getSolutionsBiData(solutions, this.props.metaSiteId);
                        this.setState({ isFetchingApps: false, solutions: solutions, solutionsBiData: solutionsBiData });
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); };
        _this.updateDisplayedCountry = _this.updateDisplayedCountry.bind(_this);
        _this.fetchApps = _this.fetchApps.bind(_this);
        _this.state = {
            isFetchingApps: true,
            solutions: null,
            solutionsBiData: null,
            displayedCountry: null,
            countries: []
        };
        return _this;
    }
    FinanceIntegrations.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var collectionSolutions, installedSolutions, bundleSolutions, solutions, solutionsBiData, countries, displayedCountry;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchApps(this.props.countryKey)];
                    case 1:
                        collectionSolutions = _a.sent();
                        return [4 /*yield*/, this.fetchInstalledSolutions()];
                    case 2:
                        installedSolutions = _a.sent();
                        return [4 /*yield*/, this.fetchBundleApps()];
                    case 3:
                        bundleSolutions = _a.sent();
                        solutions = this.enrichSolutions(collectionSolutions, installedSolutions, bundleSolutions);
                        solutionsBiData = getSolutionsBiData(solutions, this.props.metaSiteId);
                        return [4 /*yield*/, getAllCountries(this.props.locale)];
                    case 4:
                        countries = _a.sent();
                        countries
                            .filter(function (country) { return !forbiddenCountriesShortKey.includes(country.shortKey); })
                            .sort(function (a, b) {
                            return a.displayName < b.displayName
                                ? -1
                                : a.displayName > b.displayName
                                    ? 1
                                    : 0;
                        });
                        displayedCountry = countries.filter(function (country) { return country.shortKey === _this.props.countryKey; })[0];
                        sendFinanceIntegrationsWidgetLoadedBi(this.props.metaSiteId);
                        this.setState({
                            isFetchingApps: false,
                            solutions: solutions,
                            solutionsBiData: solutionsBiData,
                            countries: countries,
                            displayedCountry: displayedCountry
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    FinanceIntegrations.prototype.render = function () {
        var _this = this;
        return (React.createElement(TranslationsProvider, { i18n: this.props.i18n, locale: this.props.locale },
            React.createElement("div", null, this.state.isFetchingApps ? (React.createElement("div", { className: s.loader },
                React.createElement(Loader, { status: "loading" }))) : (React.createElement("div", null,
                React.createElement(SolutionGridWithHeader, { as: this.props.as, solutions: this.state.solutions, solutionsBiData: this.state.solutionsBiData, onBoxClick: function (solution) {
                        _this.props.navigateToApp(solution.slug);
                    }, onButtonClick: function (solution) {
                        _this.props.navigateToApp(solution.slug);
                    }, onBoxRender: function () { }, onGoToMarketClick: function () { return _this.props.navigateToMarket(); }, countries: this.state.countries, displayedCountry: this.state.displayedCountry, updateDisplayedCountry: this.updateDisplayedCountry, children: this.props.children }))))));
    };
    FinanceIntegrations = __decorate([
        withExperiments
    ], FinanceIntegrations);
    return FinanceIntegrations;
}(React.Component));
//# sourceMappingURL=index.js.map