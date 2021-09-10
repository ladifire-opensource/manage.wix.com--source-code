import { BadgeSkin } from 'wix-style-react';
import { FacebookMarketingCampaignStatus } from '../../../services/constants';

export const DATAHOOKS = {
  FBMarketingWidgetRoot: 'facebook-marketing-widget.root',
  FBMarketingWidgetStatus: 'facebook-marketing-widget.status',
  FBMarketingWidgetDate: 'facebook-marketing-widget.date',
  FBMarketingWidgetAdSpend: 'facebook-marketing-widget.as-spend',
};

export const DEFAULT_CURRENCY = 'USD';

export const statusToSkinMapping: { [key: string]: BadgeSkin } = {
  [FacebookMarketingCampaignStatus.LIVE]: 'neutralSuccess',
  [FacebookMarketingCampaignStatus.PAUSED]: 'warningLight',
  [FacebookMarketingCampaignStatus.ERROR]: 'neutralDanger',
  [FacebookMarketingCampaignStatus.ENDED]: 'neutralStandard',
};

export const FB_WIDGET_NAME = 'ASCEND_CAMPAIGN_WIDGETS-FBMarketingWidget';
