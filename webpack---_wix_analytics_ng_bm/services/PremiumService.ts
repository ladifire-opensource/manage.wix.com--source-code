import EventEmitter from 'eventemitter3';
import { AxiosInstance } from 'axios';

import { IPremiumService, PremiumSiteStatus } from '../types/types';
import Api from '../utils/Api';

export class PremiumService extends EventEmitter implements IPremiumService {
  _axios: AxiosInstance;
  _metaSiteId: string;

  constructor(metaSiteId: string, axios: AxiosInstance) {
    super();
    this._metaSiteId = metaSiteId;
    this._axios = axios;
  }

  _getSitePremiumStatus(): Promise<PremiumSiteStatus> {
    return this._axios
      .get(`/_api/premium-store/plans/premiumStatus`, {
        params: {
          metaSiteId: this._metaSiteId,
        },
      })
      .then((res) => {
        const { data } = res;
        const state: PremiumSiteStatus = data.payload.premiumState;
        return state;
      })
      .catch((error) => {
        this.emit('error', { metaSiteId: this._metaSiteId, error });
        throw error;
      });
  }

  async isFreeSite(): Promise<boolean> {
    const state = await this._getSitePremiumStatus();
    return state === PremiumSiteStatus.FREE;
  }

  getDashboardsPermissions() {
    return Api.server().getDashboardsPermissions({});
  }
}
