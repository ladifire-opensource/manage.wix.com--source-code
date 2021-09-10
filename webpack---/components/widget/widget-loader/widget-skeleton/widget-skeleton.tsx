import * as React from 'react';
import { Box, Skeleton } from 'wix-style-react';
import { getWidgetSkeletonContent, SkeletonContentResult } from './widget-skeleton-map';
import * as css from './widget-skeleton.scss';

export const skeletonContainerDataHook = 'business-dashboard-skeleton-container';
export const skeletonDataHook = 'business-dashboard-skeleton';
export const skeletonEmptyDataHook = 'business-dashboard-empty-skeleton';

export const WidgetSkeletonContent = React.memo(
  ({ skeleton }: { skeleton: SkeletonContentResult }) => (
    <div
      className={css.container}
      style={{ height: skeleton.height }}
      data-hook={skeletonContainerDataHook}
    >
      <div className={css.skeleton}>
        <Skeleton dataHook={skeletonDataHook} content={skeleton.content!} spacing="small" />
      </div>
    </div>
  ),
);

export interface Props {
  componentName: string;
}

export const WidgetSkeleton = React.memo(({ componentName }: Props) => {
  const skeleton = getWidgetSkeletonContent(componentName);

  if (skeleton.content) {
    return <WidgetSkeletonContent skeleton={skeleton} />;
  }

  if (skeleton.height) {
    return <Box dataHook={skeletonEmptyDataHook} height={skeleton.height}></Box>;
  }

  return null;
});
