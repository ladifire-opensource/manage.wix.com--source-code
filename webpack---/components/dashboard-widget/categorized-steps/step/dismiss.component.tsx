import React, { FC, MouseEvent } from 'react';
import { TextButton } from 'wix-style-react';
import { useTranslation } from 'yoshi-flow-bm-runtime';
import { StepDataHooks as Hooks } from './step.data-hooks';

interface dismissProps {
  onDismiss(): void;
}

export const DismissButton: FC<dismissProps> = (props: dismissProps) => {
  const { onDismiss } = props;

  const [t] = useTranslation();

  return (
    <TextButton
      size="tiny"
      onClick={(e: MouseEvent) => {
        e.stopPropagation();
        onDismiss();
      }}
      dataHook={Hooks.StepDismiss}
    >
      {t('step.action.skip')}
    </TextButton>
  );
};
