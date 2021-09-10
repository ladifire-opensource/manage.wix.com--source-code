import { __assign, __rest } from "tslib";
import * as React from 'react';
import { ReviewAppModal as ReviewAppModalBase, } from '@wix/app-market-collection-widget';
import { showToast, ToastType } from '@wix/business-manager-api';
function ReviewAppModal(_a) {
    var msid = _a.msid, reviewAppModalProps = __rest(_a, ["msid"]);
    function showSuccessToast(message) {
        showToast({
            message: message,
            biName: 'review-app',
            type: ToastType.SUCCESS,
        });
    }
    return (React.createElement(ReviewAppModalBase, __assign({}, reviewAppModalProps, { showSuccessToast: showSuccessToast, additionalBiData: { msid: msid, tagType: 'vertical', platform: 'dashboard' } })));
}
export { ReviewAppModal };
//# sourceMappingURL=review-app-modal.js.map