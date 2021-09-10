import { ModuleId, appDefIds } from '@wix/business-manager-api';

import { StoreService } from './services';

import {
  IIntegrationWithModuleConfig,
  IIntegrationWithoutModuleConfig,
} from './types/types';

const StatsIntegrationsWithModules: IIntegrationWithModuleConfig[] = [
  {
    moduleID: ModuleId.Stores,
    appDefId: appDefIds.wixECommerce,
    id: 'stores',
    experiments: [
      {
        key: 'specs.analytics-ng.LimitOldAnalytics',
        value: false,
      },
    ],
    checkPremium: instance =>
      StoreService.getInfo(instance).then(({ isPremium }) => isPremium),
  },
  {
    moduleID: ModuleId.SocialBlog,
    appDefId: appDefIds.socialBlog,
    id: 'blogs',
    experiments: [
      {
        key: 'specs.analytics-ng.LimitOldAnalytics',
        value: false,
      },
    ],
  },
  {
    moduleID: ModuleId.Bookings,
    appDefId: appDefIds.wixBookings,
    id: 'bookings',
    experiments: [
      {
        key: 'specs.analytics-ng.LimitOldAnalytics',
        value: false,
      },
    ],
  },
  {
    moduleID: ModuleId.Video,
    appDefId: appDefIds.video,
    id: 'video',
  },
  {
    moduleID: ModuleId.MusicManager,
    appDefId: appDefIds.wixMusic,
    id: 'music',
  },
];

const StatsIntegrations: IIntegrationWithoutModuleConfig[] = [
  {
    id: 'traffic',
    experiments: [
      {
        key: 'specs.analytics-ng.LimitOldAnalytics',
        value: false,
      },
    ],
  },
];

export { StatsIntegrations, StatsIntegrationsWithModules };
