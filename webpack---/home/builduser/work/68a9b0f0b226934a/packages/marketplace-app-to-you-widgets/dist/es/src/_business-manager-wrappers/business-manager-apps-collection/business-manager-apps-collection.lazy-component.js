import React from 'react';
import { ModuleRegistry } from 'react-module-container';
import { BUSINESS_MANAGER_APPS_COLLECTION_WIDGET_NAME, } from './business-manager-apps-collection.common';
import { AppsCollection } from '../../widgets/apps-collection';
export var AppsCollectionWidgetComponent = function (_a) {
    var locale = _a.locale, metaSiteId = _a.metaSiteId, collectionTag = _a.collectionTag, originPageComponentId = _a.originPageComponentId, originPageComponentLabel = _a.originPageComponentLabel, geoFilter = _a.geoFilter, numberOfLines = _a.numberOfLines, pageWrapperMetadata = _a.pageWrapperMetadata, siteCountryCode = _a.siteCountryCode, referralInfo = _a.referralInfo;
    return (React.createElement(AppsCollection, { locale: locale, metaSiteId: metaSiteId, collectionTag: collectionTag, ctaMetadata: {
            originComponentId: originPageComponentId,
            originComponentLabel: originPageComponentLabel,
        }, referralInfo: referralInfo, geoFilter: geoFilter, numberOfLines: numberOfLines, pageWrapperMetadata: pageWrapperMetadata, siteCountryCode: siteCountryCode }));
};
ModuleRegistry.registerComponent(BUSINESS_MANAGER_APPS_COLLECTION_WIDGET_NAME, function () { return AppsCollectionWidgetComponent; });
//# sourceMappingURL=business-manager-apps-collection.lazy-component.js.map