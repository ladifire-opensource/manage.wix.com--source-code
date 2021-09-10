import { __awaiter, __generator } from "tslib";
import * as React from 'react';
import { getAppDataById } from '../api/app';
import { getAppReviewsById } from '../api/review';
function fetchAppReviewData(appDefId) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, appData, appReviews, appName, appIconSrc, previousReview;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, Promise.all([
                        getAppDataById(appDefId),
                        getAppReviewsById(appDefId),
                    ])];
                case 1:
                    _a = _b.sent(), appData = _a[0], appReviews = _a[1];
                    appName = appData.webSolutions[0].baseInfo.name;
                    appIconSrc = appData.webSolutions[0].baseInfo.icon;
                    previousReview = appReviews.userReview
                        ? {
                            reviewId: appReviews.userReview.id,
                            etag: appReviews.userReview.etag,
                            rating: appReviews.userReview.rating,
                            title: appReviews.userReview.title,
                            description: appReviews.userReview.description,
                        }
                        : undefined;
                    return [2 /*return*/, { appName: appName, appIconSrc: appIconSrc, previousReview: previousReview }];
            }
        });
    });
}
function useReviewModalPrefetch(appDefId, isOpen, closeFn) {
    if (isOpen === void 0) { isOpen = false; }
    var _a = React.useState(null), appReviewData = _a[0], setAppReviewData = _a[1];
    var updateData = React.useCallback(function () {
        fetchAppReviewData(appDefId)
            .then(setAppReviewData)
            .catch(closeFn);
    }, [appDefId]);
    var invalidateData = React.useCallback(function () {
        setAppReviewData(null);
    }, []);
    React.useEffect(function () {
        if (isOpen) {
            updateData();
        }
        else {
            invalidateData();
        }
    }, [isOpen, appDefId, updateData, invalidateData]);
    return appReviewData;
}
export { useReviewModalPrefetch };
//# sourceMappingURL=useReviewModalPrefetch.js.map