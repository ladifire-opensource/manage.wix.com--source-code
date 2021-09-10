import { SET_IS_HIDDEN } from '../actions/types';
export var isHiddenReducer = function (state, _a) {
    if (state === void 0) { state = false; }
    var type = _a.type, isHidden = _a.isHidden;
    return type === SET_IS_HIDDEN ? isHidden : state;
};
//# sourceMappingURL=is-hidden-reducer.js.map