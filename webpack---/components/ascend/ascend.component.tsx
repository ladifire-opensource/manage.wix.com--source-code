import { MODULE_NAME } from '@src/types';
import {
  getPageComponentLinkComponent,
  PageComponentId,
} from '@wix/business-manager-api';
import React, { FC } from 'react';
import { Box, Divider, Text, TextButton, Tooltip } from 'wix-style-react';
import { useTranslation } from 'yoshi-flow-bm-runtime';
import { ASCEND_DATA_HOOKS } from '../data-hooks';
import { DisabledCTA } from '../disabled-cta/disabled-cta';

export interface AscendProps {
  isManage: boolean;
  planName: string;
  canManageAscend: boolean;
  description: string;
  accountLanguage: string;
  manageUrl?: string;
  onCtaClicked(): void;
}

export const Ascend: FC<AscendProps> = ({
  planName,
  description,
  onCtaClicked,
  manageUrl,
  canManageAscend,
  isManage,
}) => {
  const [t] = useTranslation();
  const manageOrCompare = isManage
    ? 'site_details.ascend.manage'
    : 'site_details.ascend.compare';
  const PageComponentLink = getPageComponentLinkComponent();

  const renderManageLink = () => (
    <Tooltip
      placement="bottom"
      content={`${t('site_details.plan.tooltip')}${planName}`}
      dataHook={ASCEND_DATA_HOOKS.TOOLTIP}
    >
      <PageComponentLink
        style={{ display: 'flex' }}
        pageComponentId={PageComponentId.SiteSettings}
        openInNewTab={false}
        contextData={{ appState: 'plans', referrer: MODULE_NAME }}
      >
        <TextButton
          dataHook={ASCEND_DATA_HOOKS.CTA}
          underline="none"
          size="tiny"
          rel="noopener"
          as="a"
          onClick={onCtaClicked}
          ellipsis
          tooltipProps={{ size: 'small' }}
        >
          {t(manageOrCompare)}
        </TextButton>
      </PageComponentLink>
    </Tooltip>
  );
  const renderCompareLink = () => (
    <TextButton
      target="_blank"
      rel="noopener"
      as="a"
      href={manageUrl}
      dataHook={ASCEND_DATA_HOOKS.CTA}
      size="tiny"
      onClick={onCtaClicked}
      ellipsis
      tooltipProps={{ size: 'small' }}
    >
      {t(manageOrCompare)}
    </TextButton>
  );

  const renderEnabledCta = () =>
    isManage ? renderManageLink() : renderCompareLink();

  const renderDisabledCta = () => (
    <DisabledCTA
      tooltip={t('site_details.ascend.only_owner_can_manage')}
      tooltipDataHook={ASCEND_DATA_HOOKS.TOOLTIP}
      tooltipCtaDataHook={ASCEND_DATA_HOOKS.TOOLTIP_CTA}
      ctaText={t(manageOrCompare)}
      ctaDataHook={ASCEND_DATA_HOOKS.CTA}
    />
  );

  return (
    <Box verticalAlign="middle" dataHook={ASCEND_DATA_HOOKS.CONTAINER}>
      <Box paddingRight="12px" width="1px" height="30px">
        <Divider direction="vertical" />
      </Box>
      <Box direction="vertical" height="32px" overflow="hidden">
        <Text
          dataHook={ASCEND_DATA_HOOKS.DESCRIPTION}
          size="tiny"
          ellipsis
          tooltipProps={{ size: 'small' }}
        >
          {description}
        </Text>
        {canManageAscend ? renderEnabledCta() : renderDisabledCta()}
      </Box>
    </Box>
  );
};
