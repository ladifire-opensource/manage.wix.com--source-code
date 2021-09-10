import { __decorate, __extends } from "tslib";
import * as React from 'react';
import { SolutionGridLayout, } from '@wix/marketplace-interfaces';
import { sendAddMoreAppsClickBi } from '../../../bi/events';
import { Page, Button } from 'wix-style-react';
import { withExperiments } from '../../../component-decorators/with-experiments';
import { withTranslation } from '../../../component-decorators/with-translation';
import { ChangeLocationModalContainer } from '../../modals/change-location-modal/change-location-modal-container';
import { SolutionGrid } from '../solution-grid';
var SolutionGridWithHeader = /** @class */ (function (_super) {
    __extends(SolutionGridWithHeader, _super);
    function SolutionGridWithHeader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SolutionGridWithHeader.prototype.render = function () {
        var _a;
        var _b = this.props, t = _b.t, solutions = _b.solutions, solutionsBiData = _b.solutionsBiData, onBoxClick = _b.onBoxClick, onButtonClick = _b.onButtonClick, onBoxRender = _b.onBoxRender, onGoToMarketClick = _b.onGoToMarketClick, as = _b.as, countries = _b.countries, displayedCountry = _b.displayedCountry, updateDisplayedCountry = _b.updateDisplayedCountry, children = _b.children;
        return (React.createElement("div", { style: { overflow: 'scroll' } },
            React.createElement(Page, { height: "100vh" },
                React.createElement(Page.Header, { subtitle: t('collection.subtitle'), title: t('collection.title'), actionsBar: React.createElement(Button, { onClick: function () {
                            sendAddMoreAppsClickBi(solutionsBiData[0]);
                            onGoToMarketClick();
                        } }, t('collection.market.cta')) }),
                React.createElement(Page.Content, null,
                    displayedCountry && countries && updateDisplayedCountry ? (React.createElement(ChangeLocationModalContainer, { displayedCountry: displayedCountry, countries: countries, updateDisplayedCountry: updateDisplayedCountry })) : (''),
                    React.createElement(SolutionGrid, { solutions: solutions, solutionsBiData: solutionsBiData, isCompany: !((_a = this.props.experiments) === null || _a === void 0 ? void 0 : _a.enabled('specs.marketplace.hideDevName')), layout: SolutionGridLayout.INTEGRATIONS, as: as, onButtonClick: onButtonClick, onBoxRender: onBoxRender, onBoxClick: onBoxClick, useNewBox: true }),
                    children))));
    };
    SolutionGridWithHeader = __decorate([
        withExperiments,
        withTranslation
    ], SolutionGridWithHeader);
    return SolutionGridWithHeader;
}(React.Component));
export { SolutionGridWithHeader };
//# sourceMappingURL=index.js.map