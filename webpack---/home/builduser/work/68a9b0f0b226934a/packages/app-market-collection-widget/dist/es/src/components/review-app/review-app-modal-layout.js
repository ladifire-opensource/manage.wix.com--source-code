import * as React from 'react';
import { CustomModalLayout } from 'wix-style-react';
import { ReviewAppHeader } from './review-app-header';
import { ReviewAppForm } from './review-app-form';
import { useReviewForm } from '../../hooks/useReviewForm';
import { biLogger } from '../../bi';
function ReviewAppModalLayout(_a) {
    var appDefId = _a.appDefId, appName = _a.appName, appIconSrc = _a.appIconSrc, previousReview = _a.previousReview, closeModal = _a.closeModal, afterClose = _a.afterClose, showSuccessToast = _a.showSuccessToast, additionalBiData = _a.additionalBiData, t = _a.t;
    var submitReviewButtonText = t('review-app.submit-review');
    var cancelButtonText = t('review-app.cancel-review');
    function onSuccessfulSubmission(reviewData) {
        closeModal();
        showSuccessToast === null || showSuccessToast === void 0 ? void 0 : showSuccessToast(t('review-app.successful-submission-toast'));
        afterClose === null || afterClose === void 0 ? void 0 : afterClose();
        biLogger
            .appMarketPostAppReview({
            appId: appDefId,
            msid: additionalBiData.msid,
            appScore: reviewData.rating.toString(),
            review_title: reviewData.title,
            has_description: Boolean(reviewData.description),
            review_body: reviewData.description,
            actionType: Boolean(previousReview === null || previousReview === void 0 ? void 0 : previousReview.reviewId)
                ? 'edit_review'
                : 'add_review',
            post_type: 'new_review',
            tag_type: additionalBiData.tagType,
            market: additionalBiData.platform,
        })
            .catch(function (error) { return console.log(error); });
    }
    var reviewForm = useReviewForm(appDefId, previousReview, onSuccessfulSubmission);
    function closeModalAndSendBi() {
        closeModal();
        biLogger
            .appMarketCancelAppReviewClick({
            appId: appDefId,
            msid: additionalBiData.msid,
            tag_type: additionalBiData.tagType,
            market: additionalBiData.platform,
        })
            .catch(function (error) { return console.log(error); });
    }
    return (React.createElement(CustomModalLayout, { width: "600px", height: "544px", title: React.createElement(ReviewAppHeader, { appName: appName, appIconSrc: appIconSrc, t: t }), primaryButtonText: submitReviewButtonText, primaryButtonOnClick: reviewForm.submit, secondaryButtonText: cancelButtonText, secondaryButtonOnClick: closeModalAndSendBi, onCloseButtonClick: closeModalAndSendBi },
        React.createElement(ReviewAppForm, { appName: appName, reviewForm: reviewForm, t: t })));
}
export { ReviewAppModalLayout };
//# sourceMappingURL=review-app-modal-layout.js.map