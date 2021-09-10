import React from 'react';
import { CrmAutomationsDataHooks } from '@src/common/hooks';
import { Box, SkeletonGroup, Layout, Cell } from 'wix-style-react';
import { RecipeSkeleton } from '.';
import styles from '../crm-automations-template.scss';

export const TemplateLoader = () => {
  return (
    <Box
      width="100%"
      direction="vertical"
      dataHook={CrmAutomationsDataHooks.CRM_AUTOMATIONS_TEMPLATE_SKELETON_DATA_HOOK}
    >
      <SkeletonGroup className={styles.loaderContainer} skin="light">
        <Layout gap="12px" rowHeight="1fr">
          <Cell span={4}>
            <RecipeSkeleton />
          </Cell>
          <Cell span={4}>
            <RecipeSkeleton />
          </Cell>
          <Cell span={4}>
            <RecipeSkeleton />
          </Cell>
        </Layout>
      </SkeletonGroup>
    </Box>
  );
};
