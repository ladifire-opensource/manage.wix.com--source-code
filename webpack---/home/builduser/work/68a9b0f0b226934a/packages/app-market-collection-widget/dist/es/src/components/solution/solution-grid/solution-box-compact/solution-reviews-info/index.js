import * as React from 'react';
import * as style from './solution-reviews-info.scss';
import FavoriteFilledSmall from 'wix-ui-icons-common/FavoriteFilledSmall';
import { composer } from '../../../../../component-decorators/composer';
import { Text, Box } from 'wix-style-react';
export var SolutionReviewsInfo = composer()
    .withTranslation()
    .compose(function (_a) {
    var t = _a.t, reviews = _a.reviews;
    var noReviews = !reviews.numberOfReviews || reviews.numberOfReviews === 0;
    return (React.createElement(Box, { dataHook: "reviews-info", verticalAlign: "middle" },
        React.createElement(FavoriteFilledSmall, { color: noReviews ? 'rgba(22, 45, 61, 0.2)' : '#FDB10C', className: style.starIcon }),
        noReviews ? (React.createElement(Text, { "data-hook": "no-reviews", size: "tiny", weight: "thin", secondary: true, light: true }, "0")) : (React.createElement(Box, null,
            React.createElement(Text, { "data-hook": "average-rating", className: style.rating, size: "tiny", weight: "bold" }, Number(reviews.reviewStars).toFixed(1)),
            React.createElement(Text, { "data-hook": "total-reviews", size: "tiny", weight: "thin", secondary: true }, "(" + reviews.numberOfReviews + ")")))));
});
//# sourceMappingURL=index.js.map