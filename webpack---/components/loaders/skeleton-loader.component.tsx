import React, { FC } from 'react';
import { Box, BoxProps, Card, SkeletonGroup, SkeletonLine } from 'wix-style-react';

export interface SkeletonLoaderProps {
  height: BoxProps['height'];
}

export const SkeletonLoader: FC<SkeletonLoaderProps> = ({ height }) => (
  <Card>
    <Card.Content>
      <SkeletonGroup skin="light">
        <Box direction="vertical" height={height}>
          <SkeletonLine marginBottom="5px" />
          <SkeletonLine marginBottom="5px" />
          <SkeletonLine marginBottom="5px" />
        </Box>
      </SkeletonGroup>
    </Card.Content>
  </Card>
);
