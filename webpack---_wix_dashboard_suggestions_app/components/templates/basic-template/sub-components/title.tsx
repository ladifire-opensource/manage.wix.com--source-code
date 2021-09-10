import { Box, Text } from 'wix-style-react';
import React from 'react';
import { BasicTemplateDataHooks } from '@src/common/hooks';
import s from '../basic-template.scss';
import { useTranslation } from '@wix/yoshi-flow-bm';
import { getNonWidowsText } from '@src/common/utils';

export interface BasicTemplateTitleProps {
  titleKey: string;
  dataHook?: string;
}
export const BasicTemplateTitle: React.FC<BasicTemplateTitleProps> = ({ titleKey, dataHook }) => {
  const [t] = useTranslation();

  return (
    <Box align="left">
      <Text
        dataHook={dataHook || BasicTemplateDataHooks.BASIC_TEMPLATE_TITLE_DATA_HOOK}
        showTooltip={false}
        size="small"
        skin="standard"
        tagName="span"
        weight="bold"
        maxLines={2}
        className={s.title}
      >
        {getNonWidowsText(t(titleKey))}
      </Text>
    </Box>
  );
};
