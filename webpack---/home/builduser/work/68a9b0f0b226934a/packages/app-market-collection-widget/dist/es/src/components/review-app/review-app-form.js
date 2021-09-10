import * as React from 'react';
import { Box, FloatingNotification, FormField, Input, InputArea, StarsRatingBar, } from 'wix-style-react';
import StatusAlert from 'wix-ui-icons-common/StatusAlert';
function ReviewAppForm(_a) {
    var appName = _a.appName, reviewForm = _a.reviewForm, _b = _a.editorSdkVariant, editorSdkVariant = _b === void 0 ? false : _b, t = _a.t;
    var rateLabel = t('review-app.rate-label');
    var rateStarsDescription = [
        t('review-app.rate-one-star-description'),
        t('review-app.rate-two-stars-description'),
        t('review-app.rate-three-stars-description'),
        t('review-app.rate-four-stars-description'),
        t('review-app.rate-five-stars-description'),
    ];
    var reviewTitleLabel = t('review-app.review-title-label');
    var reviewTitlePlaceholder = t('review-app.review-title-placeholder');
    var reviewTitleStatusMessage = reviewForm.titleStatus
        ? t('review-app.review-title-error-tooltip')
        : undefined;
    var reviewDescriptionLabel = t('review-app.review-description-label');
    var reviewDescriptionPlaceholder = t('review-app.review-description-placeholder', { appName: appName });
    var reviewDescriptionInputHeight = editorSdkVariant && !reviewForm.errorKey ? '149px' : '101px';
    return (React.createElement(Box, { direction: "vertical" },
        Boolean(reviewForm.errorKey) && (React.createElement(Box, { direction: "vertical", marginBottom: "12px" },
            React.createElement(FloatingNotification, { type: "destructive", prefixIcon: React.createElement(StatusAlert, null), text: t(reviewForm.errorKey), showCloseButton: false }))),
        React.createElement(Box, { direction: "vertical", marginBottom: "24px" },
            React.createElement(FormField, { label: rateLabel, required: true },
                React.createElement(StarsRatingBar, { dataHook: "review-rating-stars", value: reviewForm.rating, descriptionValues: rateStarsDescription, onChange: reviewForm.setRating }))),
        React.createElement(Box, { direction: "vertical", marginBottom: "24px" },
            React.createElement(FormField, { label: reviewTitleLabel, required: true, charCount: 100 - reviewForm.title.length },
                React.createElement(Input, { dataHook: "review-title-input", value: reviewForm.title, placeholder: reviewTitlePlaceholder, status: reviewForm.titleStatus, statusMessage: reviewTitleStatusMessage, onChange: function (event) { return reviewForm.setTitle(event.target.value); }, onBlur: function () { return reviewForm.updateTitleStatus(reviewForm.title); }, maxLength: 100 }))),
        React.createElement(Box, { direction: "vertical", marginBottom: "2px" },
            React.createElement(FormField, { label: reviewDescriptionLabel, charCount: 1000 - reviewForm.description.length },
                React.createElement(InputArea, { dataHook: "review-description-input-area", value: reviewForm.description, placeholder: reviewDescriptionPlaceholder, onChange: function (event) { return reviewForm.setDescription(event.target.value); }, maxLength: 1000, minHeight: reviewDescriptionInputHeight })))));
}
export { ReviewAppForm };
//# sourceMappingURL=review-app-form.js.map