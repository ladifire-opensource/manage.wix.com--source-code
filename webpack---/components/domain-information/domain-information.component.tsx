import React, { FC, memo } from 'react';
import {
  TextButton,
  Tooltip,
  Layout,
  Box,
  BoxProps,
  Heading,
} from 'wix-style-react';
import { useTranslation } from 'yoshi-flow-bm-runtime';
import { DomainInformationTooltip } from '@src/components/domain-information/sub-components/domain-information-tooltip';
import {
  PageComponentId,
  getPageComponentLinkComponent,
} from '@wix/business-manager-api';
import { DOMAIN_INFO_DATA_HOOKS } from '@src/components/data-hooks';
import { ViewLiveSiteIcon } from './sub-components/view-live-site-icon';
import { useSiteCategoryExperiment } from '@src/hooks/experiments';

export enum DOMAIN_CTA_KEYS {
  CONNECT = 'domain.connect-your-own',
  VIEW_LIVE_SITE = 'domain.view-live-site',
  SITE_URL = 'site-details-url',
}

export interface Props {
  siteName: string;
  isDomainConnected: boolean;
  isPermittedToConnected: boolean;
  viewUrl: string;
  isSitePublished: boolean;
  onConnectDomainClicked(): void;
  onViewLiveSiteClicked(): void;
  onSiteUrlClicked(): void;
}

export const DomainInformation: FC<Props> = memo(
  ({
    siteName,
    isDomainConnected,
    viewUrl,
    isPermittedToConnected,
    isSitePublished,
    onConnectDomainClicked,
    onViewLiveSiteClicked,
    onSiteUrlClicked,
  }) => {
    const [t] = useTranslation();
    const PageComponentLink = getPageComponentLinkComponent();
    const siteCategoryEnabled = useSiteCategoryExperiment();

    const conditionalAlignProp: BoxProps = {};
    if (!siteCategoryEnabled) {
      conditionalAlignProp.align = 'space-between';
    }

    return (
      <Box
        direction="vertical"
        height="64px"
        paddingBottom="16px"
        {...conditionalAlignProp}
      >
        <Box
          dataHook={DOMAIN_INFO_DATA_HOOKS.HEADING_BOX}
          paddingTop={siteCategoryEnabled ? '4px' : '2px'}
          paddingBottom={siteCategoryEnabled ? '4px' : '0'}
        >
          <Heading
            dataHook={DOMAIN_INFO_DATA_HOOKS.HEADING}
            appearance={siteCategoryEnabled ? 'H4' : 'H3'}
            color="D10"
          >
            {siteName}
          </Heading>
        </Box>
        <Layout cols={1} gap="0px">
          <Tooltip
            dataHook={DOMAIN_INFO_DATA_HOOKS.TOOLTIP}
            content={<DomainInformationTooltip />}
            maxWidth="282px"
            disabled={isSitePublished}
          >
            <Box width="100%">
              <TextButton
                size="tiny"
                dataHook={DOMAIN_INFO_DATA_HOOKS.URL}
                ellipsis
                showTooltip={false}
                skin="dark"
                suffixIcon={
                  <ViewLiveSiteIcon isSitePublished={isSitePublished} />
                }
                as="a"
                href={viewUrl}
                disabled={!isSitePublished}
                onClick={onSiteUrlClicked}
                target="_blank"
              >
                {viewUrl}
              </TextButton>
            </Box>
          </Tooltip>
          <Box height="16px">
            {!isDomainConnected && isPermittedToConnected && (
              <PageComponentLink
                pageComponentId={PageComponentId.SiteSettings}
                openInNewTab={false}
                contextData={{
                  appState: 'domains',
                  referrer: 'dashboard-site-details',
                }}
              >
                <TextButton
                  size="tiny"
                  dataHook={DOMAIN_INFO_DATA_HOOKS.CONNECT_CTA}
                  onClick={onConnectDomainClicked}
                >
                  {t(DOMAIN_CTA_KEYS.CONNECT)}
                </TextButton>
              </PageComponentLink>
            )}
            {isDomainConnected && isSitePublished && (
              <TextButton
                size="tiny"
                dataHook={DOMAIN_INFO_DATA_HOOKS.VIEW_LIVE_SITE_CTA}
                as="a"
                href={viewUrl}
                target="_blank"
                onClick={onViewLiveSiteClicked}
              >
                {t('view.live.site')}
              </TextButton>
            )}
          </Box>
        </Layout>
      </Box>
    );
  },
);
