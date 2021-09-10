import { AppMarketWidget, } from '@wix/marketplace-interfaces';
export var getSolutionsBiData = function (solutions, msid) {
    return solutions === null || solutions === void 0 ? void 0 : solutions.map(function (solution, index) {
        return {
            impressionType: 'box',
            index: index,
            market: 'dashboard',
            msid: msid,
            tagType: AppMarketWidget.FINANCE_INTEGRATIONS,
            appId: solution.id,
            widgetReferrer: AppMarketWidget.FINANCE_INTEGRATIONS,
        };
    });
};
//# sourceMappingURL=common.js.map