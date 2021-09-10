import React, { memo, FC, useContext, useEffect } from 'react';
import { AppContext } from '../app-context/app-context';
import { ConnectivityStatus } from '@wix/dashboard-site-details-api';
import {
  DomainInformation,
  DOMAIN_CTA_KEYS,
} from './domain-information.component';
import { useModuleParams, useTranslation } from 'yoshi-flow-bm-runtime';
import { Permissions } from '@src/types';

export const DomainInformationContainer: FC = memo(() => {
  const {
    widgetData: { domain, unpublishedSiteUrl },
    services: { biLogger, propagationToast },
  } = useContext(AppContext);
  const { liveSite, userPermissions, siteName } = useModuleParams();
  const { viewUrl, isSitePublished } = liveSite!;
  const [t] = useTranslation();

  useEffect(() => {
    if (domain?.connectivityStatus === ConnectivityStatus.PROPAGATION) {
      propagationToast.show();
    }
  }, [domain, propagationToast, t]);

  const handleConnectDomainClicked = () => {
    biLogger.sendClickInDashboard(DOMAIN_CTA_KEYS.CONNECT);
  };

  const handleViewLiveSiteClicked = () => {
    biLogger.sendClickInDashboard(DOMAIN_CTA_KEYS.VIEW_LIVE_SITE);
  };

  const handleSiteUrlClicked = () => {
    biLogger.sendClickInDashboard(DOMAIN_CTA_KEYS.SITE_URL);
  };

  const isPermittedToConnected = userPermissions.includes(
    Permissions.CONNECT_DOMAIN,
  );

  const isDomainConnected =
    domain?.connectivityStatus === ConnectivityStatus.OK;

  const displayUrl = isSitePublished ? viewUrl : unpublishedSiteUrl!;

  return (
    <DomainInformation
      siteName={siteName}
      isDomainConnected={isDomainConnected}
      viewUrl={displayUrl}
      isPermittedToConnected={isPermittedToConnected}
      isSitePublished={isSitePublished}
      onConnectDomainClicked={handleConnectDomainClicked}
      onViewLiveSiteClicked={handleViewLiveSiteClicked}
      onSiteUrlClicked={handleSiteUrlClicked}
    />
  );
});
