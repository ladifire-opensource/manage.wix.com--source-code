import { __awaiter, __generator } from "tslib";
import { SET_PREMIUM_STATE } from './types';
import { PremiumState } from '../reducers/premium-state-reducer';
import * as wixRecorderMethods from '../services/wix-recorder-methods';
export var fetchPremiumState = function () { return function (dispatch, getState, _a) {
    var serverApi = _a.serverApi;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            serverApi.fetchPremiumState(getState().msid)
                .then(function (premiumState) {
                wixRecorderMethods.reportPremiumState(premiumState);
                return dispatch(fetchPremiumFinished(premiumState));
            })
                .catch(function () { return dispatch(fetchPremiumFinished(PremiumState.FREE)); });
            return [2 /*return*/];
        });
    });
}; };
export var fetchPremiumFinished = function (premiumState) {
    return ({ type: SET_PREMIUM_STATE, premiumState: premiumState });
};
//# sourceMappingURL=set-premium-state.js.map