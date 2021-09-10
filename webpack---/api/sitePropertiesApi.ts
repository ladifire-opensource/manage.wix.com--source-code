import {
  PropertiesUpdateRequest,
  SitePropertiesService,
} from '@wix/ambassador-site-properties-service/http';
import { appDefIds, getCurrentInstance } from '@wix/business-manager-api';

const getSitePropertiesService = () => {
  const instance = getCurrentInstance(appDefIds.invoices);
  return SitePropertiesService(
    '/_api/site-properties-service/',
  ).SitePropertiesV4()({
    Authorization: instance,
  });
};

export const getSiteProperties = () => {
  return getSitePropertiesService().read({});
};

export interface SetSitePropertiesArgs {
  logo?: string;
  email?: string;
  businessName?: string;
}
export const setSiteProperties = (args: PropertiesUpdateRequest) => {
  return getSitePropertiesService().update({
    ...args,
  });
};
