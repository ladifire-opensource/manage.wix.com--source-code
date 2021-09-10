import React, { FC } from 'react';
import { ImageWrapper } from './image-wrapper.component';
import { useModuleParams } from 'yoshi-flow-bm-runtime';

export const ImageWrapperContainer: FC = () => {
  const { metaSiteId } = useModuleParams();
  const thumbUrl = `/site-thumbnail/${metaSiteId}?preset=site-details-horizontal`;

  return <ImageWrapper url={thumbUrl} />;
};
