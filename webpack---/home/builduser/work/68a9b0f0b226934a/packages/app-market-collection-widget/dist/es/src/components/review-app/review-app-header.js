import * as React from 'react';
import { Box, Heading, Image, Text } from 'wix-style-react';
function ReviewAppHeader(_a) {
    var appName = _a.appName, appIconSrc = _a.appIconSrc, t = _a.t;
    var headerTitle = t('review-app.header-title');
    var headerDescription = t('review-app.header-description', { appName: appName });
    return (React.createElement(Box, null,
        React.createElement(Box, { minWidth: "60px", width: "60px", height: "60px" },
            React.createElement(Image, { src: appIconSrc, alt: appName + " icon" })),
        React.createElement(Box, { maxWidth: "450px", marginLeft: "18px", direction: "vertical" },
            React.createElement(Heading, { appearance: "H2" }, headerTitle),
            React.createElement(Text, { secondary: true }, headerDescription))));
}
export { ReviewAppHeader };
//# sourceMappingURL=review-app-header.js.map