import { get } from 'lodash';
import { appDefIds, getCurrentInstance } from '@wix/business-manager-api';
import { AppSettingsService, Host } from '@wix/ambassador-app-settings-service/http';

export class ConsentPolicyBannerService {
  readonly baseUrl = '/_api/app-settings-service';

  private readonly service = AppSettingsService(this.baseUrl).AppSettingsService()({
    Authorization: getCurrentInstance(appDefIds.consentPolicyBanner),
  });

  constructor(private readonly isSitePublished: boolean) {}

  getSettings = () => {
    return this.service.getComponentSettings({
      componentId: appDefIds.consentPolicyBanner,
      host: Host.BUSINESS_MANAGER,
    });
  };

  getIsAppEnabled = async (): Promise<boolean> => {
    if (!this.isSitePublished) {
      return null;
    }

    try {
      const response = await this.getSettings();

      return !!get(response, ['settings', 'appEnabled']);
    } catch (e) {
      // handle 401 when site settings not configured
      return null;
    }
  };
}
