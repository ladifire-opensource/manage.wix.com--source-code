import { UPDATE_ENTRIES } from '../actions/types';
// Note: Raw entries are only saved in the store state to support 'showUnauthorizedPage' feature.
// For any other reason, nodes should be used.
export var entriesReducer = function (state, action) {
    if (state === void 0) { state = []; }
    return action.type === UPDATE_ENTRIES ? action.entries : state;
};
//# sourceMappingURL=entries-reducer.js.map