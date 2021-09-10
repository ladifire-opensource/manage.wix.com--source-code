import { SET_ACTIVE_ENTRY } from '../actions/types';
import { ROOT_ENTRY_ID } from '../services/convert-entries-to-nodes';
var defaultValue = { previous: null, current: ROOT_ENTRY_ID };
export var activeEntryReducer = function (state, _a) {
    if (state === void 0) { state = defaultValue; }
    var type = _a.type, activeId = _a.activeId, currentPageId = _a.currentPageId;
    var current = state.current;
    if (type !== SET_ACTIVE_ENTRY || activeId === current) {
        return state;
    }
    return {
        current: activeId,
        previous: current,
        currentPageId: currentPageId
    };
};
//# sourceMappingURL=active-entry-ids-reducer.js.map