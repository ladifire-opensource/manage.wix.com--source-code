import * as React from 'react';
import { FontUpgrade, Modal } from 'wix-style-react';
import { ReviewAppModalLayout } from './review-app-modal-layout';
import { useReviewModalPrefetch } from '../../hooks/useReviewModalPrefetch';
import { biLogger } from '../../bi';
function ReviewAppModal(_a) {
    var appDefId = _a.appDefId, isOpen = _a.isOpen, closeFn = _a.closeFn, afterCloseFn = _a.afterCloseFn, showSuccessToast = _a.showSuccessToast, additionalBiData = _a.additionalBiData, t = _a.t;
    var appReviewData = useReviewModalPrefetch(appDefId, isOpen, closeFn);
    var isModalOpen = isOpen && Boolean(appReviewData);
    var _b = appReviewData || {}, appName = _b.appName, appIconSrc = _b.appIconSrc, previousReview = _b.previousReview;
    React.useEffect(function () {
        if (isModalOpen) {
            biLogger
                .appMarketAddEditAppReviewClick({
                appId: appDefId,
                msid: additionalBiData.msid,
                actionType: Boolean(appReviewData.previousReview)
                    ? 'edit_review'
                    : 'add_review',
                post_type: 'new_review',
                tag_type: additionalBiData.tagType,
                market: additionalBiData.platform,
            })
                .catch(function (error) { return console.log(error); });
        }
    }, [isModalOpen]);
    return (React.createElement(FontUpgrade, null,
        React.createElement(Modal, { isOpen: isModalOpen },
            React.createElement(ReviewAppModalLayout, { appDefId: appDefId, appName: appName, appIconSrc: appIconSrc, previousReview: previousReview, closeModal: closeFn, afterClose: afterCloseFn, showSuccessToast: showSuccessToast, additionalBiData: additionalBiData, t: t }))));
}
export { ReviewAppModal };
//# sourceMappingURL=review-app-modal.js.map