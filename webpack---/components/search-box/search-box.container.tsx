import { SearchFooter } from '@components/search-footer';
import {
  DASHBOARD_HELP_WIDGET_SUPPORT_SOURCE_ID,
  EMPTY_STATE_SEARCH_TERM_PLACEHOLDER,
  REFERRAL,
} from '@consts';
import { isCanceled, useGetArticles, CancellableSearchResult } from '@hooks/answers';
import { Article } from '@types';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { useBILogger, useModuleParams } from 'yoshi-flow-bm-runtime';
import { SearchBoxComponent } from '.';
import URI from 'urijs';

export enum SearchStatus {
  ERROR = 'error',
  LOADING = 'loading',
  SUCCESS = 'success',
  INITIAL = 'initial',
}

export const SearchBox: FC = () => {
  const [items, setItems] = useState<Article[]>([]);
  const [shouldShowFooter, setShouldShowFooter] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchStatus, setSearchStatus] = useState<SearchStatus>(SearchStatus.INITIAL);

  const getArticles = useGetArticles();
  const bi = useBILogger();
  const { viewMode, metaSiteId } = useModuleParams();

  const biSuccessParams = useMemo(
    () => ({
      msid: metaSiteId,
      dashboard_hosting: viewMode,
      question: searchTerm,
      source_name: DASHBOARD_HELP_WIDGET_SUPPORT_SOURCE_ID,
    }),
    [metaSiteId, viewMode, searchTerm],
  );

  const biErrorParams = useMemo(
    () => ({
      msid: metaSiteId,
      hosting: viewMode,
    }),
    [metaSiteId, viewMode],
  );

  const replaceSearchTermPlaceholder = useCallback(
    string => string.replace(EMPTY_STATE_SEARCH_TERM_PLACEHOLDER, searchTerm),
    [searchTerm],
  );

  const itemSelected = useCallback(
    index => {
      if (index < 0) {
        return;
      }

      const url = items?.[index].url;
      bi.clickOnAnswer({ ...biSuccessParams, item_url: url, order: `${index}` });
      const urlWithReferral = new URI(url).addSearch('referral', REFERRAL).toString();
      window.open(urlWithReferral);
    },
    [items, bi, biSuccessParams],
  );

  const searchTermChanged = useCallback(
    async value => {
      setSearchTerm(value);
      if (!value) {
        setSearchStatus(SearchStatus.INITIAL);
        return;
      }

      setSearchStatus(SearchStatus.LOADING);

      let result: CancellableSearchResult;

      try {
        result = await getArticles(value);
      } catch (e) {
        setSearchStatus(SearchStatus.ERROR);
        bi.helpWidgetErrorSearchingItems({
          ...biErrorParams,
          query: value,
        });
        return;
      }

      if (isCanceled(result)) {
        return;
      }

      const first_answer = result.articles[0]?.title;

      if (first_answer) {
        bi.askingAQuestion({ ...biSuccessParams, question: value, first_answer });
      } else {
        bi.gotNoAnswer({ ...biSuccessParams, question: value });
      }

      setItems(result.articles);
      setShouldShowFooter(result.totalAmount > 10);
      setSearchStatus(SearchStatus.SUCCESS);
    },
    [setSearchTerm, setItems, getArticles, bi, biSuccessParams, biErrorParams],
  );

  const footer = shouldShowFooter ? <SearchFooter searchTerm={searchTerm} /> : undefined;

  return (
    <SearchBoxComponent
      replaceSearchTermPlaceholder={replaceSearchTermPlaceholder}
      onInputChange={searchTermChanged}
      onItemSelect={itemSelected}
      footer={footer}
      items={items}
      status={searchStatus}
    />
  );
};
