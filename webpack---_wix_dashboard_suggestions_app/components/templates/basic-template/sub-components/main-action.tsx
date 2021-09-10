import React from 'react';
import { useTranslation } from '@wix/yoshi-flow-bm';
import { TextButton } from 'wix-style-react';
import { BasicTemplateDataHooks } from '@src/common/hooks';
import { CTA, MainCtaClickParams } from '@src/common/types';

export interface BasicTemplateMainActionProps {
  cta: CTA;
  onCTAClick: (params: MainCtaClickParams) => void;
}
export const BasicTemplateMainAction: React.FC<BasicTemplateMainActionProps> = props => {
  const { cta, onCTAClick } = props;
  const [t] = useTranslation();

  const onCtaClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();
    onCTAClick({ cta });
  };

  return (
    <TextButton
      ellipsis
      as="button"
      size="tiny"
      skin="standard"
      weight="normal"
      onClick={onCtaClick}
      underline="none"
      dataHook={BasicTemplateDataHooks.BASIC_TEMPLATE_MAIN_CTA_DATA_HOOK}
    >
      {t(cta?.titleKey)}
    </TextButton>
  );
};
