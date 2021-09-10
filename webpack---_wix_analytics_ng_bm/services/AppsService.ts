import { isAppInstalled, appDefIds } from '@wix/business-manager-api';

import { IAppsService } from '../types/types';

export class AppsService implements IAppsService {
  isBlogInstalled(): boolean {
    return isAppInstalled(appDefIds.socialBlog);
  }

  isBookingsInstalled(): boolean {
    return isAppInstalled(appDefIds.wixBookings);
  }
}
