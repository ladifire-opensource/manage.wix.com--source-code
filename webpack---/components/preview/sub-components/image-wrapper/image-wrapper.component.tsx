import React, { FC, memo } from 'react';
import { Image as ImageComponent } from 'wix-style-react';
import { THUMBNAIL_DATA_HOOK } from '@src/components/data-hooks';

export interface Props {
  url: string;
}

export const ImageWrapper: FC<Props> = memo(({ url }) => {
  return (
    <ImageComponent
      dataHook={THUMBNAIL_DATA_HOOK}
      height={'80px'}
      width={'132px'}
      src={url}
      loading="lazy"
      borderRadius="4px"
    />
  );
});
