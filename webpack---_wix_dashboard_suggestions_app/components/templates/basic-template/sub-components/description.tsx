import React from 'react';
import { Text } from 'wix-style-react';
import styles from '../basic-template.scss';
import { BasicTemplateDataHooks } from '@src/common/hooks';
import { useTranslation } from '@wix/yoshi-flow-bm';
import { getNonWidowsText } from '@src/common/utils';

export interface BasicTemplateDescriptionProps {
  descriptionKey: string;
  dataHook?: string;
}
export const BasicTemplateDescription: React.FC<BasicTemplateDescriptionProps> = ({
  dataHook,
  descriptionKey,
}) => {
  const [t] = useTranslation();
  return (
    <Text
      dataHook={dataHook || BasicTemplateDataHooks.BASIC_TEMPLATE_DESCRIPTION_DATA_HOOK}
      className={styles.description}
      size="tiny"
      skin="standard"
      tagName="div"
      weight="thin"
      maxLines={3}
    >
      {getNonWidowsText(t(descriptionKey))}
    </Text>
  );
};
