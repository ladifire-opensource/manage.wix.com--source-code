import { __assign, __rest } from "tslib";
import * as React from 'react';
import { TranslationsProvider } from '../../../i18next';
import { NamespacesConsumer } from 'react-i18next';
import { AppsToYouChangeLocationModalContainer, } from './apps-to-you-change-location-modal-container';
function AppsToYouChangeLocationModalExport(_a) {
    var locale = _a.locale, appsToYouChangeLocationModal = __rest(_a, ["locale"]);
    return (React.createElement(TranslationsProvider, { locale: locale },
        React.createElement(NamespacesConsumer, null, function (t) { return (React.createElement(AppsToYouChangeLocationModalContainer, __assign({}, appsToYouChangeLocationModal, { t: t }))); })));
}
export { AppsToYouChangeLocationModalExport, };
//# sourceMappingURL=apps-to-you-change-location-modal-export.js.map