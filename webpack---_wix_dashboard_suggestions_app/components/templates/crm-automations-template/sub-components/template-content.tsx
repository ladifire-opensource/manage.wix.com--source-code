import React, { ReactNode } from 'react';
import { CrmAutomationsDataHooks } from '@src/common/hooks';
import { Box } from 'wix-style-react';
import { TemplateLoader } from '.';
import styles from '../crm-automations-template.scss';

export const AutomationsTemplateContent = ({
  isLoading,
  automationsWidget,
}: {
  isLoading: boolean;
  automationsWidget: ReactNode;
}) => {
  return (
    <Box direction="vertical" width="100%">
      {isLoading && <TemplateLoader />}
      <div
        className={isLoading ? styles.loading : ''}
        data-hook={CrmAutomationsDataHooks.CRM_AUTOMATIONS_TEMPLATE_WIDGET_DATA_HOOK}
        onClick={e => {
          e.stopPropagation();
        }}
      >
        {automationsWidget}
      </div>
    </Box>
  );
};
