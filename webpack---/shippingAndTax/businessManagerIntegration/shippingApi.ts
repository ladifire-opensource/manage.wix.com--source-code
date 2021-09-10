import {ShippingRuleType} from '../shippingAndTaxDef';
import {Http} from '@wix/wixstores-dashboard-storemanager-common/dist/src/common/services/axiosHttpClient/http';

export const GET_SHIPPING_RULES_URL = '/_api/wix-ecommerce-renderer-web/store-manager/shipping-rules';

export class ShippingApi {
  constructor(private readonly httpClient: Http) {
    this.httpClient = httpClient;
  }

  public async getShippingRulesData() { //tslint:disable-line
    const {data}: {data: any} = await this.httpClient.get(GET_SHIPPING_RULES_URL);

    if (data.error) {
      return Promise.reject(data.error);
    }

    return data.rules.filter(rule => rule.ruleType === ShippingRuleType.RTC);
  }
}
