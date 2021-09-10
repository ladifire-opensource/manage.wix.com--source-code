import * as React from 'react';
import * as style from './categories-box.scss';
import { Box, Text, TextButton } from 'wix-style-react';
export var CategoriesBox = function (_a) {
    var solution = _a.solution, onCategoryClick = _a.onCategoryClick, onSubCategoryClick = _a.onSubCategoryClick;
    var _b = getCategoryAndSub(solution), subCategory = _b.subCategory, category = _b.category;
    return category ? (React.createElement("div", { className: style.categories },
        React.createElement(TextButton, { size: "tiny", onClick: function (e) { return onCategoryClick(e, category); } }, category.name),
        React.createElement(Box, { margin: "0 6px" },
            React.createElement(Text, { size: "small" }, "/")),
        React.createElement(TextButton, { size: "tiny", onClick: function (e) { return onSubCategoryClick(e, category, subCategory); } }, subCategory.name))) : (React.createElement(React.Fragment, null));
};
var getCategoryAndSub = function (solution) {
    if (solution.Tags && solution.Tags.length > 0) {
        var subCategory_1 = solution.Tags.find(function (tag) { return tag.parentSlug; });
        var category = subCategory_1
            ? solution.Tags.find(function (tag) { return tag.slug === subCategory_1.parentSlug; })
            : null;
        return { subCategory: subCategory_1, category: category };
    }
    return {};
};
//# sourceMappingURL=index.js.map