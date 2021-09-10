import { getDashboardUrl } from '@wix/business-manager-api';
import { ActionLink } from '@wix/notifications-widget-common/types/notifications';
import Experiments from '@wix/wix-experiments';

const EMPTY_APP_STATE = '';

export const getBusinessManagerLink = (actionLink: ActionLink, metaSiteId: string, referrer: string, experiments: Experiments): string => {
  const appDefId = actionLink.module.pageComponentId;
  const appState = trimLeadingSlash(actionLink.module.contextData.appState || EMPTY_APP_STATE);
  const referralInfo = referrer;
  return getDashboardUrl({ metaSiteId, appDefId, appState, referralInfo });
};

const isAppDefId = (pageComponentId: string): boolean => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(pageComponentId);

const trimLeadingSlash = (path: string): string => path[0] === '/' ? path.substr(1) : path;

const appendQueryStringParam = (url: string, key: string, value: string): string => {
  const suffix = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
  return url.includes('?') ? `${url}&${suffix}` : `${url}?${suffix}`;
};
