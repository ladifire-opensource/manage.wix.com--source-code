import * as React from 'react';
import { TranslationsProvider } from '../../i18next';
import s from './style.scss';
import { sendWidgetClick, sendWidgetNavigation } from '../../bi/events';
import { Box, Text, Carousel, FontUpgrade } from 'wix-style-react';
import { ConditionalLinkRenderer } from '../solution/solution-grid/solution-box';
import { composer } from '../../component-decorators/composer';
export var CategoriesCarouselWidget = composer().compose(function (_a) {
    var categories = _a.categories, _b = _a.locale, locale = _b === void 0 ? 'en' : _b, onCategoryClickHandler = _a.onCategoryClickHandler, biData = _a.biData, as = _a.as, i18n = _a.i18n;
    var handleNavClick = function (oldIndex, newIndex) {
        if (biData) {
            var direction = oldIndex < newIndex ? 'right' : 'left';
            sendWidgetNavigation(biData[oldIndex], direction);
        }
    };
    return (React.createElement(FontUpgrade, null,
        React.createElement(TranslationsProvider, { i18n: i18n, locale: locale },
            React.createElement(Carousel, { buttonSkin: "inverted", dots: true, variableWidth: true, beforeChange: handleNavClick, className: s.carouselWrapper, children: categories.map(function (category, index) {
                    var _a = category, name = _a.name, description = _a.description, slug = _a.slug, to = _a.to;
                    return (React.createElement("span", { onClick: function () {
                            sendWidgetClick(biData[index]);
                            onCategoryClickHandler(category);
                        }, key: slug, className: s.slide },
                        React.createElement(ConditionalLinkRenderer, { as: as, to: to },
                            React.createElement(Box, { className: s.box },
                                React.createElement("div", { className: s.boxContent },
                                    React.createElement(Box, { direction: "vertical", className: s.titleWrapper },
                                        React.createElement(Text, { size: "medium", weight: "bold", dataHook: "solution-name", className: s.solutionName }, name),
                                        React.createElement("div", { className: s.teaser },
                                            React.createElement(Text, { size: "small", weight: "thin", dataHook: "solution-teaser" }, description))),
                                    React.createElement("div", { className: s.imgWrapper },
                                        React.createElement("img", { className: s.image, alt: name + " category icon", src: "//" + category.icon })))))));
                }) }))));
});
//# sourceMappingURL=index.js.map