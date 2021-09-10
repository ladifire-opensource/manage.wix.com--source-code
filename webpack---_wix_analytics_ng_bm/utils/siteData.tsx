import { getBusinessSettings } from '@wix/business-settings-api';
import { appDefIds, isAppInstalled } from '@wix/business-manager-api';
import { compact } from 'lodash';

import { sentryClient } from './sentry-client';

export const getCurrency = async (metaSiteId: string): Promise<string> => {
  try {
    const { currency } = await getBusinessSettings(metaSiteId);

    if (currency === '') {
      return 'USD';
    }
    return currency;
  } catch (error) {
    sentryClient.captureException(error, {
      data: {
        file: 'siteData',
        type: 'BM API',
        methods: ['getBusinessSettings'],
        metaSiteId,
      },
    });
    return 'USD';
  }
};

export const getScopes = (): string[] => {
  return compact(
    Object.keys(appDefIds).map((key) => (isAppInstalled(appDefIds[key]) ? key : null)),
  );
};

export const getDomain = () => {
  const wwwWix = 'https://www.wix.com';
  const wwwEditorX = 'https://www.editorx.com';
  const manageWix = 'https://manage.wix.com';
  const manageEditorX = 'https://manage.editorx.com';

  if (location.href.startsWith(wwwWix)) {
    return wwwWix;
  }
  if (location.href.startsWith(wwwEditorX)) {
    return wwwEditorX;
  }
  if (location.href.startsWith(manageWix)) {
    return manageWix;
  }
  if (location.href.startsWith(manageEditorX)) {
    return manageEditorX;
  }
};
