import { INavigateToPageConfig } from '@wix/business-manager-api';

export const extendConfigWithReferrer = (config: INavigateToPageConfig, referrer: string) => {
  return {
    ...config,
    contextData: {
      ...config.contextData,
      referrer
    }
  };
};

export const openInANewTab = (url) => {
  window.open(url);
};
