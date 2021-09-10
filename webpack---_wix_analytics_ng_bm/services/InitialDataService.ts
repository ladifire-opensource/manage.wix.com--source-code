import EventEmitter from 'eventemitter3';
import { isAppInstalled, appDefIds } from '@wix/business-manager-api';
import { ServiceProfileFields } from '@wix/analytics-ng-common';

import Api from '../utils/Api';
import { IInitialDataService } from '../types/types';

interface IInitialData {
  userProfile: any;
  hasBusinessPlan: boolean;
  isPremium: boolean;
  shouldConnectPaymentMethod: boolean;
}

export class InitialDataService extends EventEmitter implements IInitialDataService {
  _metaSiteId: string;
  _userId: string;

  constructor(metaSiteId: string, useerId: string) {
    super();
    this._metaSiteId = metaSiteId;
    this._userId = useerId;
  }

  async getInitialData(props: any): Promise<IInitialData> {
    if (props.siteSettings && props.profileSettings) {
      return this._formatSiteAndProfileSettings(props.siteSettings, props.profileSettings);
    }
    return this._requestInitialData();
  }

  _formatSiteAndProfileSettings(siteSettings, profileSettings) {
    const { hasBusinessPlan, isWebsitePremium, hasConnectedPayments } = siteSettings;
    const userProfile = {
      ...profileSettings,
      [ServiceProfileFields.hasInstalledStores]: isAppInstalled(appDefIds.wixECommerce),
    };
    return {
      userProfile,
      hasBusinessPlan,
      isPremium: isWebsitePremium,
      shouldConnectPaymentMethod: !hasConnectedPayments,
    };
  }

  async _requestInitialData(): Promise<any> {
    return Api.server()
      .getDashboardsSettings({})
      .then(({ siteSettings, profileSettings }) =>
        this._formatSiteAndProfileSettings(siteSettings, profileSettings),
      )
      .catch((error) => {
        this.emit('error', {
          metaSiteId: this._metaSiteId,
          userId: this._userId,
          error,
        });
        throw error;
      });
  }
}
