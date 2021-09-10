import { __assign, __rest } from "tslib";
import * as React from 'react';
import { TranslationsProvider } from '../../i18next';
import { NamespacesConsumer } from 'react-i18next';
import { ReviewAppModal } from './review-app-modal';
function ReviewAppModalExport(_a) {
    var locale = _a.locale, reviewAppModalProps = __rest(_a, ["locale"]);
    return (React.createElement(TranslationsProvider, { locale: locale },
        React.createElement(NamespacesConsumer, null, function (t) { return React.createElement(ReviewAppModal, __assign({}, reviewAppModalProps, { t: t })); })));
}
export { ReviewAppModalExport };
//# sourceMappingURL=review-app-modal-export.js.map