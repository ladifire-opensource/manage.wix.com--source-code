import * as React from 'react';
import { sendFinanceAddMoreAppsClickBi } from '../../../bi/events';
import { Page, Button, FontUpgrade } from 'wix-style-react';
import { composer } from '../../../component-decorators/composer';
export var AppsCollectionPageWrapper = composer()
    .withTranslation()
    .compose(function (_a) {
    var metadata = _a.metadata, t = _a.t, onGoToMarketClick = _a.onGoToMarketClick, children = _a.children, metaSiteId = _a.metaSiteId;
    function getSubtitle() {
        return (metadata === null || metadata === void 0 ? void 0 : metadata.subtitle) || t('collection.subtitle');
    }
    function getTitle() {
        return (metadata === null || metadata === void 0 ? void 0 : metadata.title) || t('collection.title');
    }
    function getOnClick() {
        var _a, _b;
        if ((_a = metadata === null || metadata === void 0 ? void 0 : metadata.cta) === null || _a === void 0 ? void 0 : _a.onClick) {
            return (_b = metadata === null || metadata === void 0 ? void 0 : metadata.cta) === null || _b === void 0 ? void 0 : _b.onClick;
        }
        return function () {
            sendFinanceAddMoreAppsClickBi(metaSiteId);
            onGoToMarketClick();
        };
    }
    function getCtaMetadata() {
        var _a;
        return ((_a = metadata === null || metadata === void 0 ? void 0 : metadata.cta) === null || _a === void 0 ? void 0 : _a.ctaMetadata) || t('collection.market.cta');
    }
    return (React.createElement(FontUpgrade, null,
        React.createElement(Page, { height: "100vh" },
            React.createElement(Page.Header, { subtitle: getSubtitle(), title: getTitle(), actionsBar: React.createElement(Button, { onClick: getOnClick() }, getCtaMetadata()) }),
            React.createElement(Page.Content, null,
                React.createElement("div", null, children)))));
});
//# sourceMappingURL=apps-collection-page-wrapper.js.map