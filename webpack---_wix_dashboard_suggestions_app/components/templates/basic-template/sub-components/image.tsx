import React from 'react';
import { Image, Box } from 'wix-style-react';
import { BasicTemplateDataHooks } from '@src/common/hooks';
import styles from '../basic-template.scss';
import { ViewType } from '@src/common/types';

export interface BasicTemplateImageProps {
  viewType: ViewType;
  thumbnailUrl: string;
  width: string;
  height: string;
  marginRight: string;
  hasShadow: boolean;
}

export const BasicTemplateImage: React.FC<BasicTemplateImageProps> = ({
  thumbnailUrl,
  hasShadow,
  width,
  height,
  marginRight,
}) => {
  if (!thumbnailUrl) {
    return null;
  }

  return (
    <Box
      marginRight={marginRight}
      minWidth={width}
      maxWidth={width}
      height={height}
      className={`${styles.imageContainer} ${hasShadow ? styles.shadow : ''}`}
    >
      <Image
        className={styles.image}
        borderRadius="4px"
        src={thumbnailUrl}
        dataHook={BasicTemplateDataHooks.BASIC_TEMPLATE_THUMBNAIL_DATA_HOOK}
        loading="lazy"
        width={width}
        height={height}
      />
    </Box>
  );
};
