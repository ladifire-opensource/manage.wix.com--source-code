import React, { FC } from 'react';
import { useModuleParams, useTranslation } from 'yoshi-flow-bm-runtime';
import { Text, TextButton, Box, Divider, Tooltip } from 'wix-style-react';
import {
  getPageComponentLinkComponent,
  PageComponentId,
  ExternalPageId,
} from '@wix/business-manager-api';
import { MODULE_NAME } from '@src/types';
import { PLAN_DATA_HOOKS } from '../data-hooks';
import { DisabledCTA } from '../disabled-cta/disabled-cta';

export enum PLAN_CTA_KEYS {
  MANAGE = 'plan.manage',
  COMPARE = 'plan.compare',
}

export interface Props {
  planName?: string;
  metaSiteId: string;
  isPermittedToManage: boolean;
  onManagePlanClicked(): void;
  onComparePlansClicked(): void;
}

export const Plan: FC<Props> = ({
  planName,
  metaSiteId,
  isPermittedToManage,
  onManagePlanClicked,
  onComparePlansClicked,
}) => {
  const [t] = useTranslation();
  const name = planName || t('plan.free');
  const PageComponentLink = getPageComponentLinkComponent();
  const renderManageLink = () => (
    <Tooltip
      placement="bottom"
      content={`${t('site_details.plan.tooltip')}${planName}`}
      dataHook={PLAN_DATA_HOOKS.TOOLTIP}
    >
      <PageComponentLink
        style={{ display: 'flex' }}
        pageComponentId={PageComponentId.SiteSettings}
        contextData={{ appState: 'plans', referrer: MODULE_NAME }}
      >
        <TextButton
          underline="none"
          size="tiny"
          dataHook={PLAN_DATA_HOOKS.MANAGE}
          onClick={onManagePlanClicked}
          as="a"
          ellipsis
          tooltipProps={{ size: 'small' }}
        >
          {t('plan.manage')}
        </TextButton>
      </PageComponentLink>
    </Tooltip>
  );
  const renderCompareLink = () => (
    <PageComponentLink
      style={{ display: 'flex' }}
      pageComponentId={ExternalPageId.PremiumPage}
      openInNewTab
      contextData={{ referrer: MODULE_NAME, siteGuid: metaSiteId }}
    >
      <TextButton
        underline="none"
        size="tiny"
        dataHook={PLAN_DATA_HOOKS.COMPARE}
        onClick={onComparePlansClicked}
        as="a"
        ellipsis
        tooltipProps={{ size: 'small' }}
      >
        {t('plan.compare')}
      </TextButton>
    </PageComponentLink>
  );

  const renderCTA = () => (planName ? renderManageLink() : renderCompareLink());
  const renderDisabledCTA = () => {
    const dataHook = planName
      ? PLAN_DATA_HOOKS.MANAGE
      : PLAN_DATA_HOOKS.COMPARE;
    const tooltip = planName
      ? 'plan.manage.permissions.tooltip'
      : 'plan.upgrade.permissions.tooltip';
    const text = planName ? 'plan.manage' : 'plan.compare';
    return (
      <DisabledCTA
        tooltip={t(tooltip)}
        tooltipDataHook={PLAN_DATA_HOOKS.TOOLTIP}
        tooltipCtaDataHook={PLAN_DATA_HOOKS.TOOLTIP_CTA}
        ctaText={t(text)}
        ctaDataHook={dataHook}
      />
    );
  };

  return (
    <Box verticalAlign="middle">
      <Box paddingRight="12px" width="1px" height="30px">
        <Divider direction="vertical" />
      </Box>
      <Box direction="vertical" height="32px" overflow="hidden">
        <Text
          size="tiny"
          dataHook={PLAN_DATA_HOOKS.NAME}
          ellipsis
          tooltipProps={{ size: 'small' }}
        >
          {`${t('plan')}: ${name}`}
        </Text>
        {isPermittedToManage ? renderCTA() : renderDisabledCTA()}
      </Box>
    </Box>
  );
};
