import axios from 'axios';
import { calculateApiHostname } from './api.utils';
function getAppReviewsById(appDefId) {
    return axios
        .get("https://" + calculateApiHostname() + "/_api/reviews-server/v1/products/" + appDefId + "/reviews", {
        withCredentials: true,
    })
        .then(function (_a) {
        var data = _a.data;
        return data;
    });
}
function submitReview(appDefId, reviewData) {
    var reviewId = reviewData.reviewId, etag = reviewData.etag, rating = reviewData.rating, title = reviewData.title, description = reviewData.description;
    var appWasPreviouslyReviewed = Boolean(reviewId);
    if (appWasPreviouslyReviewed) {
        return axios.put("https://" + calculateApiHostname() + "/_api/reviews-server/v1/products/" + appDefId + "/reviews/" + reviewId, { rating: rating, title: title, description: description }, {
            withCredentials: true,
            headers: { 'If-Match': etag },
        });
    }
    return axios.post("https://" + calculateApiHostname() + "/_api/reviews-server/v1/products/" + appDefId + "/reviews", {
        rating: rating,
        title: title,
        description: description,
    });
}
export { getAppReviewsById, submitReview };
//# sourceMappingURL=review.js.map