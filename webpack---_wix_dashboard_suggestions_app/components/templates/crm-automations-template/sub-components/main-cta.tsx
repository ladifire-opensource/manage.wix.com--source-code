import React from 'react';
import { CrmAutomationsDataHooks } from '@src/common/hooks';
import { Box, TextButton } from 'wix-style-react';
import ChevronRight from 'wix-ui-icons-common/ChevronRight';

export const MainCTA = ({
  onClick,
  text,
  baseLayout,
}: {
  onClick(e: React.MouseEvent): void;
  baseLayout: boolean;
  text: string;
}) => {
  return (
    <TextButton
      as="button"
      size="tiny"
      skin="standard"
      weight={baseLayout ? 'normal' : 'thin'}
      suffixIcon={
        baseLayout ? undefined : (
          <Box marginLeft="-6px" direction="vertical">
            <ChevronRight />
          </Box>
        )
      }
      onClick={onClick}
      underline="none"
      dataHook={CrmAutomationsDataHooks.CRM_AUTOMATIONS_TEMPLATE_MAIN_CTA_DATA_HOOK}
    >
      {text}
    </TextButton>
  );
};
