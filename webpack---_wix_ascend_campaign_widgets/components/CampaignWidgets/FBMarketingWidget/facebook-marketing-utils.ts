import { TFunction } from '@wix/yoshi-flow-bm';
import { navigateTo, PageComponentId } from '@wix/business-manager-api';
import {
  FacebookMarketingCampaignIntent,
  FacebookMarketingCampaignStatus,
  FacebookMarketingCampaignStatusType,
} from '../../../services/constants';
import { FacebookMarketingInsights } from '../../../services/interfaces';
import { CampaignWidgetNotification } from '../CampaignWidget/WidgetNotification';
import { StatItem } from '../CampaignWidget/WidgetStats';
import BiEventsFactory, { WidgetName } from '../../../utils/bi-events';
import { FB_WIDGET_NAME } from './constants';
import Formatter from '../../../utils/formatters';
import { DataCapsule, LocalStorageStrategy } from 'data-capsule';
import { TimeFrame, TimeRange } from '../../../utils/time-range';

const widget_name: WidgetName = FB_WIDGET_NAME;
export const buildStats = (
  status: FacebookMarketingCampaignStatusType,
  intent: FacebookMarketingCampaignIntent,
  insights: FacebookMarketingInsights,
  currency: string,
  spent: number,
  balance: number,
  locale: string,
  viewMode: string,
  t: TFunction,
  biEvents: BiEventsFactory,
  shouldCheckIntent: boolean,
  showAdSpendInStats: boolean,
): StatItem[] => {
  const formatter = new Formatter(locale);
  const { stats } = insights;
  const totalViewsStat = {
    label: t('campaign-widget.facebook-marketing.stats.total-views'),
    value: stats.totalViews ? formatter.formatAsNumber(stats.totalViews) : '-',
    tooltip: t('campaign-widget.facebook-marketing.stats.total-views.tooltip'),
    onShowTooltip: () =>
      biEvents.tooltipShown('total-views', viewMode, widget_name),
  };

  const totalClicksStat = {
    label: t('campaign-widget.facebook-marketing.stats.total-clicks'),
    value: stats.totalClicks
      ? formatter.formatAsNumber(stats.totalClicks)
      : '-',
    tooltip: t('campaign-widget.facebook-marketing.stats.total-clicks.tooltip'),
    onShowTooltip: () =>
      biEvents.tooltipShown('total-clicks', viewMode, widget_name),
  };

  const peopleReachedStat = {
    label: t('campaign-widget.facebook-marketing.stats.people-reached'),
    value: stats.peopleReached
      ? formatter.formatAsNumber(stats.peopleReached)
      : '-',
    tooltip: t(
      'campaign-widget.facebook-marketing.stats.people-reached.tooltip',
    ),
    onShowTooltip: () =>
      biEvents.tooltipShown('people-reached', viewMode, widget_name),
  };

  const siteVisitsStat = {
    label: t('campaign-widget.facebook-marketing.stats.site-visits'),
    value: stats.siteVisits ? formatter.formatAsNumber(stats.siteVisits) : '-',
    tooltip: t('campaign-widget.facebook-marketing.stats.site-visits.tooltip'),
    onShowTooltip: () =>
      biEvents.tooltipShown('site-visits', viewMode, widget_name),
  };

  const purchasesStat = {
    label: t('campaign-widget.facebook-marketing.stats.orders'),
    value: stats.purchases ? formatter.formatAsNumber(stats.purchases) : '-',
    tooltip: t('campaign-widget.facebook-marketing.stats.orders.tooltip'),
    onShowTooltip: () => biEvents.tooltipShown('orders', viewMode, widget_name),
  };

  const revenueStat = {
    label: t('campaign-widget.facebook-marketing.stats.revenue'),
    value: stats.revenues
      ? formatter.formatCurrency(currency, stats.revenues)
      : '-',
    tooltip: t('campaign-widget.facebook-marketing.stats.revenue.tooltip'),
    onShowTooltip: () =>
      biEvents.tooltipShown('revenue', viewMode, widget_name),
  };

  const roasStat = {
    label: t('campaign-widget.facebook-marketing.stats.roas'),
    value: stats.roas
      ? formatter.formatStrictPercent(Math.floor(stats.roas))
      : '-',
    tooltip: t('campaign-widget.facebook-marketing.stats.roas.tooltip'),
    onShowTooltip: () => biEvents.tooltipShown('roas', viewMode, widget_name),
  };

  const bookingsStat = {
    label: t('campaign-widget.facebook-marketing.stats.bookings'),
    value: stats.bookings
      ? formatter.formatAsNumber(Math.floor(stats.bookings))
      : '-',
    tooltip: t('campaign-widget.facebook-marketing.stats.bookings.tooltip'),
    onShowTooltip: () =>
      biEvents.tooltipShown('bookings', viewMode, widget_name),
  };

  const isLive = status === 'live';

  const adSpendStat = {
    label: t(
      `campaign-widget.facebook-marketing.stats.ad-spend${
        isLive ? '-live' : ''
      }`,
    ),
    value: formatter.formatCurrency(currency, isLive ? spent : balance),
    tooltip: t(
      `campaign-widget.facebook-marketing.stats.ad-spend-${
        isLive ? '-live' : ''
      }.tooltip`,
    ),
    onShowTooltip: () =>
      biEvents.tooltipShown('adSpend', viewMode, widget_name),
  };

  let result = [];
  if (shouldCheckIntent && intent === 'Traffic') {
    if (!stats.bookings) {
      if (stats.purchases) {
        result = [siteVisitsStat, purchasesStat, revenueStat];
      } else {
        result = [totalViewsStat, totalClicksStat, siteVisitsStat];
      }
    } else {
      if (stats.revenues) {
        result = [siteVisitsStat, bookingsStat, revenueStat];
      } else {
        result = [totalClicksStat, siteVisitsStat, bookingsStat];
      }
    }
  } else {
    if (!stats.purchases) {
      result = [totalViewsStat, peopleReachedStat, siteVisitsStat];
    } else {
      return [purchasesStat, revenueStat, adSpendStat, roasStat];
    }
  }

  if (showAdSpendInStats) {
    result = [...result, adSpendStat];
  }

  return result;
};

export const buildNotification = (
  status: string,
  t: TFunction,
): CampaignWidgetNotification | undefined => {
  if (status === FacebookMarketingCampaignStatus.ERROR) {
    return {
      text: t(
        `campaign-widget.facebook-marketing.status.${status}.notification`,
      ),
      appearance: 'danger',
      button: {
        label: t(
          `campaign-widget.facebook-marketing.status.${status}.notification.cta.label`,
        ),
        onClick: () =>
          navigateTo({
            pageComponentId: PageComponentId.PromotePaidAds,
          }),
      },
    };
  }
  return undefined;
};

export const calculateDateRangeForCampaign = (
  dateFirstStarted: Date,
  dateEnd?: Date,
  dateRange?: TimeRange,
): TimeRange => {
  if (!dateRange) {
    return {
      startDate: dateFirstStarted.toISOString(),
      endDate: dateEnd?.toISOString() ?? new Date().toISOString(),
    };
  }

  let startDate = dateRange.startDate;
  if (dateFirstStarted > new Date(startDate)) {
    startDate = dateFirstStarted.toISOString();
  }

  return {
    startDate,
    endDate: dateRange.endDate,
  };
};

export const FBMarketingCapsule = new DataCapsule({
  strategy: new LocalStorageStrategy(),
  namespace: 'fb-marketing-os-widget',
});

const SELECTED_DATE_FILTER = 'fb-marketing-os-widget-selected-date-filter';

export const setPreviouslySelectedDateFilter = async (timeFrame: TimeFrame) => {
  try {
    await FBMarketingCapsule.setItem(SELECTED_DATE_FILTER, timeFrame);
  } catch (e) {}
};

export const getPreviouslySelectedDateFilter = async () => {
  try {
    return await FBMarketingCapsule.getItem(SELECTED_DATE_FILTER);
  } catch (e) {
    return TimeFrame.FOUR_WEEKS;
  }
};
