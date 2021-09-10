import React, { FC, useEffect } from 'react';
import { Text, Card, Button, Box, CloseButton } from 'wix-style-react';
import { useTranslation } from '@wix/wix-i18n-config';
import { HappyMomentDataHooks } from './happy-moment.data-hooks';
import * as s from './happy-moment.scss';

interface Props {
  onVisible(): void;
  onClick(): void;
  onCloseClick(): void;
}

export const HappyMomentComponent: FC<Props> = ({
  onClick,
  onCloseClick,
  onVisible,
}) => {
  const [t] = useTranslation();

  useEffect(() => {
    onVisible();
  });

  return (
    <Card dataHook={HappyMomentDataHooks.Container}>
      <Card.Header
        title={t('setup.completed.title')}
        dataHook={HappyMomentDataHooks.CardHeader}
        suffix={
          <CloseButton
            className={s.closeButton}
            dataHook={HappyMomentDataHooks.Close}
            onClick={onCloseClick}
            skin="dark"
            size="medium"
          />
        }
      />
      <Box
        verticalAlign="middle"
        alignItems="space-between"
        padding="0 24px 24px"
      >
        <Box marginRight="80px">
          <Text size="small" dataHook={HappyMomentDataHooks.Content} secondary>
            {t('setup.completed.desc')}
          </Text>
        </Box>
        <Button
          onClick={onClick}
          dataHook={HappyMomentDataHooks.CTA}
          className={s.cta}
        >
          {t('setup.completed.cta')}
        </Button>
      </Box>
    </Card>
  );
};
