const getEnvName = () => process.env.NODE_ENV || '';

export const isProduction = () =>
  getEnvName() !== 'development' && getEnvName() !== 'test';

export const getAppVersion = () => {
  // we are not actually accessing window here, it's replaced via webpack's define plugin
  if (isProduction()) {
    return window.__CI_APP_VERSION__.replace('-SNAPSHOT', '');
  }

  return 'test';
};
