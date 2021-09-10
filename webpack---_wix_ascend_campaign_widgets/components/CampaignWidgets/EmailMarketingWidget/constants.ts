import { BadgeSkin } from 'wix-style-react';
import { EmailMarketingCampaignStatus } from '../../../services/constants';

export const DATAHOOKS = {
  EmailMarketingWidgetRoot: 'email-marketing-widget.root',
  EmailMarketingWidgetStatus: 'email-marketing-widget.status',
  EmailMarketingWidgetDate: 'email-marketing-widget.date',
};

export const DEFAULT_CURRENCY = 'USD';

export const statusToSkinMapping: { [key: string]: BadgeSkin } = {
  [EmailMarketingCampaignStatus.SENT]: 'neutralSuccess',
  [EmailMarketingCampaignStatus.PUBLISHED]: 'neutralSuccess',
  [EmailMarketingCampaignStatus.NOT_SENT_TO_ALL]: 'warningLight',
  [EmailMarketingCampaignStatus.DECLINED]: 'neutralDanger',
  [EmailMarketingCampaignStatus.SENDING]: 'neutralStandard',
  [EmailMarketingCampaignStatus.IN_REVIEW]: 'neutralStandard',
};

export const EMAIL_WIDGET_NAME = 'ASCEND_CAMPAIGN_WIDGETS-EmailMarketingWidget';
