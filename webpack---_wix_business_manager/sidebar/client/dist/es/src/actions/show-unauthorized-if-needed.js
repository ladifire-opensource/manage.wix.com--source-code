import { callShowUnAuthorizedIfNeeded } from '../services/call-show-unauthorized';
import { experimentsSelectors } from '@wix/wix-experiments-redux';
export var showUnauthorizedIfNeeded = function () {
    return function (dispatch, getState, _a) {
        var findBestMatchingEntry = _a.findBestMatchingEntry;
        var state = getState();
        callShowUnAuthorizedIfNeeded(findBestMatchingEntry.findActiveEntry(state.entries, experimentsSelectors(state)), state);
    };
};
//# sourceMappingURL=show-unauthorized-if-needed.js.map