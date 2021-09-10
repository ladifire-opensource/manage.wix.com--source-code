import * as React from 'react';
import css from './ErrorPage.scss';
import { Heading, Text, TextButton } from 'wix-style-react';
import classnames from 'classnames';
export var ErrorPageThemes;
(function (ErrorPageThemes) {
    ErrorPageThemes["DEFAULT"] = "DEFAULT";
    ErrorPageThemes["PAGE_NOT_FOUND"] = "PAGE_NOT_FOUND";
})(ErrorPageThemes || (ErrorPageThemes = {}));
export var ErrorPage = function (_a) {
    var _b;
    var titleText = _a.titleText, contentText = _a.contentText, linkText = _a.linkText, theme = _a.theme, onClick = _a.onClick;
    var wrapperClasses = classnames(css.wrapper, (_b = {},
        _b[css.pageNotFound] = theme === ErrorPageThemes.PAGE_NOT_FOUND,
        _b));
    return (React.createElement("div", { "data-hook": "error-content-wrapper", className: wrapperClasses },
        React.createElement("div", { className: css.image }),
        React.createElement(Heading, { dataHook: "error-content-title", appearance: "H3" }, titleText),
        React.createElement(Text, { className: css.contentText, size: "medium", skin: "standard", weight: "thin" }, contentText),
        React.createElement(TextButton, { dataHook: "error-content-button", onClick: onClick }, linkText)));
};
//# sourceMappingURL=ErrorPage.js.map