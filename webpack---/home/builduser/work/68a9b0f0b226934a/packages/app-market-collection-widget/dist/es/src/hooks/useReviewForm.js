import { __awaiter, __generator } from "tslib";
import * as React from 'react';
import { submitReview } from '../api/review';
var EMPTY_REVIEW_DATA = {
    reviewId: '',
    etag: '',
    rating: 5,
    title: '',
    description: '',
};
function useReviewForm(appDefId, previousReview, onSuccessfulSubmission) {
    if (previousReview === void 0) { previousReview = EMPTY_REVIEW_DATA; }
    var reviewId = previousReview.reviewId, etag = previousReview.etag, initialRating = previousReview.rating, initialTitle = previousReview.title, initialDescription = previousReview.description;
    var _a = React.useState(initialRating), rating = _a[0], setRating = _a[1];
    var _b = React.useState(initialTitle), title = _b[0], setTitle = _b[1];
    var _c = React.useState(initialDescription), description = _c[0], setDescription = _c[1];
    var _d = React.useState(''), errorKey = _d[0], setErrorKey = _d[1];
    var _e = React.useState(undefined), titleStatus = _e[0], setTitleStatus = _e[1];
    function updateTitleStatus(inputValue) {
        if (inputValue) {
            setTitleStatus(undefined);
        }
        else {
            setTitleStatus('error');
        }
    }
    function submit() {
        return __awaiter(this, void 0, void 0, function () {
            var reviewData, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        reviewData = {
                            reviewId: reviewId,
                            etag: etag,
                            rating: rating,
                            title: title,
                            description: description,
                        };
                        if (!reviewData.title) {
                            setErrorKey('review-app.error-notification-missing-fields');
                            setTitleStatus('error');
                            return [2 /*return*/];
                        }
                        setErrorKey('');
                        setTitleStatus(undefined);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, submitReview(appDefId, reviewData)];
                    case 2:
                        _a.sent();
                        onSuccessfulSubmission === null || onSuccessfulSubmission === void 0 ? void 0 : onSuccessfulSubmission(reviewData);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        if (error_1.response.status === 412) {
                            setErrorKey('review-app.error-notification-user-is-ineligible-to-review');
                        }
                        else {
                            setErrorKey('review-app.error-notification-server-error');
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    return {
        errorKey: errorKey,
        rating: rating,
        setRating: setRating,
        title: title,
        setTitle: setTitle,
        titleStatus: titleStatus,
        updateTitleStatus: updateTitleStatus,
        description: description,
        setDescription: setDescription,
        submit: submit,
    };
}
export { useReviewForm };
//# sourceMappingURL=useReviewForm.js.map