import { AppMarketTemplateDataHooks } from '@src/common/hooks';
import { useTranslation } from '@wix/yoshi-flow-bm';
import React, { useCallback, FC } from 'react';
import { TextButton } from 'wix-style-react';

export interface CtaButtonProps {
  titleKey: string;
  weight?: 'normal' | 'thin';
  suffix?: React.ReactElement;
  onCtaClick: () => void;
}

export const CtaButton: FC<CtaButtonProps> = ({
  titleKey,
  weight = 'thin',
  suffix,
  onCtaClick,
}) => {
  const { t } = useTranslation();

  const onClick = useCallback(() => {
    onCtaClick();
  }, [onCtaClick]);

  return (
    <TextButton
      ellipsis
      as="button"
      size="tiny"
      skin="standard"
      weight={weight}
      suffixIcon={suffix}
      onClick={onClick}
      underline="none"
      dataHook={AppMarketTemplateDataHooks.MAIN_CTA}
    >
      {t(titleKey)}
    </TextButton>
  );
};
