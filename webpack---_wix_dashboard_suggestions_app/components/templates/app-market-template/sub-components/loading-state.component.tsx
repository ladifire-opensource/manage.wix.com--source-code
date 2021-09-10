import { AppMarketTemplateDataHooks } from '@src/common/hooks';
import React, { FC } from 'react';
import { SkeletonGroup, Box, SkeletonRectangle, SkeletonLine, Divider } from 'wix-style-react';

export const LoadingState: FC = () => (
  <SkeletonGroup skin="light" dataHook={AppMarketTemplateDataHooks.LOADING_STATE}>
    {[1, 2, 3].map((_val, index) => (
      <AppSkeleton key={_val} isLastInTheList={index === 2} />
    ))}
  </SkeletonGroup>
);

interface AppSkeletonProps {
  isLastInTheList: boolean;
}

const AppSkeleton: FC<AppSkeletonProps> = ({ isLastInTheList }) => (
  <Box direction="vertical" paddingTop="12px">
    <Box>
      <Box paddingRight="12px" width="32px" height="32px">
        <SkeletonRectangle width="32px" />
      </Box>
      <Box direction="vertical" flex="1">
        <Box direction="vertical" flex="1" maxWidth="296px">
          <SkeletonLine marginBottom="8px" width="167px" />
          <Box direction="vertical" minWidth="296px" paddingBottom="12px">
            <SkeletonLine marginBottom="5px" />
          </Box>
        </Box>
        {!isLastInTheList && <Divider />}
      </Box>
    </Box>
    {isLastInTheList && <Divider />}
  </Box>
);
