import React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import style from './style.scss';

import { Box, Text, Heading, TextButton } from 'wix-style-react';

interface ErrorStateProps extends WithTranslation {
  onRefresh: () => Promise<void>;
}

const ErrorStateComponent = (({ t, onRefresh }: ErrorStateProps) => (
  <Box className={style.errorStateContainer} dataHook="error-state" align="center" direction="vertical" maxWidth="80%" textAlign="center">
      <Heading appearance="H3">{t('notifications.error_state_title')}</Heading>
      <Text>{t('notifications.error_state_sub_title')}</Text>
      <Box marginBlockStart={25}>
        <TextButton onClick={onRefresh} dataHook="refresh-button">
          {t('notifications.refresh')}
        </TextButton>
      </Box>
  </Box>
));

export const ErrorState = withTranslation()(ErrorStateComponent);
