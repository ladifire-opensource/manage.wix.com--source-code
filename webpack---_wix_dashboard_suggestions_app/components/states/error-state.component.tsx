import React from 'react';
import { EmptyState } from 'wix-style-react';
import { useTranslation } from '@wix/yoshi-flow-bm';
import { GeneralDataHooks } from '../../common/hooks';

export const ErrorState = () => {
  const [t] = useTranslation();

  return (
    <EmptyState
      dataHook={GeneralDataHooks.ERROR_STATE_DATA_HOOK}
      theme="section"
      title={t('suggestions.widget.loading.failed.title')}
      subtitle={t('suggestions.widget.loading.failed.error')}
    />
  );
};
