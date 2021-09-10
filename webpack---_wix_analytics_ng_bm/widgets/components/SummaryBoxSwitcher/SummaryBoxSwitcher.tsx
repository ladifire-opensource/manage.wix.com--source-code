import React from 'react';
import { navigateTo } from '@wix/business-manager-api';
import { Field } from '@wix/ambassador-analytics-ng-server/types';
import {
  ChartTypes,
  extendedNumberFormatter,
  MeasureType,
  numberFormatter,
} from '@wix/analytics-ng-common';

import { IAnalyticChartProps } from '../../types/chartTypes';
import { QueryStatus } from '../../../types/types';
import { t } from '../../../utils/translate';
import { CustomizationModalSaveSourceBI } from '../../../constants/enums';
import { SummaryBox } from '../SummaryBox/SummaryBox';
import { SummaryBoxNext } from '../SummaryBoxNext/SummaryBoxNext';
import { SummaryBoxVelo } from '../SummaryBoxVelo/SummaryBoxVelo';

function createDataLabels(dataPoints: any[], fromDate: string): any {
  let effectiveLabelIndex = 0;
  const labels = dataPoints.map((dataEntry, index) => {
    if (fromDate === dataEntry.toDate) {
      effectiveLabelIndex = index;
    }
    return new Date(dataEntry.toDate);
  });

  return { labels, effectiveLabelIndex };
}

function createDataItems(
  data: any[],
  measures: Field[],
  measureLabel: string,
  measureType: MeasureType,
  measureLabelKey: string,
  locale: string,
  currency: string,
  shorthandForMinutes: string,
  shorthandForSeconds: string,
  percentageSymbol: string,
): any {
  const { name } = measures[0]; // There should be only one measure for a LineChart
  const values = data.map((dataEntry) => {
    return dataEntry[name] || 0;
  });

  return {
    name,
    values,
    formattedValues: values.map((val) => {
      return numberFormatter(
        val,
        measureType,
        locale,
        currency,
        shorthandForMinutes,
        shorthandForSeconds,
        percentageSymbol,
      );
    }),
    visible: true,
    measureLabel,
    measureLabelKey,
    measureType,
  };
}

export function SummaryBoxSwitcher(props: IAnalyticChartProps): React.ReactElement {
  const { report, widgetProps = {}, moduleParams } = props;
  const status: QueryStatus = report.getStatus();
  const analyticResult = report.getQueryResult();
  const { measuredResult, view } = analyticResult;
  const { dataPoints, today, yesterday, currentPeriod, periodDiffPercentage } = measuredResult;
  const {
    measureLabel,
    measureType,
    measureLabelKey,
    footerNavigateConfig,
    currency,
    onSparklineHover,
    onRefreshClick,
    onCtaClick,
    hoverOnSmartAction,
    shorthandForMinutes,
    shorthandForSeconds,
    percentageSymbol,
    chartView,
  } = widgetProps;
  const data = dataPoints.map((dataPoint) => {
    return dataPoint.data;
  });
  const { measures } = view;
  const firstDataEntryKeys = Object.keys(data[0]);
  const usedMeasures = measures.filter((measure) => {
    return firstDataEntryKeys.includes(measure.name);
  });

  const userMeasureName = usedMeasures[0].name;
  const todaySum = today.data[userMeasureName] || 0;
  const yesterdaySum = yesterday.data[userMeasureName] || 0;
  const currentSum = currentPeriod.data[userMeasureName] || 0;
  const { fromDate } = currentPeriod;
  let diffPercentage: number;
  if (periodDiffPercentage) {
    diffPercentage = periodDiffPercentage[userMeasureName];
  }

  const dataSet = createDataItems(
    data,
    usedMeasures,
    measureLabel,
    measureType,
    measureLabelKey,
    moduleParams.accountLanguage,
    currency,
    shorthandForMinutes,
    shorthandForSeconds,
    percentageSymbol,
  );
  let statText = '0';
  let statTextExtended;
  if (dataSet) {
    const locale = moduleParams.accountLanguage;
    statText = numberFormatter(
      currentSum,
      dataSet.measureType,
      locale,
      currency,
      shorthandForMinutes,
      shorthandForSeconds,
      percentageSymbol,
    ) as string;
    statTextExtended = extendedNumberFormatter(
      currentSum,
      dataSet.measureType,
      locale,
      currency,
      shorthandForMinutes,
      shorthandForSeconds,
    );
  }

  const { labels, effectiveLabelIndex } = createDataLabels(dataPoints, fromDate);
  const convertToSummaryBoxDataSet = ({ name, values, visible, ...rest }) => {
    return { name, values, visible, metaData: { ...rest } };
  };

  switch (chartView) {
    case ChartTypes.SUMMARY_BOX_VELO: {
      return (
        <SummaryBoxVelo
          {...widgetProps}
          onSelectedDimension={(selectedDimension) => {
            onSparklineHover && onSparklineHover(selectedDimension);
          }}
          externalLink=""
          dataSet={convertToSummaryBoxDataSet(dataSet)}
          labels={labels}
          effectiveLabelIndex={effectiveLabelIndex}
          statText={statText}
          statTextExtended={statTextExtended}
          isLoading={status === QueryStatus.UPDATING || status === QueryStatus.NONE}
          onRefresh={() => {
            void report.refreshData();
            onRefreshClick && onRefreshClick();
          }}
          onFooterSmartActionClick={() => {
            if (typeof footerNavigateConfig === 'string') {
              window.open(footerNavigateConfig);
              onCtaClick && onCtaClick(CustomizationModalSaveSourceBI.tooltip);
              return;
            }
            navigateTo(footerNavigateConfig);
            onCtaClick && onCtaClick(CustomizationModalSaveSourceBI.tooltip);
          }}
          hoverOnSmartAction={hoverOnSmartAction}
          summaryStats={[
            {
              key: t('widget.dashboard.stat.today'),
              value: numberFormatter(
                todaySum,
                dataSet.measureType,
                moduleParams.accountLanguage,
                currency,
                shorthandForMinutes,
                shorthandForSeconds,
                percentageSymbol,
              ),
            },
            {
              key: t('widget.dashboard.stat.yesterday'),
              value: numberFormatter(
                yesterdaySum,
                dataSet.measureType,
                moduleParams.accountLanguage,
                currency,
                shorthandForMinutes,
                shorthandForSeconds,
                percentageSymbol,
              ),
            },
          ]}
          diffPercentage={diffPercentage}
        />
      );
    }
    case ChartTypes.SUMMARY_BOX_NEXT: {
      return (
        <SummaryBoxNext
          {...widgetProps}
          onSelectedDimension={(selectedDimension) => {
            onSparklineHover && onSparklineHover(selectedDimension);
          }}
          externalLink=""
          dataSet={convertToSummaryBoxDataSet(dataSet)}
          labels={labels}
          effectiveLabelIndex={effectiveLabelIndex}
          statText={statText}
          statTextExtended={statTextExtended}
          summaryStats={[
            {
              key: t('widget.dashboard.stat.today'),
              value: numberFormatter(
                todaySum,
                dataSet.measureType,
                moduleParams.accountLanguage,
                currency,
                shorthandForMinutes,
                shorthandForSeconds,
                percentageSymbol,
              ),
            },
            {
              key: t('widget.dashboard.stat.yesterday'),
              value: numberFormatter(
                yesterdaySum,
                dataSet.measureType,
                moduleParams.accountLanguage,
                currency,
                shorthandForMinutes,
                shorthandForSeconds,
                percentageSymbol,
              ),
            },
          ]}
          diffPercentage={diffPercentage}
        />
      );
    }

    default:
      return (
        <SummaryBox
          {...widgetProps}
          onSelectedDimension={(selectedDimension) => {
            onSparklineHover && onSparklineHover(selectedDimension);
          }}
          externalLink=""
          dataSet={convertToSummaryBoxDataSet(dataSet)}
          labels={labels}
          effectiveLabelIndex={effectiveLabelIndex}
          statText={statText}
          statTextExtended={statTextExtended}
          isLoading={status === QueryStatus.UPDATING || status === QueryStatus.NONE}
          onRefresh={() => {
            void report.refreshData();
            onRefreshClick && onRefreshClick();
          }}
          onFooterSmartActionClick={() => {
            if (typeof footerNavigateConfig === 'string') {
              window.open(footerNavigateConfig);
              onCtaClick && onCtaClick(CustomizationModalSaveSourceBI.tooltip);
              return;
            }
            navigateTo(footerNavigateConfig);
            onCtaClick && onCtaClick(CustomizationModalSaveSourceBI.tooltip);
          }}
          hoverOnSmartAction={hoverOnSmartAction}
          summaryStats={[
            {
              key: t('widget.dashboard.stat.today'),
              value: numberFormatter(
                todaySum,
                dataSet.measureType,
                moduleParams.accountLanguage,
                currency,
                shorthandForMinutes,
                shorthandForSeconds,
                percentageSymbol,
              ),
            },
            {
              key: t('widget.dashboard.stat.yesterday'),
              value: numberFormatter(
                yesterdaySum,
                dataSet.measureType,
                moduleParams.accountLanguage,
                currency,
                shorthandForMinutes,
                shorthandForSeconds,
                percentageSymbol,
              ),
            },
          ]}
          diffPercentage={diffPercentage}
        />
      );
  }
}
