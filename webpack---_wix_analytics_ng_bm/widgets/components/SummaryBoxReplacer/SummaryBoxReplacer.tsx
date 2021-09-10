import React from 'react';
import { TextButton, Text, Box } from 'wix-style-react';
import { Trans } from 'react-i18next';

import styles from './SummaryBoxReplacer.scss';
import { DummySparkline } from '../StatsCustomizationModal/DummySparkline/DummySparkline';
import { getColorByTheme } from '../../utils/getColorByTheme';

interface ISummaryBoxReplacerProps {
  headerText: string;
  priceText: string;
  ctaLink: string;
  ctaText: string;
  theme: string;
  hasBusinessPlan: boolean;
  onCtaClick(): void;
}

const getFooter = (hasBusinessPlan: boolean, onCtaClick, ctaLink) => {
  if (hasBusinessPlan) {
    return (
      <Trans i18nKey="widget.dashboard.stat.sales.connect.action">
        To make sales online,
        <TextButton
          as="span"
          size="tiny"
          className={styles.buttonCta}
          onClick={(e) => {
            e.stopPropagation();
            onCtaClick && onCtaClick();
            window.location.href = ctaLink;
          }}
        >
          Connect a Payment Method.
        </TextButton>
      </Trans>
    );
  }
  return (
    <Trans i18nKey="widget.dashboard.stat.sales.upgrade.action">
      To make sales online,
      <TextButton
        as="span"
        size="tiny"
        className={styles.buttonCta}
        skin="premium"
        onClick={(e) => {
          e.stopPropagation();
          onCtaClick && onCtaClick();
          window.open(ctaLink, '_blank');
        }}
      >
        Upgrade to Business<span></span>
        <span>Premium</span>
      </TextButton>
    </Trans>
  );
};

const SummaryBoxReplacer = (props: ISummaryBoxReplacerProps) => {
  const { headerText, priceText, ctaLink, onCtaClick, theme, hasBusinessPlan } = props;

  const [hover, setHover] = React.useState(false);
  let graphValues;
  if (hover) {
    graphValues = [0, 1, 2, 4, 8, 32, 100, 200];
  } else {
    graphValues = [0, 0, 0, 0, 0, 0, 0, 0];
  }
  return (
    <div
      style={{ width: '100%' }}
      onMouseLeave={() => setHover(false)}
      onMouseEnter={() => setHover(true)}
    >
      <Box direction="vertical">
        <Box marginBottom="8px">
          <Text size="tiny">{headerText}</Text>
        </Box>
        <Box align="space-between" marginBottom="8px">
          <Text size="medium" weight="bold">
            {priceText}
          </Text>
          <Box marginTop="4px">
            <DummySparkline
              values={graphValues}
              color={getColorByTheme(theme, true)}
              width={72}
              height={19}
            />
          </Box>
        </Box>

        <Box>
          <Text size="tiny">{getFooter(hasBusinessPlan, onCtaClick, ctaLink)}</Text>
        </Box>
      </Box>
    </div>
  );
};

export default SummaryBoxReplacer;
