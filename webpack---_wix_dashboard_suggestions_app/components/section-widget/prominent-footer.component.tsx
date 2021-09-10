import React from 'react';
import { Text, Box, Button } from 'wix-style-react';
import { useTranslation } from '@wix/yoshi-flow-bm';
import { SectionWidgetDataHooks } from '../../common/hooks';
import ArrowRightSmall from 'wix-ui-icons-common/ArrowRightSmall';

export interface ProminentFooterProps {
  navigateToPageFromFooter: () => void;
}

export const ProminentFooterComponent: React.FC<ProminentFooterProps> = ({
  navigateToPageFromFooter,
}) => {
  const [t] = useTranslation();

  return (
    <Box
      marginTop="12px"
      padding="20px 26px"
      align="center"
      direction="vertical"
      backgroundColor="#E8F1FF"
      borderRadius="8px"
      marginBottom="8px"
      dataHook={SectionWidgetDataHooks.FOOTER_PROMINENT_SEE_ALL_SUGGESTIONS}
    >
      <Box paddingBottom="12px">
        <Text
          size="tiny"
          weight="thin"
          maxWidth="408px"
          dataHook={SectionWidgetDataHooks.FOOTER_PROMINENT_SEE_ALL_SUGGESTIONS_DESCRIPTION}
        >
          {t('suggestion.widget.see.all.description')}
        </Text>
      </Box>
      <Box>
        <Button
          priority="primary"
          size="small"
          suffixIcon={<ArrowRightSmall />}
          onClick={navigateToPageFromFooter}
          dataHook={SectionWidgetDataHooks.FOOTER_PROMINENT_SEE_ALL_SUGGESTIONS_BUTTON}
        >
          {t('suggestion.widget.see.all.cta')}
        </Button>
      </Box>
    </Box>
  );
};
