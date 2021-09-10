import React, { FC } from 'react';
import { useAppLoaded, useModuleParams } from '@wix/yoshi-flow-bm';
import { getCurrentInstance } from '@wix/business-manager-api';

const Index: FC = () => {
  useAppLoaded({ auto: true });
  const { metaSiteId } = useModuleParams();
  const signedInstance = getCurrentInstance(
    '22549697-66d7-40c7-961d-b7b31dd4b49b',
  );

  const searchParams = new URLSearchParams(window.location.search);
  const connectDomainParam = searchParams.get('connectDomain');
  const connectDomainQuery =
    connectDomainParam === 'true' ? '&connectDomain=true' : '';

  const searchDomainParam = searchParams.get('domainSearch');
  const domainNameFromParams = searchParams.get('domainName');

  const searchDomainQuery =
    domainNameFromParams && searchDomainParam === 'true'
      ? `&domainSearch=true&domainName=${domainNameFromParams}`
      : '';

  return (
    <iframe
      title="my domains"
      height="100%"
      width="100%"
      src={`/wix/api/mpContainerStaticController#/domains?metasiteId=${metaSiteId}&siteManager=true${connectDomainQuery}${searchDomainQuery}&referralAdditionalInfo=settings-lobby&signedInstance=${signedInstance}`}
    />
  );
};

export default Index;
