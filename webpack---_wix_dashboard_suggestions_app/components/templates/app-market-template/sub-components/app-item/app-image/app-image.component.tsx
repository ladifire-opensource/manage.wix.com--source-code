import { AppMarketTemplateDataHooks } from '@src/common/hooks';
import React, { FC, memo } from 'react';
import { Image, Box } from 'wix-style-react';

export interface AppImageComponentProps {
  src?: string;
  onError: () => void;
}

export const AppImageComponent: FC<AppImageComponentProps> = memo(({ src, onError }) => (
  <Box width="32px" height="32px">
    <Image
      dataHook={AppMarketTemplateDataHooks.APP_IMAGE}
      borderRadius="4px"
      src={src}
      onError={onError}
      transparent
    />
  </Box>
));
