import {
  CrmFinancialSettings,
  GetDesignSettingsResponse, GetGeneralSettingsResponse,
} from '@wix/ambassador-crm-financial-settings/http';
import * as _ from 'lodash';
export const crmFinancialSettingsBaseUrl = '/_api/crm-financial-settings/';
export const HTTP_CLIENT_CONFIG = { ignoredProtoHttpUrlPart: '/api' };

export class GeneralSettingsApi {
  private readonly generalSettingsService;
  private readonly instance;

  constructor({ instance }) {
    this.generalSettingsService = CrmFinancialSettings(crmFinancialSettingsBaseUrl, HTTP_CLIENT_CONFIG);
    this.instance = instance;
  }

  shouldDisplayAscendBrand = async (): Promise<boolean> => {
    try {
      const
        response
          : GetDesignSettingsResponse = await this.generalSettingsService.DesignSettingsService()({ Authorization: this.instance })
        .getDesignSettings({});

      return _.get(response, 'designSettings.displayDefaultBrandingLogo');
    } catch (e) {
      console.error(`Failed to get ascend brand: ${e}`);
    }
    return false;
  };

  getCurrency = async (): Promise<{ currency: string }> => {
    const response: GetGeneralSettingsResponse = await this.generalSettingsService.GeneralSettingsService()({ Authorization: this.instance })
      .getGeneralSettings({ fields: ['currency',] });
    return { currency: response?.generalSettings?.currency };
  };

  getGeneralSettingsOld = async (): Promise<{ netPlus: number }> => {
    const NET_PLUS_DEFAULT = 30;
    try {
      const response: GetGeneralSettingsResponse = await this.generalSettingsService.GeneralSettingsService()({ Authorization: this.instance })
        .getGeneralSettings({
          fields: [
            'financial_document_template.date_policy',
          ],
        });
      
      return {
        netPlus: _.get(response, 'generalSettings.financialDocumentTemplate.datePolicy.netPlusDays', NET_PLUS_DEFAULT),
      };
    } catch (e) {
      console.error(`Failed to fetch general settings: ${e}`);
    }
    return { netPlus: NET_PLUS_DEFAULT };
  };

  getGeneralSettings = async (): Promise<{ netPlus: number }> => {
    const NET_PLUS_DEFAULT = 30;
    try {
      const response: GetGeneralSettingsResponse = await this.generalSettingsService.GeneralSettingsService()({ Authorization: this.instance })
        .getGeneralSettings({
          fields: [
            'net_plus_days_payment_policy',
          ],
        });

      return {
        netPlus: _.get(response, 'generalSettings.netPlusDaysPaymentPolicy', NET_PLUS_DEFAULT),
      };
    } catch (e) {
      console.error(`Failed to fetch general settings: ${e}`);
    }
    return { netPlus: NET_PLUS_DEFAULT };
  };
}