import * as Sentry from '@sentry/browser';

const reportError = (error) => {
  console.error(error); // tslint:disable-line:no-console
  Sentry.captureMessage(error);
};

const loadScript = (src: string, crossOrigin: boolean): Promise<void> => new Promise(resolve => {
  const script = document.createElement('script');
  script.onload = () => resolve();
  script.onerror = (event) => {
    reportError(`Error loading bundle script ${script.src}`);
    resolve();
  };

  if (crossOrigin) {
    script.crossOrigin = 'anonymous';
  }

  script.src = src;
  document.head.appendChild(script);
});

export const loadModulesFiles = (modulesFiles) => {
  return Promise.all(modulesFiles.map(({ url, crossOrigin }) => loadScript(url, crossOrigin)));
};
