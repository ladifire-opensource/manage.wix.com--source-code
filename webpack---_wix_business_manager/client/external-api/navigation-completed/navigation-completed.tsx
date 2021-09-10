import { ModuleRegistry } from 'react-module-container';
import { History, Location } from 'history';
import { ON_NAVIGATION_COMPLETED } from '@wix/business-manager-api';

export const initNavigationCompletedListener = (history: History) => {
  history.listen((nextLocation: Location) => {
    if (nextLocation.action !== 'POP') {
      setTimeout(() => ModuleRegistry.notifyListeners(ON_NAVIGATION_COMPLETED, nextLocation), 0);
    } else {
      setTimeout(() => ModuleRegistry.notifyListeners('businessManager.backButtonClicked', nextLocation), 0);
    }
  });
};
