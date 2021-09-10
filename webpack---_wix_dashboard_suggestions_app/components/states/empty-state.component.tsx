import React from 'react';
import { Image, EmptyState as WSREmptyState } from 'wix-style-react';
import { useTranslation } from '@wix/yoshi-flow-bm';
import { GeneralDataHooks } from '../../common/hooks';
import image from '../../assets/images/suggestion-section-empty.svg';

export const EmptyState = () => {
  const [t] = useTranslation();

  return (
    <WSREmptyState
      dataHook={GeneralDataHooks.EMPTY_STATE_DATA_HOOK}
      theme="section"
      image={
        <Image
          width="60px"
          height="60px"
          src={image}
          style={{ background: 'transparent' }}
          loading="lazy"
        />
      }
      title={t('suggestion.widget.emptystate.title')}
      subtitle={t('suggestion.widget.emptystate.subtitle')}
    />
  );
};
