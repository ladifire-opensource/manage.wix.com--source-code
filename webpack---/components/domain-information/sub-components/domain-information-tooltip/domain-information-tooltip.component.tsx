import React, { memo, FC } from 'react';
import { useTranslation, useModuleParams } from 'yoshi-flow-bm-runtime';
import { Text, TextButton } from 'wix-style-react';

export const DOMAIN_INFORMATION_TOOLTIP_CTA_DATA_HOOK =
  'dashboard-site-details.domain-information.tooltip-cta';

export const DomainInformationTooltip: FC = memo(() => {
  const { accountLanguage } = useModuleParams();
  const [t] = useTranslation();

  return (
    <>
      <Text size="small" light>
        {`${t('domain.tooltip.text')} `}
      </Text>
      <TextButton
        size="small"
        as="a"
        href={`https://support.wix.com/${accountLanguage}/article/wix-editor-publishing-your-site`}
        target="_blank"
        skin="light"
        underline="always"
        weight="normal"
        dataHook={DOMAIN_INFORMATION_TOOLTIP_CTA_DATA_HOOK}
      >
        {t('tooltip.cta')}
      </TextButton>
    </>
  );
});
