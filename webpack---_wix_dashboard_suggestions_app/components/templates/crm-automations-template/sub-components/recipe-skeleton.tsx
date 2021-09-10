import React from 'react';
import { Box, SkeletonLine, SkeletonRectangle } from 'wix-style-react';
import styles from '../crm-automations-template.scss';

export const RecipeSkeleton = () => {
  return (
    <Box
      className={styles.section}
      direction="vertical"
      height="100%"
      paddingTop="12px"
      paddingLeft="12px"
      paddingRight="24px"
      paddingBottom="24px"
    >
      <Box marginBottom="12px">
        <SkeletonRectangle width="30px" height="30px" />
      </Box>
      <Box marginBottom="8px" direction="vertical" width="100%">
        <SkeletonLine />
      </Box>
      <Box direction="vertical" width="60%">
        <SkeletonLine />
      </Box>
    </Box>
  );
};
