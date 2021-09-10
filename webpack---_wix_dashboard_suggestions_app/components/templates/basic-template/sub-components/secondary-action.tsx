import React, { useCallback } from 'react';
import { TextButton } from 'wix-style-react';
import { useTranslation } from '@wix/yoshi-flow-bm';
import { BasicTemplateDataHooks } from '@src/common/hooks';

export interface BasicTemplateSecondaryActionProps {
  titleKey: string;
  onClick?: () => void;
}
export const BasicTemplateSecondaryAction: React.FC<BasicTemplateSecondaryActionProps> = ({
  onClick,
  titleKey,
}) => {
  const [t] = useTranslation();

  const _onClick = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      event.currentTarget.blur();
      event.stopPropagation();
      return onClick?.();
    },
    [onClick],
  );

  return (
    <TextButton
      dataHook={BasicTemplateDataHooks.BASIC_TEMPLATE_LEARN_MORE_DATA_HOOK}
      as="a"
      onClick={_onClick}
      underline="none"
      size="tiny"
      target="_blank"
      weight="thin"
    >
      {t(titleKey)}
    </TextButton>
  );
};
