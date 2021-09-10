import { Box, Text } from 'wix-style-react';
import { PredefinedTimeframe } from '@wix/ambassador-analytics-ng-server/types';
import React from 'react';
import { ChartTypes, ISmartActionToolTip } from '@wix/analytics-ng-common';

import { t } from '../../../utils/translate';
import { getShortDate } from '../../../utils/dates';
import { IReportsContainer } from '../../../types/types';
import { IDisplayWidgetData } from './types';
import DashboardWidgetBILogger from '../../../utils/DashboardWidgetBILogger';
import {
  CustomizationModalSaveSourceBI,
  DashboardWidgetType,
  PERMISSIONS,
} from '../../../constants/enums';
import { ReportingWrapper } from '../../components/ReportingWrapper/ReportingWrapper';
import { getDomain } from '../../../utils/siteData';
import SummaryBoxReplacer from '../../components/SummaryBoxReplacer/SummaryBoxReplacer';

export const PeriodTooltipContent = (props) => {
  const { locale, selectedDate, compareToDate } = props;
  return (
    <Box direction="vertical">
      <Text weight="bold" size="small" light>
        {`${t('report-page.date-filter-banner.selected-period')} ${getShortDate(
          selectedDate.startDate,
          locale,
        )} - ${getShortDate(selectedDate.endDate, locale)}`}
      </Text>
      {compareToDate && (
        <Text size="small" light>
          {`${t('report-page.date-filter-banner.compared-to')} ${getShortDate(
            compareToDate.startDate,
            locale,
          )} - ${getShortDate(compareToDate.endDate, locale)}`}
        </Text>
      )}
    </Box>
  );
};

export const getTimeframeTooltip = (
  reports: IReportsContainer,
  usedReportIds: any[],
  locale: string,
) => {
  let timeFrameToolTip = null;
  const firstReport = reports.getReport(usedReportIds[0]);
  const result = firstReport.getQueryResult();
  if (result.measuredResult && result.measuredResult.currentPeriod) {
    const selectedDate = {
      startDate: new Date(result.measuredResult.currentPeriod.fromDate),
      endDate: new Date(),
    };
    let compareToDate = null;
    if (result.measuredResult.previousPeriod) {
      compareToDate = {
        startDate: new Date(result.measuredResult.previousPeriod.fromDate),
        endDate: new Date(result.measuredResult.previousPeriod.toDate),
      };
    }
    timeFrameToolTip = (
      <PeriodTooltipContent
        locale={locale}
        selectedDate={selectedDate}
        compareToDate={compareToDate}
      />
    );
  }

  return timeFrameToolTip;
};

export const getDateString = (d: PredefinedTimeframe, _locale) => {
  switch (d) {
    case PredefinedTimeframe.LAST_90_DAYS:
      return '90 day';
    case PredefinedTimeframe.LAST_30_DAYS:
      return '30 day';
    case PredefinedTimeframe.LAST_14_DAYS:
      return '14 day';
    case PredefinedTimeframe.LAST_7_DAYS:
      return '7 day';
    case PredefinedTimeframe.THIS_WEEK:
      return 'this week';
    default:
      return 'this month';
  }
};

export const getSmartActionData = (tile, userProfile = {}): ISmartActionToolTip => {
  return tile.smartActions.filter((smartAction) => {
    return (
      !smartAction.conditions.length ||
      smartAction.conditions.every((condition) => {
        return Object.entries(condition).every(([key, value]) => {
          return value === userProfile[key];
        });
      })
    );
  })[0];
};

export const getDisplayWidget = (
  data: IDisplayWidgetData,
  isDashboardNext?: boolean,
): React.ReactNode => {
  const {
    reports,
    dashboardData,
    moduleParams,
    chartWidth,
    hasBusinessPlan,
    shouldConnectPaymentMethod,
    currency,
    isHovered,
    dashboardDataSmartAction = {},
    isDefault,
    orderedKpisList,
    timeFrame,
    isConsentPolicyEnabled,
    onReportUpdated,
  } = data;
  const { userPermissions } = moduleParams;
  const canUpgradeToPremium = userPermissions.includes(PERMISSIONS.UPGRADE_SITE);
  const domain = getDomain();

  let component: React.ReactNode;
  if (!hasBusinessPlan && dashboardData.theme === 'sales' && canUpgradeToPremium) {
    component = (
      <SummaryBoxReplacer
        hasBusinessPlan={hasBusinessPlan}
        theme={dashboardData.theme}
        headerText={t(dashboardData.headerText)}
        priceText="N/A"
        ctaLink={`${domain}/store/plans?siteGuid=${moduleParams.metaSiteId}&referralInfo=widget&referralAdditionalInfo=analytics_widget`}
        ctaText={t('widget.dashboard.stat.sales.upgrade.cta')}
        onCtaClick={() => {
          DashboardWidgetBILogger.ctaClickedInsideTheWidget({
            widgetType: DashboardWidgetType.vertical,
            category: dashboardData.headerText,
            isDefault,
            kpiName: dashboardData.measureLabelKey,
            name: 'widget.dashboard.stat.sales.upgrade.cta',
            orderedKpisList,
            source: CustomizationModalSaveSourceBI.card,
            timeFrame,
          }).catch(console.error);
        }}
      />
    );
  } else if (hasBusinessPlan && shouldConnectPaymentMethod && dashboardData.theme === 'sales') {
    component = (
      <SummaryBoxReplacer
        headerText={t(dashboardData.headerText)}
        priceText="N/A"
        ctaLink={`${domain}/dashboard/${moduleParams.metaSiteId}/payments/?referralInfo=widget&referralAdditionalInfo=analytics_widget`}
        ctaText={t('widget.dashboard.stat.sales.connect.cta')}
        onCtaClick={() => {
          DashboardWidgetBILogger.ctaClickedInsideTheWidget({
            widgetType: DashboardWidgetType.vertical,
            category: dashboardData.headerText,
            isDefault,
            kpiName: dashboardData.measureLabelKey,
            name: 'widget.dashboard.stat.sales.connect.cta',
            orderedKpisList,
            source: CustomizationModalSaveSourceBI.card,
            timeFrame,
          }).catch(console.error);
        }}
        hasBusinessPlan={hasBusinessPlan}
        theme={dashboardData.theme}
      />
    );
  } else {
    component = (
      <ReportingWrapper
        report={reports.getReport(dashboardData.reportId)}
        moduleParams={moduleParams}
        widgetProps={{
          chartWidth,
          chartView: ChartTypes.SUMMARY_BOX_NEXT,
          hasBusinessPlan,
          shouldConnectPaymentMethod,
          locale: moduleParams.accountLanguage,
          currency,
          headerText: t(dashboardData.headerText),
          theme: dashboardData.theme,
          group: dashboardData.group,
          description: t(dashboardData.description),
          reportLink: dashboardData.reportLink,
          measureLabel: t(dashboardData.measureLabel),
          measureType: dashboardData.measureType,
          measureLabelKey: dashboardData.measureLabel,
          isConsentPolicyEnabled,
          isHovered,
          isDashboardNext,
          footerSmartActionTitle: t(dashboardDataSmartAction.footerSmartActionTitle),
          footerNavigateConfig: dashboardDataSmartAction.footerNavigateConfig,
          footerTooltipTitle: t(dashboardDataSmartAction.footerTooltipTitle),
          footerTooltipText: t(dashboardDataSmartAction.footerTooltipText),
          footerTooltipCta: t(dashboardDataSmartAction.footerTooltipCta),
          shorthandForMinutes: t('widget.dashboard.measures.time.minutes.short'),
          shorthandForSeconds: t('widget.dashboard.measures.time.seconds.short'),
          percentageSymbol: t('widget.dashboard.measures.percent.short'),
          invertedTrend: dashboardData.invertedTrend,
          onlyZeroIsGood: dashboardData.onlyZeroIsGood,
          onSparklineHover: (date) =>
            DashboardWidgetBILogger.hoverOnSparkline({
              widgetType: isDashboardNext
                ? DashboardWidgetType.vertical
                : DashboardWidgetType.horizontal,
              category: dashboardData.headerText,
              date,
              isDefault,
              kpiName: dashboardData.measureLabelKey,
              orderedKpisList,
              timeFrame,
              value: '', // unavailable param
            }).catch(console.error),
          onRefreshClick: () =>
            DashboardWidgetBILogger.clickToRefresh({
              widgetType: DashboardWidgetType.horizontal,
              category: dashboardData.headerText,
              isDefault,
              kpiName: dashboardData.measureLabelKey,
              orderedKpisList,
              timeFrame,
            }).catch(console.error),
          onCtaClick: (source) =>
            DashboardWidgetBILogger.ctaClickedInsideTheWidget({
              widgetType: isDashboardNext
                ? DashboardWidgetType.vertical
                : DashboardWidgetType.horizontal,
              category: dashboardData.headerText,
              isDefault,
              kpiName: dashboardData.measureLabelKey,
              name: dashboardDataSmartAction.footerTooltipCta,
              orderedKpisList,
              source,
              timeFrame,
            }).catch(console.error),
          hoverOnSmartAction: () =>
            DashboardWidgetBILogger.hoverOnSmartAction({
              widgetType: DashboardWidgetType.horizontal,
              category: dashboardData.headerText,
              isDefault,
              kpiName: dashboardData.measureLabelKey,
              orderedKpisList,
              timeFrame,
              value: dashboardDataSmartAction.footerSmartActionTitle,
            }).catch(console.error),
          hoverOnKpiTitle: () =>
            DashboardWidgetBILogger.hoverOnKpiTitle({
              widgetType: DashboardWidgetType.vertical,
              category: dashboardData.headerText,
              isDefault,
              kpiName: dashboardData.measureLabelKey,
              orderedKpisList,
              timeFrame,
            }).catch(console.error),
        }}
        onReportUpdated={onReportUpdated}
      />
    );
  }

  return component;
};
