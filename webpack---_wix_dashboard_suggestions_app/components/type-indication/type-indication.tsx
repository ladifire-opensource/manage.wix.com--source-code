import { Box, Heading } from 'wix-style-react';
import React from 'react';
import { useTranslation } from '@wix/yoshi-flow-bm';
import { getNonWidowsText } from '@src/common/utils';
import { TemplateType } from '@src/common/types';

export interface TypeIndicationProps {
  type: TemplateType;
  dataHook: string;
}

const templateTypeToTitleKey: Partial<Record<TemplateType, string>> = {
  [TemplateType.APP_MARKET]: 'suggestion.widget.type.app',
};

export const TypeIndication: React.FC<TypeIndicationProps> = ({ type, dataHook }) => {
  const [t] = useTranslation();
  const typeIndicationTittleKey = templateTypeToTitleKey[type];
  if (!typeIndicationTittleKey) {
    return null;
  }
  return (
    <Box align="left" dataHook={dataHook}>
      <Heading appearance="H6">{getNonWidowsText(t(typeIndicationTittleKey))}</Heading>
    </Box>
  );
};
