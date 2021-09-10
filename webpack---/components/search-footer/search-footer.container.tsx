import { REFERRAL, SUPPORT_URL } from '@consts';
import React, { FC, useCallback } from 'react';
import URI from 'urijs';
import { useBILogger, useModuleParams } from 'yoshi-flow-bm-runtime';
import { SearchFooterComponent } from './search-footer.component';

export interface SearchFooterProps {
  searchTerm: string;
}

export const SearchFooter: FC<SearchFooterProps> = ({ searchTerm }) => {
  const { accountLanguage, viewMode, metaSiteId } = useModuleParams();
  const bi = useBILogger();

  const openMoreResults = useCallback(() => {
    bi.helpWidgetClickOnSeeAllResults({ query: searchTerm, hosting: viewMode, msid: metaSiteId });

    const url = new URI(`${SUPPORT_URL}/${accountLanguage}/search`)
      .addSearch('term', searchTerm)
      .addSearch('referral', REFERRAL)
      .toString();

    window.open(url);
  }, [searchTerm, accountLanguage, bi, viewMode, metaSiteId]);

  return <SearchFooterComponent onClick={openMoreResults} />;
};
