import { SEARCH_API_URL, SEARCH_LIMIT } from '@consts';
import { Article, SearchResult } from '@types';
import axios, { CancelTokenSource } from 'axios';
import { useCallback } from 'react';
import { buildSentryScope } from '../logging.utils';
import { useInstance, useModuleParams, useSentry } from 'yoshi-flow-bm-runtime';

export interface AnswersResult {
  results: Article[];
  totalResults: number;
}

interface CanceledResult {
  canceled: true;
}

export type CancellableSearchResult = SearchResult | CanceledResult;

export const isCanceled = (res: CancellableSearchResult): res is CanceledResult => {
  return (res as CanceledResult).canceled !== undefined;
};

export const buildSearchUrl = (searchTerm: string) =>
  `${SEARCH_API_URL}/${searchTerm}?limit=${SEARCH_LIMIT}`;

let cancelSource: CancelTokenSource | null;

export const useGetArticles = () => {
  const instance = useInstance();
  const sentry = useSentry();
  const { userId, metaSiteId } = useModuleParams();

  return useCallback(
    async (searchTerm: string): Promise<CancellableSearchResult> => {
      try {
        return await fetchArticles(searchTerm, instance);
      } catch (e) {
        if (axios.isCancel(e)) {
          return { canceled: true };
        }
        sentry.captureException(e, undefined, buildSentryScope({ metaSiteId, userId }));
        throw e;
      }
    },
    [instance, sentry, metaSiteId, userId],
  );
};

const fetchArticles = async (searchTerm: string, instance: string) => {
  if (cancelSource) {
    cancelSource.cancel();
  }
  cancelSource = axios.CancelToken.source();

  const {
    data: { results, totalResults },
  } = await axios.get<AnswersResult>(buildSearchUrl(searchTerm), {
    headers: {
      Authorization: instance,
    },
    cancelToken: cancelSource.token,
  });

  cancelSource = null;

  return {
    articles: results.map(({ title, url }) => ({ title, url })),
    totalAmount: totalResults,
  } as SearchResult;
};
