import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { activeEntryReducer } from './reducers/active-entry-ids-reducer';
import { isHiddenReducer } from './reducers/is-hidden-reducer';
import { premiumStateReducer } from './reducers/premium-state-reducer';
import { badgesReducer } from './reducers/badges-reducer';
import { nodesReducer } from './reducers/nodes-reducer';
import { entriesReducer } from './reducers/entries-reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import * as wixRecorderMethods from './services/wix-recorder-methods';
export var configureStore = function (initialState, services, isDebug) {
    if (isDebug === void 0) { isDebug = false; }
    var selfReducer = function (state) {
        if (state === void 0) { state = null; }
        return state;
    };
    var roles = initialState.roles;
    wixRecorderMethods.reportRole(roles[0]);
    var rootReducer = combineReducers({
        nodes: nodesReducer,
        entries: entriesReducer,
        active: activeEntryReducer,
        roles: selfReducer,
        experiments: selfReducer,
        isOwner: selfReducer,
        permissions: selfReducer,
        locale: selfReducer,
        msid: selfReducer,
        premiumState: premiumStateReducer,
        biParams: selfReducer,
        badges: badgesReducer,
        isHidden: isHiddenReducer,
        isInDashboard: selfReducer,
        isInExpertsDashboard: selfReducer,
        liveSite: selfReducer
    });
    var appliedMiddleware = getMiddlewares(services, isDebug);
    return createStore(rootReducer, initialState, appliedMiddleware);
};
var getMiddlewares = function (services, isDebug) {
    var thunkMiddleware = thunk.withExtraArgument(services);
    if (isDebug) {
        return composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger()));
    }
    else {
        return applyMiddleware(thunkMiddleware);
    }
};
//# sourceMappingURL=configure-store.js.map