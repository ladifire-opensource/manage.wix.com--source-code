import * as React from 'react';
import { composer } from '../../../component-decorators/composer';
import { Card, Box, TextButton } from 'wix-style-react';
export var HeaderSection = composer()
    .withTranslation()
    .compose(function (_a) {
    var t = _a.t, showAllClick = _a.showAllClick;
    return (React.createElement(React.Fragment, null,
        React.createElement(Card.Header, { title: t('app-recommendations.header-section.title'), subtitle: t('app-recommendations.header-section.sub-title'), suffix: React.createElement(Box, null,
                React.createElement(TextButton, { size: "medium", weight: "thin", onClick: function () { return showAllClick(); } }, t('app-recommendations.header-section.see-all'))) }),
        React.createElement(Card.Divider, null)));
});
//# sourceMappingURL=index.js.map