import {ShippingApi} from './shippingApi';
import {onFieldChange, reportUnsupportedShippingRuleCurrency} from '@wix/business-settings-api';
import {configureHttpClient} from '@wix/wixstores-dashboard-storemanager-common/dist/src/common/services/axiosHttpClient/http-client';
import {InstanceResolver} from '@wix/wixstores-dashboard-storemanager-common/dist/src/common/services/axiosHttpClient/http';

export const REPORTED_APP_NAME = 'wixStores';

export function trackSettingsChange(instanceResolver: InstanceResolver) {
  onFieldChange(({changedField}) => onFieldChangeCallback(instanceResolver, changedField));
}

export async function onFieldChangeCallback(instanceResolver, changedField): Promise<void> {
  const {currency} = changedField;
  if (currency) {
    const rtcRule = await getRtcRules(instanceResolver);
    if (rtcRule.length) {
      reportUnsupportedShippingRuleCurrency({
        appName: REPORTED_APP_NAME,
        currency,
        serviceProvider: rtcRule[0].carrierType,
      });
    }
  }
}

export async function getRtcRules(instanceResolver: InstanceResolver): Promise<{carrierType: string}[]> {
  const currentBaseUrl = window.location.origin;
  const httpClient = configureHttpClient(currentBaseUrl, instanceResolver);
  const shippingApi = new ShippingApi(httpClient);
  const shippingRulesData = await shippingApi.getShippingRulesData();

  return shippingRulesData;
}
