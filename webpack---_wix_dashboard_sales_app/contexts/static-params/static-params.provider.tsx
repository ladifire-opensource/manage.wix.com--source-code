import { SITE_NAME_MAX_LENGTH, SITE_NAME_FALLBACK, DOMAIN_NAME_FALLBACK } from '@consts';
import React, { useState, FunctionComponent } from 'react';
import { StaticParamsContext, StaticParams } from './static-params.context';

interface StaticParamsProviderProps {
  params: StaticParams;
}

export const StaticParamsProvider: FunctionComponent<StaticParamsProviderProps> = ({
  params: { siteName, primaryDomain },
  children,
}) => {
  const [_siteName] = useState(
    siteName && siteName.length <= SITE_NAME_MAX_LENGTH ? siteName : SITE_NAME_FALLBACK,
  );

  const [_primaryDomain] = useState(primaryDomain || DOMAIN_NAME_FALLBACK);

  return (
    <StaticParamsContext.Provider
      value={{
        siteName: _siteName,
        primaryDomain: _primaryDomain,
      }}
    >
      {children}
    </StaticParamsContext.Provider>
  );
};
