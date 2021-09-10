import { RecommendedApp } from '@src/common/templates';
import { ViewType } from '@src/common/types';
import { OnVisibleParams, VisibilityDetector } from '@wix/os-dashboard-shared-components';
import React, { FC, useCallback } from 'react';
import { CtaClickParams, AppItemViewParams } from '../../app-market-template.container';
import { AppItemComponent } from './app-item.component';

export interface AppItemProps extends RecommendedApp {
  isLastInTheList?: boolean;
  index: number;
  viewType: ViewType;
  onAppItemCtaClicked: (params: CtaClickParams) => void;
  onAppItemViewed: (params: AppItemViewParams) => void;
}

export const AppItem: FC<AppItemProps> = ({
  index,
  onAppItemCtaClicked,
  onAppItemViewed,
  cta,
  ...componentProps
}) => {
  const onCtaClick = useCallback(
    () => onAppItemCtaClicked({ id: componentProps.id, index, cta }),
    [onAppItemCtaClicked, componentProps, index, cta],
  );

  const onItemView = useCallback(
    ({ isFirstCheck }: OnVisibleParams) =>
      onAppItemViewed({ id: componentProps.id, index, initialInViewport: isFirstCheck }),
    [onAppItemViewed, componentProps, index],
  );

  return (
    <VisibilityDetector onVisible={onItemView}>
      <div>
        <AppItemComponent {...componentProps} onCtaClick={onCtaClick} />
      </div>
    </VisibilityDetector>
  );
};
