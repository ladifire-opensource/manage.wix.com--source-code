import React, { FC } from 'react';
import { Tooltip, Text, TextButton, Box } from 'wix-style-react';
import { useModuleParams, useTranslation } from 'yoshi-flow-bm-runtime';

export interface DisabledCTAProps {
  tooltip: string;
  tooltipDataHook: string;
  tooltipCtaDataHook: string;
  ctaDataHook: string;
  ctaText: string;
}

export const DisabledCTA: FC<DisabledCTAProps> = ({
  tooltip,
  tooltipCtaDataHook,
  tooltipDataHook,
  ctaDataHook,
  ctaText,
}) => {
  const [t] = useTranslation();
  const { accountLanguage } = useModuleParams();

  return (
    <Tooltip
      dataHook={tooltipDataHook}
      placement="bottom"
      zIndex={1}
      content={
        <Box direction="vertical">
          <Text size="small" light>
            {tooltip}
          </Text>
          <TextButton
            size="small"
            as="a"
            href={`https://support.wix.com/${accountLanguage}/article/roles-permissions-information-for-site-collaborators`}
            target="_blank"
            skin="light"
            underline="always"
            weight="normal"
            dataHook={tooltipCtaDataHook}
          >
            {t('tooltip.cta')}
          </TextButton>
        </Box>
      }
    >
      <Box>
        <TextButton
          underline="none"
          size="tiny"
          dataHook={ctaDataHook}
          disabled
          ellipsis
          tooltipProps={{ size: 'small' }}
        >
          {ctaText}
        </TextButton>
      </Box>
    </Tooltip>
  );
};
