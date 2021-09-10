import * as React from 'react';
import { Button } from 'wix-style-react';
import { composer } from '../../../component-decorators/composer';
import * as style from './solution-button-action.scss';
export var SolutionButtonAction = composer()
    .withTranslation()
    .withExperiments()
    .compose(function (_a) {
    var t = _a.t, onAddClick = _a.onAddClick, experiments = _a.experiments;
    var ctaKey = 'solutionBox.solutionBottomActionBar.add';
    return (React.createElement("span", { className: style.addButton },
        React.createElement(Button, { as: "button", onClick: onAddClick, priority: "secondary", size: "small" }, t(ctaKey))));
});
//# sourceMappingURL=index.js.map