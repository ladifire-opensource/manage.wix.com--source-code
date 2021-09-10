import { SEARCH_RESULTS_FOOTER } from '@data-hooks';
import React, { FC } from 'react';
import { TextButton } from 'wix-style-react';
import { useTranslation } from 'yoshi-flow-bm-runtime';

interface SearchFooterComponentProps {
  onClick(): void;
}

export const SearchFooterComponent: FC<SearchFooterComponentProps> = ({ onClick }) => {
  const { t } = useTranslation();
  return (
    <TextButton size="tiny" onClick={onClick} dataHook={SEARCH_RESULTS_FOOTER}>
      {t('search.footer')}
    </TextButton>
  );
};
