import { GeneralDataHooks, SkippedDataHooks } from '@src/common/hooks';
import React from 'react';
import { Box, IconButton, Layout, Text, TextButton } from 'wix-style-react';
import { useTranslation } from '@wix/yoshi-flow-bm';
import DismissSmall from 'wix-ui-icons-common/DismissSmall';
import styles from './skipped.scss';
import { ViewType } from '@src/common/types';

export interface SkippedComponentProps {
  prefixIcon?: JSX.Element;
  viewType: ViewType;
  title: string;
  description: string;
  onCloseClick: () => void;
  onSeeMoreClick: () => void;
}

export const SkippedComponent: React.FC<SkippedComponentProps> = ({
  viewType,
  title,
  description,
  prefixIcon,
  onCloseClick,
  onSeeMoreClick,
}) => {
  const [t] = useTranslation();

  return (
    <Box
      dataHook={GeneralDataHooks.SKIPPED_DATAHOOK}
      className={viewType === ViewType.TOP ? styles.top : styles.section}
      direction="vertical"
      align="center"
      verticalAlign="middle"
    >
      <Layout justifyItems="center" cols={1} gap="4px">
        <Box gap="8px">
          {prefixIcon}
          <Text
            dataHook={SkippedDataHooks.TITLE}
            showTooltip={false}
            size="small"
            skin="standard"
            tagName="div"
            weight="bold"
          >
            {title}
          </Text>
        </Box>
        <Box paddingLeft="19px" paddingRight="21px">
          <Text
            dataHook={SkippedDataHooks.DESCRIPTION}
            size="tiny"
            skin="standard"
            tagName="div"
            weight="thin"
          >
            {description}
          </Text>
        </Box>
        {viewType === ViewType.TOP && (
          <Box paddingTop="8px">
            <TextButton
              dataHook={SkippedDataHooks.SKIPPED_CTA}
              onClick={onSeeMoreClick}
              underline="none"
              size="tiny"
              weight="normal"
            >
              {t('suggestion.see.more')}
            </TextButton>
          </Box>
        )}
      </Layout>
      <IconButton
        className={styles.dismiss}
        dataHook={SkippedDataHooks.BUTTON}
        onClick={onCloseClick}
        size="tiny"
        priority="secondary"
        skin="inverted"
      >
        <DismissSmall />
      </IconButton>
    </Box>
  );
};
