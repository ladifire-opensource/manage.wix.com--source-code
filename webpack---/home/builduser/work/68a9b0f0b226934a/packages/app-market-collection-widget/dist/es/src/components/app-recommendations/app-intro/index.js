import * as React from 'react';
import * as style from './app-intro.scss';
import { Box, Text } from 'wix-style-react';
import { CategoriesBox } from '../categories-box';
export var AppIntro = function (_a) {
    var solution = _a.solution, onCategoryClick = _a.onCategoryClick, onSubCategoryClick = _a.onSubCategoryClick;
    return (React.createElement(Box, null,
        React.createElement("img", { src: solution.icon, className: style.icon, alt: "icon" }),
        React.createElement(Box, { marginLeft: "18px", direction: "vertical" },
            React.createElement(Text, { size: "medium", weight: "bold", skin: "standard" }, solution.name),
            React.createElement(Text, { size: "small", weight: "thin", secondary: true }, solution.teaser),
            React.createElement(CategoriesBox, { solution: solution, onCategoryClick: onCategoryClick, onSubCategoryClick: onSubCategoryClick }))));
};
//# sourceMappingURL=index.js.map