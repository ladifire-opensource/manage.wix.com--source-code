import { ModuleRegistry } from 'react-module-container';
import { ON_NAVIGATION } from '@wix/business-manager-api';

// TODO: After deprecation of resume, consider unifying with handler from navigateTo.ts
const buildPauseHandler = (navigate, pause) => {
  let isPaused = false;

  const resume = () => {
    if (isPaused) {
      navigate();
    }
    isPaused = false;
  };
  const deprecatedResumeFunctionDoNotUse = () => {
    isPaused = false;
    navigate();
  };
  const pauseNavigation = () => {
    pause();
    isPaused = true;
    return { resume };
  };

  return {
    deprecatedResumeFunctionDoNotUse,
    pauseNavigation
  };
};

export const initPauseNavigationListener = (basename: string, history: any, win: Window) => {
  win.document.addEventListener('click', (event) => {
    let element: any = event.target;
    while (element.tagName.toLowerCase() !== 'a') {
      element = element.parentElement;
      if (!element) {
        return;
      }
    }

    if (element.getAttribute('target') === '_blank' || event.defaultPrevented) {
      return;
    }

    const originalLink = element.getAttribute('href');
    const pauseNavigation = () => event.preventDefault();
    const navigate = () => {
      const isRelativeLink = originalLink.startsWith(basename);
      if (isRelativeLink) {
        history.push(originalLink.replace(basename, ''));
      } else {
        win.location.href = originalLink;
      }
    };
    const pauseHandler = buildPauseHandler(navigate, pauseNavigation);

    if (originalLink) {
      ModuleRegistry.notifyListeners(ON_NAVIGATION, pauseHandler.pauseNavigation, pauseHandler.deprecatedResumeFunctionDoNotUse);
    }
  });
};
