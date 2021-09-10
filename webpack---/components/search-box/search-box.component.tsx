import { SEARCH_DEBOUNCE } from '@consts';
import { EMPTY_STATE, ERROR_STATE, SEARCH_BOX_DATAHOOK } from '@data-hooks';
import React, { ChangeEvent, FC, useCallback, useMemo } from 'react';
import {
  DropdownLayoutOption,
  listItemSectionBuilder,
  listItemSelectBuilder,
  Search,
  Box,
} from 'wix-style-react';
import { ArticleSmall } from 'wix-ui-icons-common';
import { useTranslation } from 'yoshi-flow-bm-runtime';
import { SearchMessage, SearchStatus, Loader } from '.';

export interface SearchItem {
  title: string;
}

interface SearchBoxProps {
  items: SearchItem[];
  footer?: JSX.Element;
  status: SearchStatus;
  onInputChange: (value: string) => void;
  onItemSelect: (index: number) => void;
  replaceSearchTermPlaceholder: (string: string) => string;
}

export const SearchBoxComponent: FC<SearchBoxProps> = ({
  items,
  footer,
  status,
  onInputChange,
  onItemSelect,
  replaceSearchTermPlaceholder,
}) => {
  const { t } = useTranslation();

  const options = useMemo((): DropdownLayoutOption[] => {
    if (status === SearchStatus.INITIAL) {
      return [];
    }

    if (status === SearchStatus.ERROR) {
      return createState(
        t('search.error-state.title'),
        t('search.error-state.subtitle'),
        ERROR_STATE,
      );
    }

    if (status === SearchStatus.LOADING) {
      return createSearchMessage(<Loader />);
    }

    if (!items.length) {
      return createState(
        replaceSearchTermPlaceholder(t('search.empty-state.title')),
        t('search.empty-state.subtitle'),
        EMPTY_STATE,
      );
    }

    return createSearchResults(items, footer);
  }, [items, footer, status, replaceSearchTermPlaceholder, t]);

  const inputChanged = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => onInputChange(value),
    [onInputChange],
  );

  const itemSelected = useCallback(({ id }: DropdownLayoutOption) => onItemSelect(id as number), [
    onItemSelect,
  ]);

  return (
    <Search
      dataHook={SEARCH_BOX_DATAHOOK}
      placeholder={t('search.placeholder')}
      highlight={false} // Remove once bug in WSR is fixed
      showOptionsIfEmptyInput={false}
      debounceMs={SEARCH_DEBOUNCE}
      onChange={inputChanged}
      onSelect={itemSelected}
      options={options}
      predicate={() => true}
      size="small"
    />
  );
};

const createSearchMessage = (content: JSX.Element): DropdownLayoutOption[] => [
  {
    value: content,
    id: -2,
    overrideOptionStyle: true,
  },
];

const createState = (title: string, subtitle: string, dataHook: string): DropdownLayoutOption[] =>
  createSearchMessage(<SearchMessage title={title} subtitle={subtitle} dataHook={dataHook} />);

const createSearchResults = (items: SearchItem[], footer?: JSX.Element): DropdownLayoutOption[] => {
  const results = items.map(
    ({ title }, index): DropdownLayoutOption =>
      listItemSelectBuilder({
        title,
        id: index,
        prefix: (
          <Box>
            <ArticleSmall />
          </Box>
        ),
      }),
  );

  if (footer) {
    results.push(listItemSectionBuilder({ type: 'divider', id: -1 }));
    results.push({
      value: footer,
      id: -2,
    });
  }

  return results;
};
