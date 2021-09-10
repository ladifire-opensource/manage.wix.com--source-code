import { Logger } from '@wix/bi-logger-promote-component';
import { getReferralInfo } from '.';
import {
  EmailMarketingInfo,
  FacebookMarketingInfo,
  FacebookMarketingInsights,
} from '../services/interfaces';
import { TimeFrame } from './time-range';

export type WidgetName = string;
type Product = 'FB_ADS' | 'EM';
type CTAType =
  | 'EMPTY_STATE'
  | 'SEE_MORE_STATS'
  | 'OPEN_MARKETING_HOME'
  | 'TIMEFRAME_SELECTOR';
type ClickName = 'see-all' | 'marketing-home' | 'add-new' | 'select-timeframe';

export const buildEmailMarketingBIStats = (
  emailMarketingInfo?: EmailMarketingInfo,
) => {
  const storeStats = {
    orders: 0,
    revenue: 0,
  };
  if (emailMarketingInfo?.storeStats) {
    storeStats.orders = emailMarketingInfo?.storeStats.orders.valueInt;
    storeStats.revenue = emailMarketingInfo?.storeStats.revenue.valueDecimal;
  }
  return {
    delivered: emailMarketingInfo?.delivered ?? 0,
    opened: emailMarketingInfo?.opened ?? 0,
    clicked: emailMarketingInfo?.clicked ?? 0,
    landingPageOpened: emailMarketingInfo?.landingPageOpened ?? 0,
    landingPageClicked: emailMarketingInfo?.landingPageClicked ?? 0,
    ...storeStats,
  };
};

export default class BiEventsFactory {
  private biLogger: Logger;
  constructor(biLogger: Logger, metaSiteId: string) {
    biLogger.util.updateDefaults({
      msid: metaSiteId,
      referral_info: getReferralInfo(),
      location: 'BM',
    });
    this.biLogger = biLogger;
  }

  public emailMarketingWidgetViewed(emailMarketingInfo?: EmailMarketingInfo) {
    this.biLogger.promoteCampaignsWidgetViewed({
      em_campaign_stats: emailMarketingInfo
        ? JSON.stringify(buildEmailMarketingBIStats(emailMarketingInfo))
        : JSON.stringify({}),
      em_campaign_status: emailMarketingInfo?.status.toLowerCase() ?? 'empty',
    });
  }

  public emailMarketingWidgetLoaded(emailMarketingInfo?: EmailMarketingInfo) {
    this.biLogger.promoteCampaignsWidgetLoad({
      em_campaign_stats: emailMarketingInfo
        ? JSON.stringify(buildEmailMarketingBIStats(emailMarketingInfo))
        : JSON.stringify({}),
      em_campaign_status: emailMarketingInfo?.status.toLowerCase() ?? 'empty',
    });
  }

  public widgetEmptyStateLoaded(viewMode: string, widget_name: WidgetName) {
    this.biLogger.widgetLoadedInEmptyState({
      hosting: viewMode,
      widget_name,
    });
  }

  public facebookMarketingWidgetViewed(
    facebookMarketingInfo?: FacebookMarketingInfo,
  ) {
    this.biLogger.promoteCampaignsWidgetViewed({
      fb_ads_campaign_status:
        facebookMarketingInfo?.campaignInfo.status?.toLowerCase() ?? 'empty',
      fb_ads_campaign_stats: facebookMarketingInfo
        ? JSON.stringify(facebookMarketingInfo.insights)
        : JSON.stringify({}),
    });
  }

  public facebookMarketingWidgetLoaded(
    facebookMarketingInfo?: FacebookMarketingInfo,
  ) {
    this.biLogger.promoteCampaignsWidgetLoad({
      fb_ads_campaign_status:
        facebookMarketingInfo?.campaignInfo.status?.toLowerCase() || 'empty',
      fb_ads_campaign_stats: facebookMarketingInfo
        ? JSON.stringify(facebookMarketingInfo.insights)
        : JSON.stringify({}),
    });
  }

  public emailMarketingCtaClick(
    ctaType: CTAType,
    emailMarketingInfo?: EmailMarketingInfo,
  ) {
    this.widgetCtaClick(
      'EM',
      ctaType,
      emailMarketingInfo?.campaignId,
      emailMarketingInfo
        ? JSON.stringify(buildEmailMarketingBIStats(emailMarketingInfo))
        : undefined,
    );
  }

  public facebookMarketingCtaClick(
    ctaType: CTAType | TimeFrame,
    insights?: FacebookMarketingInsights,
    campaignId?: string,
  ) {
    this.widgetCtaClick(
      'FB_ADS',
      ctaType,
      campaignId,
      insights ? JSON.stringify(insights) : undefined,
    );
  }

  public emailMarketingLoadFailure(error: any) {
    this.widgetLoadFailure('EM', error);
  }

  public facebookMarketingLoadFailure(error: any) {
    this.widgetLoadFailure('FB_ADS', error);
  }

  public tooltipShown(
    tooltipName: string,
    viewMode: string,
    widget_name: WidgetName,
  ) {
    this.biLogger.tooltipShown({
      name: tooltipName,
      hosting: viewMode,
      widget_name,
    });
  }

  public clickInWidget(
    clickName: ClickName,
    viewMode: string,
    widget_name: WidgetName,
  ) {
    this.biLogger.clickInWidget({
      click_name: clickName,
      hosting: viewMode,
      widget_name,
    });
  }

  private widgetLoadFailure(product: Product, error: any) {
    this.biLogger.promoteCampaignsWidgetLoadFailure({
      product,
      error_data: JSON.stringify(error, Object.getOwnPropertyNames(error)),
    });
  }

  private widgetCtaClick(
    product: Product,
    ctaType: string,
    campaignId?: string,
    campaignStats?: string,
  ) {
    this.biLogger.promoteCampaignsWidgetCtaClick({
      product,
      cta_type: ctaType,
      campaign_id: campaignId,
      campaign_stats: campaignStats,
    });
  }
}
