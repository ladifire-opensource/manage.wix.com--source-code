import React, { useState } from 'react';
import { CircleSmallFilledSmall } from 'wix-ui-icons-common';
import { Box, Popover, Text, SparklineChart, TrendIndicator } from 'wix-style-react';

import s from './SummaryBoxNext.scss';
import { getColorByTheme } from '../../utils/getColorByTheme';
import { t } from '../../../utils/translate';
import { SummaryBoxProps } from '../../types/types';
import { formatDate } from '../../utils/formatDate';
import { StatTextTooltip } from '../Tooltips/StatTextTooltip';

export function SummaryBoxNext(props: SummaryBoxProps) {
  const {
    dataSet,
    theme,
    group,
    headerText,
    statText,
    labels,
    summaryStats = [],
    showSummaryStats = true,
    onSelectedDimension,
    locale,
    diffPercentage,
    description,
    invertedTrend,
    statTextExtended,
    effectiveLabelIndex = 0,
    hoverOnKpiTitle,
    isConsentPolicyEnabled,
  } = props;
  const [isPopoverToolTipVisible, setIsPopoverToolTipVisible] = useState(false);

  const getTooltipContent = (index: number): JSX.Element => {
    const { formattedValues, measureLabelKey } = dataSet.metaData;
    const currentDate = labels[index];
    const currentFormattedValue = formattedValues[index];
    const firstLineText = formatDate(locale, currentDate);
    const secondLineText = t(measureLabelKey, { value: currentFormattedValue });
    return (
      <Box align="left" direction="vertical">
        <Text size="small" light>
          {firstLineText}
        </Text>
        <Text size="small" light weight="bold">
          {secondLineText}
        </Text>
      </Box>
    );
  };

  const color = getColorByTheme(theme, true);

  let statsComponent = null;
  if (showSummaryStats && summaryStats.length > 0) {
    statsComponent = summaryStats
      .map(({ key, value }: { [key: string]: string }) => {
        return (
          <>
            <Text size="tiny">{key}</Text>
            <Box paddingLeft="2px">
              <Text size="tiny" className={s.bold}>
                {value}
              </Text>
            </Box>
          </>
        );
      })
      // @ts-expect-error
      .reduce((prev: React.ReactElement, curr: React.ReactElement, index) => {
        return [
          prev,
          <Box verticalAlign="middle" className={s.yesterdayBlock} key={index}>
            <CircleSmallFilledSmall />
            {curr}
          </Box>,
        ];
      });
  }

  const sparklineDataSet = dataSet.values.map((value, index) => {
    const label = labels[index];
    return { value, label };
  });

  const onHoverSparkline = (index) => {
    onSelectedDimension(sparklineDataSet[index].label);
  };

  return (
    <Box width="100%" direction="vertical">
      <Box align="space-between" marginBottom="8px">
        <Popover
          animate
          showArrow
          appendTo="window"
          flip
          shown={isPopoverToolTipVisible}
          placement="top"
          theme="dark"
          disableClickOutsideWhenClosed={true}
          maxWidth={250}
          onClickOutside={() => setIsPopoverToolTipVisible(false)}
        >
          <Popover.Element>
            <Text
              onMouseEnter={() => {
                setIsPopoverToolTipVisible(true);
                hoverOnKpiTitle && hoverOnKpiTitle();
              }}
              onMouseLeave={() => setIsPopoverToolTipVisible(false)}
              size="tiny"
            >
              {headerText}
            </Text>
          </Popover.Element>
          <Popover.Content>
            <Text light size="small" weight="normal">
              <div className={s.headerPopover}>{description}</div>
            </Text>
          </Popover.Content>
        </Popover>
      </Box>
      <Box align="space-between" verticalAlign="bottom" marginBottom="8px">
        <StatTextTooltip
          group={group}
          statTextExtended={statTextExtended}
          isConsentPolicyEnabled={isConsentPolicyEnabled}
        >
          <Box>
            <Text ellipsis weight="bold">
              {statText}
            </Text>
            {!isNaN(diffPercentage) && (
              <TrendIndicator
                className={s.percentage}
                inverted={invertedTrend}
                value={Number(diffPercentage.toFixed(0))}
              />
            )}
          </Box>
        </StatTextTooltip>
        <Box paddingBottom="4px" marginTop="4px">
          <SparklineChart
            data={sparklineDataSet}
            height={19}
            width={72}
            highlightedStartingIndex={effectiveLabelIndex}
            getTooltipContent={getTooltipContent}
            color={color}
            onHover={onHoverSparkline}
          />
        </Box>
      </Box>
      {showSummaryStats && <Box verticalAlign="middle">{statsComponent}</Box>}
    </Box>
  );
}
