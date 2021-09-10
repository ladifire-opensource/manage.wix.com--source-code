import { onNavigationCompleted } from '@wix/business-manager-api';
import { updateSidebarState } from './update-active-id';
import { setIsHidden } from './set-is-hidden';
import { ModuleRegistry } from 'react-module-container';
export var updateSidebarOnNavigation = function () { return function (dispatch) {
    dispatch(updateSidebarOnNavigationComplete());
    dispatch(updateSidebarOnBackButtonClick());
}; };
var updateSidebarOnNavigationComplete = function () { return function (dispatch) {
    onNavigationCompleted(function () {
        dispatch(updateSidebarState());
        dispatch(setIsHidden(false));
    });
}; };
var updateSidebarOnBackButtonClick = function () { return function (dispatch) {
    ModuleRegistry.addListener('businessManager.backButtonClicked', function () { return dispatch(updateSidebarState()); });
}; };
//# sourceMappingURL=update-sidebar-on-navigation.js.map