import React, { useState } from 'react';
import StatusWarningSmall from 'wix-ui-icons-common/StatusWarningSmall';
import { Box, Heading, Loader, Popover, Text, TextButton, SparklineChart } from 'wix-style-react';
import InfoCircleSmall from 'wix-ui-icons-common/InfoCircleSmall';

import s from './SummaryBoxVelo.scss';
import { getColorByTheme } from '../../utils/getColorByTheme';
import { t } from '../../../utils/translate';
import { SummaryBoxProps } from '../../types/types';
import { formatDate } from '../../utils/formatDate';
import { BaseTooltip } from '../Tooltips/BaseTooltip';

export function SummaryBoxVelo(props: SummaryBoxProps) {
  const {
    dataSet,
    theme,
    headerText,
    statText,
    onRefresh,
    isLoading,
    labels,
    onSelectedDimension,
    locale,
    footerSmartActionTitle,
    onFooterSmartActionClick,
    description,
    statTextExtended,
    chartWidth = 72,
    effectiveLabelIndex = 0,
    hoverOnKpiTitle,
    onlyZeroIsGood,
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

  const color = getColorByTheme(theme);

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
        <div
          style={{ display: 'flex' }}
          onMouseEnter={() => {
            setIsPopoverToolTipVisible(true);
            hoverOnKpiTitle && hoverOnKpiTitle();
          }}
          onMouseLeave={() => setIsPopoverToolTipVisible(false)}
        >
          <Heading appearance="H6">{headerText}</Heading>
          <Box marginLeft="4px">
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
                <InfoCircleSmall />
              </Popover.Element>
              <Popover.Content>
                <Text light size="small" weight="normal">
                  <Box padding="SP2 SP4">{description}</Box>
                </Text>
              </Popover.Content>
            </Popover>
          </Box>
        </div>
        <Box className={s.refreshButton}>
          {typeof onRefresh === 'function' && isLoading && <Loader size="tiny" />}
        </Box>
      </Box>
      <Box align="space-between" verticalAlign="bottom" marginBottom="11px">
        <BaseTooltip statTextExtended={statTextExtended}>
          <div>
            <Box verticalAlign="middle">
              <Text ellipsis weight="bold">
                {statText}
              </Text>
              {onlyZeroIsGood && statText !== '0' && (
                <Box color="R10" marginLeft="4px" marginBottom="2px">
                  <StatusWarningSmall />
                </Box>
              )}
            </Box>
          </div>
        </BaseTooltip>
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
      {footerSmartActionTitle && (
        <TextButton
          size="tiny"
          onClick={(e: any) => {
            e.stopPropagation();
            onFooterSmartActionClick();
          }}
        >
          {footerSmartActionTitle}
        </TextButton>
      )}
    </Box>
  );
}
