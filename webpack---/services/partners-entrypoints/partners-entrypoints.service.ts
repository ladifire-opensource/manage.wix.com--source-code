import { PartnersEntrypoints } from '@wix/ambassador-partners-entrypoints/http';
import { appDefIds, getCurrentInstance, Brand } from '@wix/business-manager-api';

export const PARTNERS_ENTRYPOINTS_API_BASE_URL = '/_api/partners-entrypoints/';

export const HELP_WIDGET_ENTRY_POINT_NAME = 'dashboard-help-widget';
export const EDITOR_X_HELP_WIDGET_ENTRY_POINT_NAME = 'editorx-dashboard-help-widget';

const service = PartnersEntrypoints(PARTNERS_ENTRYPOINTS_API_BASE_URL, {
  ignoredProtoHttpUrlPart: '/api',
}).EntryPointsServer();

export const getPartnersUrl = async (brand: Brand): Promise<string> => {
  try {
    const partnersEntryPoint = await service(getAuthorizationHeader()).getUrlForEntryPoint({
      entryPointName:
        brand === Brand.EDITORX
          ? EDITOR_X_HELP_WIDGET_ENTRY_POINT_NAME
          : HELP_WIDGET_ENTRY_POINT_NAME,
    });
    return partnersEntryPoint?.url || '';
  } catch (error) {
    throw new Error(error);
  }
};

export const getAuthorizationHeader = (): {
  Authorization: string;
} => ({
  Authorization: getCurrentInstance(appDefIds.metaSite),
});
