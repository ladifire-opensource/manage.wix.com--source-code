import { __assign, __rest } from "tslib";
import * as React from 'react';
import { TranslationsProvider } from '../../../i18next';
import { NamespacesConsumer } from 'react-i18next';
import { AppsCollectionPageWrapper, } from './apps-collection-page-wrapper';
function AppsCollectionPageWrapperExport(_a) {
    var locale = _a.locale, appsCollectionPageWrapper = __rest(_a, ["locale"]);
    return (React.createElement(TranslationsProvider, { locale: locale },
        React.createElement(NamespacesConsumer, null, function (t) { return (React.createElement(AppsCollectionPageWrapper, __assign({}, appsCollectionPageWrapper, { t: t }))); })));
}
export { AppsCollectionPageWrapperExport, };
//# sourceMappingURL=apps-collection-page-wrapper-export.js.map