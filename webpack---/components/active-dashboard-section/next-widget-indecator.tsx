import { Box, BoxProps, Text } from 'wix-style-react';
import { ADD_WIDGETS_PLACEHOLDER_DATA_HOOK } from '@components/active-dashboard-section/consts';
import React from 'react';
import { useTranslation } from 'yoshi-flow-bm-runtime';

export const NextWidgetIndicator = () => {
  const { t } = useTranslation();

  const styles: BoxProps = {
    borderWidth: '1px',
    borderStyle: 'dashed',
    borderColor: 'rgba(0, 6, 36, 0.3)',
    borderRadius: '8px',
    height: '148px',
    boxSizing: 'border-box',
    padding: '24px 48px',
    verticalAlign: 'middle',
    align: 'center',
    textAlign: 'center',
    marginBottom: '24px',
  };

  return (
    <Box dataHook={ADD_WIDGETS_PLACEHOLDER_DATA_HOOK} {...styles}>
      <Text size="tiny" skin="disabled">
        {t('dashboard.customization.placeholder')}
      </Text>
    </Box>
  );
};
