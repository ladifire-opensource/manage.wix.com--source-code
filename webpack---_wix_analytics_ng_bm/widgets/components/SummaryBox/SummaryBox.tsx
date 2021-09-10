import React, { useState } from 'react';
import { CircleSmallFilledSmall, RefreshSmall, ChevronRight } from 'wix-ui-icons-common';
import {
  Box,
  Button,
  Heading,
  IconButton,
  Loader,
  Popover,
  Text,
  TextButton,
  TrendIndicator,
  SparklineChart,
} from 'wix-style-react';

import s from './SummaryBox.scss';
import { getColorByTheme } from '../../utils/getColorByTheme';
import { t } from '../../../utils/translate';
import { SummaryBoxProps } from '../../types/types';
import { formatDate } from '../../utils/formatDate';
import { StatTextTooltip } from '../Tooltips/StatTextTooltip';

export function SummaryBox(props: SummaryBoxProps) {
  const {
    dataSet,
    theme,
    group,
    headerText,
    statText,
    onRefresh,
    isLoading,
    labels,
    summaryStats = [],
    showSummaryStats = true,
    onSelectedDimension,
    locale,
    footerSmartActionTitle,
    footerTooltipText,
    footerTooltipCta,
    hoverOnSmartAction,
    onFooterSmartActionClick,
    diffPercentage,
    description,
    isHovered,
    invertedTrend,
    statTextExtended,
    chartWidth = 72,
    effectiveLabelIndex = 0,
    hoverOnKpiTitle,
    isConsentPolicyEnabled,
  } = props;

  const isSmartActionTooltip = !!footerTooltipCta;
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
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

  const color = getColorByTheme(theme);

  let statsComponent = null;
  if (showSummaryStats && summaryStats.length > 0) {
    statsComponent = summaryStats
      .map(({ key, value }: { [key: string]: string }) => {
        return (
          <>
            <Text size="tiny">{key}</Text>
            <Box paddingLeft="2px">
              <Text size="tiny" weight="bold">
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
      <Box align="space-between" marginBottom="12px" height="18px">
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
            <Heading
              onMouseEnter={() => {
                setIsPopoverToolTipVisible(true);
                hoverOnKpiTitle && hoverOnKpiTitle();
              }}
              onMouseLeave={() => setIsPopoverToolTipVisible(false)}
              appearance="H6"
            >
              {headerText}
            </Heading>
          </Popover.Element>
          <Popover.Content>
            <Text light size="small" weight="normal">
              <div className={s.headerPopover}>{description}</div>
            </Text>
          </Popover.Content>
        </Popover>
        <Box className={s.refreshButton}>
          {typeof onRefresh === 'function' && isLoading ? (
            <Loader size="tiny" />
          ) : (
            isHovered && (
              <IconButton
                skin="inverted"
                onClick={(e: any) => {
                  e.stopPropagation();
                  onRefresh();
                }}
                size="tiny"
              >
                <RefreshSmall />
              </IconButton>
            )
          )}
        </Box>
      </Box>
      <Box align="space-between" verticalAlign="bottom" marginBottom="11px">
        <StatTextTooltip
          group={group}
          statTextExtended={statTextExtended}
          isConsentPolicyEnabled={isConsentPolicyEnabled}
        >
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
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
          </div>
        </StatTextTooltip>
        <Box paddingBottom="6px">
          <SparklineChart
            data={sparklineDataSet}
            height={19}
            width={chartWidth}
            highlightedStartingIndex={effectiveLabelIndex}
            getTooltipContent={getTooltipContent}
            color={color}
            onHover={onHoverSparkline}
          />
        </Box>
      </Box>
      {showSummaryStats && (
        <Box verticalAlign="middle" minHeight={18} marginBottom="2px">
          {statsComponent}
        </Box>
      )}
      {isSmartActionTooltip ? (
        <Box>
          <Popover
            animate
            appendTo="window"
            flip
            shown={isPopoverVisible}
            placement="bottom"
            moveBy={{ x: 96, y: 12 }}
            theme="dark"
            disableClickOutsideWhenClosed={true}
            onClickOutside={() => setIsPopoverVisible(false)}
            showArrow
          >
            <Popover.Element>
              <TextButton
                size="tiny"
                onClick={(e: any) => {
                  e.stopPropagation();
                  hoverOnSmartAction();
                  setIsPopoverVisible(!isPopoverVisible);
                }}
              >
                {footerSmartActionTitle}
              </TextButton>
            </Popover.Element>
            <Popover.Content>
              <Box direction="vertical" width="234px" padding="24px">
                <Box paddingBottom="18px">
                  <Text size="small" light>
                    {footerTooltipText}
                  </Text>
                </Box>
                <Box>
                  <Button
                    onClick={(e: any) => {
                      e.stopPropagation();
                      onFooterSmartActionClick();
                    }}
                    size="tiny"
                  >
                    {footerTooltipCta}
                  </Button>
                </Box>
              </Box>
            </Popover.Content>
          </Popover>
        </Box>
      ) : (
        footerSmartActionTitle && (
          <TextButton
            size="tiny"
            onClick={(e: any) => {
              e.stopPropagation();
              onFooterSmartActionClick();
            }}
            suffixIcon={<ChevronRight />}
          >
            {footerSmartActionTitle}
          </TextButton>
        )
      )}
    </Box>
  );
}
