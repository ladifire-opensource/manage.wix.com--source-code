import React, { FC } from 'react';
import { Text, TextButton, Box, Tooltip } from 'wix-style-react';
import { useModuleParams, useTranslation } from 'yoshi-flow-bm-runtime';
import {
  PageComponentId,
  getPageComponentLinkComponent,
} from '@wix/business-manager-api';
import { CONTRIBUTORS_DATA_HOOKS } from '../data-hooks';
import * as styles from './contributors.scss';
import { useTranslatedUserRolesExperiment } from '@src/hooks/experiments';

export interface Props {
  numberOfContributors: number;
  isPermittedToView: boolean;
  isPermittedToInvite: boolean;
  onCtaClicked(): void;
  mainRole: string;
  additionalRoles: number;
}

export const Contributors: FC<Props> = ({
  numberOfContributors,
  isPermittedToView,
  isPermittedToInvite,
  onCtaClicked,
  mainRole,
  additionalRoles,
}) => {
  const [t] = useTranslation();
  const { accountLanguage } = useModuleParams();
  const translatedUserRolesEnabled = useTranslatedUserRolesExperiment();

  const PageComponentLink = getPageComponentLinkComponent();
  const appState = numberOfContributors ? undefined : 'invite';

  const renderCTA = (
    textValue = t('contributors.cta', { numberOfContributors }),
  ) => (
    <PageComponentLink
      style={{ display: 'flex' }}
      pageComponentId={PageComponentId.RolesAndPermissions}
      contextData={{
        referrer: 'dashboard-site-details',
        appState,
      }}
      className={isPermittedToView ? '' : styles.disabledLink}
    >
      <TextButton
        underline="none"
        size="tiny"
        dataHook={CONTRIBUTORS_DATA_HOOKS.CTA}
        onClick={onCtaClicked}
        disabled={!isPermittedToView}
        ellipsis
        tooltipProps={{ size: 'small' }}
      >
        {textValue}
      </TextButton>
    </PageComponentLink>
  );

  const renderUnpermittedCta = () => (
    <Tooltip
      placement="bottom"
      content={
        <Text size="small" light>
          {t('site_details.contributors.not-permitted', {
            numberOfContributors,
          })}
          <TextButton
            size="small"
            as="a"
            href={`https://support.wix.com/${accountLanguage}/article/roles-permissions-information-for-site-collaborators`}
            target="_blank"
            skin="light"
            underline="always"
            weight="normal"
            dataHook={CONTRIBUTORS_DATA_HOOKS.TOOLTIP_CTA}
          >
            {t('tooltip.cta')}
          </TextButton>
        </Text>
      }
      dataHook={CONTRIBUTORS_DATA_HOOKS.TOOLTIP}
    >
      <Box>{renderCTA()}</Box>
    </Tooltip>
  );

  const renderAction = (): JSX.Element => {
    if (isPermittedToInvite) {
      return renderCTA();
    }

    if (isPermittedToView) {
      return renderCTA(t('contributors.cta.non-admin'));
    }

    return renderUnpermittedCta();
  };

  const getRoleText = (): string => {
    let roleText = `${t('site-role')}:`;

    if (mainRole) {
      if (translatedUserRolesEnabled) {
        roleText += ` ${mainRole}`;
      } else {
        roleText += ` ${t(`role.${mainRole}`, mainRole)}`;
      }
      if (additionalRoles) {
        roleText += ` ${t('role.and-x-more', { additionalRoles })}`;
      }
    }

    return roleText;
  };

  return (
    <Box direction="vertical" height="32px" overflow="hidden">
      <Text
        dataHook={CONTRIBUTORS_DATA_HOOKS.COUNT}
        size="tiny"
        ellipsis
        tooltipProps={{ size: 'small' }}
      >
        {getRoleText()}
      </Text>
      {renderAction()}
    </Box>
  );
};
