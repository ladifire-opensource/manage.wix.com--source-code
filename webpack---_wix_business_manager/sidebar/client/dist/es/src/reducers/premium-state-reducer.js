import { SET_PREMIUM_STATE } from '../actions/types';
export var PremiumState;
(function (PremiumState) {
    PremiumState["FREE"] = "FREE";
    PremiumState["PREMIUM"] = "PREMIUM";
    PremiumState["PREMIUM_MAX"] = "PREMIUM_MAX_PLAN";
    PremiumState["UNDETERMINED"] = "UNDETERMINED";
})(PremiumState || (PremiumState = {}));
export var premiumStateReducer = function (state, _a) {
    if (state === void 0) { state = PremiumState.UNDETERMINED; }
    var type = _a.type, premiumState = _a.premiumState;
    return type === SET_PREMIUM_STATE ? premiumState : state;
};
//# sourceMappingURL=premium-state-reducer.js.map