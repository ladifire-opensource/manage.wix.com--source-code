import { __assign, __extends } from "tslib";
import * as React from 'react';
import * as style from './app-recommendations.scss';
import { Card, Collapse, FontUpgrade } from 'wix-style-react';
import { TranslationsProvider } from '../../i18next';
import { HeaderSection } from './header-section';
import { ShowMoreButton } from './show-more-button';
import { SolutionRowBox } from './solution-row-box';
import { ImpressionContext } from '../common/visibilityDetector/impressionContext';
import { VisibilityDetector } from '../common/visibilityDetector/visibilityDetector';
export var AppRecommendations = function (props) { return (React.createElement(FontUpgrade, null,
    React.createElement(AppRecommendationsContainer, __assign({}, props)))); };
var AppRecommendationsContainer = /** @class */ (function (_super) {
    __extends(AppRecommendationsContainer, _super);
    function AppRecommendationsContainer(props) {
        var _this = _super.call(this, props) || this;
        _this.handleShowMoreClick = function () {
            _this.setState({ shouldShowMore: true });
        };
        _this.onWidgetLoaded = function () {
            if (!_this.state.isImpression) {
                _this.props.widgetLoaded();
                _this.setState({ isImpression: true });
            }
        };
        _this.state = { shouldShowMore: false, isImpression: false };
        return _this;
    }
    AppRecommendationsContainer.prototype.render = function () {
        var _this = this;
        var _a = this.props, solutions = _a.solutions, i18n = _a.i18n, locale = _a.locale, showAllClick = _a.showAllClick, onAddClick = _a.onAddClick, onCategoryClick = _a.onCategoryClick, onSubCategoryClick = _a.onSubCategoryClick, onImpression = _a.onImpression;
        var shouldShowMore = this.state.shouldShowMore;
        var firstSolutions = solutions.slice(0, 3);
        var restSolutions = solutions.slice(3, 5);
        var shouldDisplayShowMoreButton = solutions.length > 3 && !shouldShowMore;
        return (React.createElement(TranslationsProvider, { i18n: i18n, locale: locale },
            React.createElement(ImpressionContext.Provider, { value: { onImpression: this.onWidgetLoaded } },
                React.createElement(ImpressionContext.Consumer, null, function (value) { return (React.createElement(VisibilityDetector, { onImpression: value.onImpression },
                    React.createElement("div", { className: style.solutionWrapper },
                        React.createElement(Card, null,
                            React.createElement(HeaderSection, { showAllClick: showAllClick }),
                            firstSolutions.map(function (solution, i) {
                                var lastApp = i === firstSolutions.length - 1;
                                var shouldShowDivider = !lastApp || solutions.length > 3;
                                return (React.createElement("div", { key: solution.slug, onClick: function (e) { return onAddClick(e, solution.slug, true); } },
                                    React.createElement(SolutionRowBox, { solution: solution, onAddClick: onAddClick, onCategoryClick: onCategoryClick, onSubCategoryClick: onSubCategoryClick, onImpression: onImpression }),
                                    shouldShowDivider && React.createElement(Card.Divider, null)));
                            }),
                            React.createElement(Collapse, { open: shouldShowMore }, restSolutions.map(function (solution, i) {
                                var lastApp = i === restSolutions.length - 1;
                                return (React.createElement("div", { key: solution.slug, onClick: function (e) { return onAddClick(e, solution.slug, true); } },
                                    React.createElement(SolutionRowBox, { solution: solution, onAddClick: onAddClick, onCategoryClick: onCategoryClick, onSubCategoryClick: onSubCategoryClick, onImpression: onImpression }),
                                    !lastApp && React.createElement(Card.Divider, null)));
                            })),
                            shouldDisplayShowMoreButton && (React.createElement(ShowMoreButton, { numOfMore: solutions.slice(3, 5).length, handleShowMoreClick: _this.handleShowMoreClick })))))); }))));
    };
    return AppRecommendationsContainer;
}(React.Component));
export { AppRecommendationsContainer };
//# sourceMappingURL=index.js.map