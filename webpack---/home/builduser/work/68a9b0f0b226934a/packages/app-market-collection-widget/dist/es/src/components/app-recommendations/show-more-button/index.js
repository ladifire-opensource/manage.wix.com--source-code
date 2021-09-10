import * as React from 'react';
import { composer } from '../../../component-decorators/composer';
import { Box, TextButton } from 'wix-style-react';
import * as style from '../app-recommendations.scss';
export var ShowMoreButton = composer()
    .withTranslation()
    .compose(function (_a) {
    var t = _a.t, numOfMore = _a.numOfMore, handleShowMoreClick = _a.handleShowMoreClick;
    return (React.createElement("div", { onClick: function () { return handleShowMoreClick(); } },
        React.createElement(Box, { align: "center", className: style.boxWrapper, padding: "13px 0" },
            React.createElement(TextButton, { size: "small", weight: "thin" },
                t('app-recommendations.show-more-button.more-apps'),
                " (",
                numOfMore,
                ")"))));
});
//# sourceMappingURL=index.js.map