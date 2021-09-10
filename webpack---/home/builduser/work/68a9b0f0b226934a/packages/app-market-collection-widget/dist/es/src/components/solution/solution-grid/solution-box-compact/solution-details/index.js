import * as React from 'react';
import * as style from './solution-details.scss';
import { composer } from '../../../../../component-decorators/composer';
import { Text, Box } from 'wix-style-react';
export var SolutionDetails = composer()
    .compose(function (_a) {
    var teaser = _a.teaser, name = _a.name;
    return (React.createElement("div", { className: style.solutionDetail },
        React.createElement(Box, { className: style.titleCompany, direction: 'vertical' },
            React.createElement(Text, { weight: "bold" }, name)),
        React.createElement(Box, { maxWidth: "260px", marginTop: "6px" },
            React.createElement(Text, { dataHook: "solution-teaser", size: "small", weight: "thin", className: style.solutionTeaser }, teaser))));
});
//# sourceMappingURL=index.js.map