import React, { FC } from 'react';
import { Box, BoxProps } from 'wix-style-react';

export interface EmptyLoaderProps {
  height: BoxProps['height'];
}

export const EmptyLoader: FC<EmptyLoaderProps> = ({ height }) => <Box height={height} />;
