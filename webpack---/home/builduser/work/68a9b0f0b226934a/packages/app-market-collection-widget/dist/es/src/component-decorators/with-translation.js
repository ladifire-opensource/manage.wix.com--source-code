import { __assign } from "tslib";
import * as React from 'react';
import { NamespacesConsumer, } from 'react-i18next';
import { getI18nInstance } from '../i18next/translations-provider';
export var withTranslation = function (component) {
    return function (props) {
        var i18n = getI18nInstance();
        if (i18n) {
            return React.createElement(component, __assign(__assign({}, props), { t: function (k, o) { return i18n.t(k, o); } }));
        }
        return (React.createElement(NamespacesConsumer, null, function (t) { return React.createElement(component, __assign(__assign({}, props), { t: t })); }));
    };
};
//# sourceMappingURL=with-translation.js.map