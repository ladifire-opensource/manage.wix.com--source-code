import * as React from 'react';
import css from './Header.scss';
import classNames from 'classnames';
export var Header = function (_a) {
    var _b;
    var children = _a.children, dataHook = _a.dataHook, _c = _a.isLight, isLight = _c === void 0 ? false : _c;
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { "data-hook": dataHook, className: classNames(css.persistentHeader, (_b = {}, _b[css.isLight] = isLight, _b)) }, children)));
};
//# sourceMappingURL=Header.js.map