import { registerWidget } from '@wix/business-dashboard-api';

export const init = () => {
  registerWidget({
    widgetId: 'ASCEND_CAMPAIGN_WIDGETS-EmailMarketingWidget',
    bmComponentName: 'ascend-email-marketing-widget',
  });

  registerWidget({
    widgetId: 'ASCEND_CAMPAIGN_WIDGETS-FBMarketingWidget',
    bmComponentName: 'ascend-fb-marketing-widget',
  });
};
