import * as React from 'react';
import * as style from './solution-details.scss';
import { SolutionReviewsInfo } from '../solution-reviews-info';
import { composer } from '../../../../../component-decorators/composer';
import { Text, Box } from 'wix-style-react';
export var SolutionDetails = composer()
    .withTranslation()
    .withExperiments()
    .compose(function (_a) {
    var t = _a.t, teaser = _a.teaser, name = _a.name, reviews = _a.reviews, company = _a.company, experiments = _a.experiments, isCompany = _a.isCompany;
    company = company || t('solutionBox.solutionDetails.defaultCompanyName');
    var areReviews = true;
    if (experiments &&
        experiments.enabled('specs.marketplace.solutionBox.removeReviewRating')) {
        areReviews = false;
    }
    return (React.createElement("div", { className: style.heightSolutionDetail },
        React.createElement(Box, { className: style.titleCompany, height: isCompany ? '63px' : '48px', direction: 'vertical' },
            React.createElement(Text, { weight: "bold", className: style.madeforSolutionTitle }, name),
            isCompany && (React.createElement(Box, { marginBottom: "6px" },
                React.createElement(Text, { dataHook: "company-name", size: "tiny", weight: "thin", secondary: true, light: true }, t('solutionBox.solutionDetails.companyName', { company: company }))))),
        React.createElement(Box, { maxWidth: "280px", marginTop: "6px" },
            React.createElement(Text, { dataHook: "solution-teaser", size: "small", weight: "normal", skin: "standard", className: style.solutionTeaser }, teaser)),
        areReviews && React.createElement(SolutionReviewsInfo, { reviews: reviews })));
});
//# sourceMappingURL=index.js.map