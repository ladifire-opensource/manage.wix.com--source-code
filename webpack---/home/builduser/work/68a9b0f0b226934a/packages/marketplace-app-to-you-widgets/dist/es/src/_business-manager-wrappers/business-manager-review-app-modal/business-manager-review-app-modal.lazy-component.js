import { __assign } from "tslib";
import * as React from 'react';
import { ModuleRegistry } from 'react-module-container';
import { BUSINESS_MANAGER_REVIEW_APP_MODAL_NAME, } from './business-manager-review-app-modal.common';
import { ReviewAppModal } from '../../widgets/review-app-modal';
export var ReviewAppModalComponent = function (props) {
    return React.createElement(ReviewAppModal, __assign({}, props));
};
ModuleRegistry.registerComponent(BUSINESS_MANAGER_REVIEW_APP_MODAL_NAME, function () { return ReviewAppModalComponent; });
//# sourceMappingURL=business-manager-review-app-modal.lazy-component.js.map