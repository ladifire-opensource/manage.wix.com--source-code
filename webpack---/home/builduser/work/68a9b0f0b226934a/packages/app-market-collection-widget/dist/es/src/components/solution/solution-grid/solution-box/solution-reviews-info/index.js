import * as React from 'react';
import * as style from './solution-reviews-info.scss';
import StarFilled from 'wix-ui-icons-common/StarFilled';
import { composer } from '../../../../../component-decorators/composer';
import { Text, Box } from 'wix-style-react';
export var SolutionReviewsInfo = composer()
    .withTranslation()
    .withExperiments()
    .compose(function (_a) {
    var experiments = _a.experiments, t = _a.t, reviews = _a.reviews;
    var noReviews = !reviews.numberOfReviews || reviews.numberOfReviews === 0;
    var areReviews = true;
    if (experiments &&
        experiments.enabled('specs.marketplace.solutionBox.removeReviewRating')) {
        areReviews = false;
    }
    return (React.createElement(Box, { dataHook: "reviews-info", verticalAlign: "middle" },
        React.createElement(StarFilled, { color: noReviews ? 'rgba(22, 45, 61, 0.2)' : '#FDB10C', className: style.starIcon }),
        noReviews ? (React.createElement(Text, { "data-hook": "no-reviews", size: "small", weight: "normal", secondary: true, light: true }, t('solutionBox.solutionReviewsInfo.noReviews'))) : (React.createElement(Box, null,
            React.createElement(Text, { "data-hook": "average-rating", className: style.rating, size: "small", weight: "bold" }, Number(reviews.reviewStars).toFixed(1)),
            React.createElement(Text, { "data-hook": "total-reviews", size: "small", weight: "thin", secondary: true }, "(" + reviews.numberOfReviews + ")")))));
});
//# sourceMappingURL=index.js.map