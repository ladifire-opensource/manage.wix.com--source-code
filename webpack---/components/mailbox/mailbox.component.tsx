import React, { FC, useMemo } from 'react';
import { Box, Divider, Text, TextButton, Tooltip } from 'wix-style-react';
import {
  PageComponentId,
  getPageComponentLinkComponent,
} from '@wix/business-manager-api';
import { useExperiments, useTranslation } from 'yoshi-flow-bm-runtime';
import { MAILBOX_DATA_HOOKS } from '../data-hooks';
import { DisabledCTA } from '../disabled-cta/disabled-cta';
import { ExperimentsBag } from '@wix/wix-experiments';

export interface MailboxProps {
  onCtaClicked(): void;
  description: string;
  mailBoxConnected: boolean;
  mailBoxExternal: boolean;
  isPermittedToManage: boolean;
}

export const Mailbox: FC<MailboxProps> = ({
  onCtaClicked,
  description,
  mailBoxExternal,
  mailBoxConnected,
  isPermittedToManage,
}) => {
  const PageComponentLink = getPageComponentLinkComponent();
  const [t] = useTranslation();
  const { experiments } = useExperiments();

  const manageOrConnect =
    mailBoxConnected || mailBoxExternal
      ? t('site_details.mail_boxes.manage')
      : t('site_details.mail_boxes.get_branded_mailbox');

  const pageComponentId = experiments.enabled(
    'specs.wos.EnableSiteMailboxesFromPremiumMailboxesRepo',
  )
    ? PageComponentId.MyMailboxes
    : PageComponentId.SiteSettings;

  const renderDisabledCta = () => {
    const tooltip = mailBoxConnected
      ? 'site_details.mail_boxes.only_owner_can_manage'
      : 'site_details.mail_boxes.only_owner_can_connect';

    return (
      <DisabledCTA
        tooltip={t(tooltip)}
        tooltipDataHook={MAILBOX_DATA_HOOKS.TOOLTIP}
        tooltipCtaDataHook={MAILBOX_DATA_HOOKS.TOOLTIP_CTA}
        ctaText={t(manageOrConnect)}
        ctaDataHook={MAILBOX_DATA_HOOKS.CTA}
      />
    );
  };

  const renderCta = () => (
    <PageComponentLink
      style={{ display: 'flex' }}
      pageComponentId={pageComponentId}
      contextData={{
        referrer: 'dashboard-site-details',
        appState: 'mailboxes',
      }}
    >
      <TextButton
        disabled={!isPermittedToManage}
        underline="none"
        size="tiny"
        dataHook={MAILBOX_DATA_HOOKS.CTA}
        onClick={onCtaClicked}
        ellipsis
        tooltipProps={{ size: 'small' }}
      >
        {mailBoxConnected || mailBoxExternal
          ? t('site_details.mail_boxes.manage')
          : t('site_details.mail_boxes.get_branded_mailbox')}
      </TextButton>
    </PageComponentLink>
  );
  return (
    <Box verticalAlign="middle">
      <Box paddingRight="12px" width="1px" height="30px">
        <Divider direction="vertical" />
      </Box>
      <Box direction="vertical" height="32px" overflow="hidden">
        <Text
          size="tiny"
          dataHook={MAILBOX_DATA_HOOKS.DESCRIPTION}
          ellipsis
          tooltipProps={{ size: 'small' }}
        >
          {description}
        </Text>
        {isPermittedToManage ? renderCta() : renderDisabledCta()}
      </Box>
    </Box>
  );
};
