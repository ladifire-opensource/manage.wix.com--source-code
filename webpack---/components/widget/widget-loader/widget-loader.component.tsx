import React, { memo, Suspense } from 'react';
import { FAILED_TO_LOAD_DATA_HOOK } from '@components/widget/widget-loader/constants';
import { DashboardWidget, WidgetComponentClass } from '@types';
import { WidgetSkeleton } from './widget-skeleton';
import css from './widget-loader.scss';
import { OnVisibleParams, VisibilityDetector } from '@wix/os-dashboard-shared-components';
import { useTranslation } from '@wix/wix-i18n-config';

export interface Props {
  componentName: string;
  Component: WidgetComponentClass;
  config: DashboardWidget;
  showSkeleton: boolean;
  dataHook: string;
  loading: boolean;
  failedToLoad?: boolean;
  onComponentLoaded: () => void;
  onComponentVisible: (params: OnVisibleParams) => void;
}

const renderFailedToLoadIndicatorForTesting = () => (
  <span data-hook={FAILED_TO_LOAD_DATA_HOOK} style={{ display: 'none' }} />
);

export const WidgetLoaderComponent: React.FC<Props> = memo(
  ({
    componentName,
    Component,
    config: { customData, widgetId, widgetTitleKey, prefetchedRealEstates },
    showSkeleton,
    dataHook,
    loading,
    failedToLoad,
    onComponentLoaded,
    onComponentVisible,
  }) => {
    const { t } = useTranslation();
    const widgetTitle = widgetTitleKey ? t(widgetTitleKey) : undefined;

    return (
      <>
        {showSkeleton && loading && <WidgetSkeleton componentName={componentName} />}
        <VisibilityDetector onVisible={onComponentVisible} isDisabled={loading || failedToLoad}>
          <div data-hook={dataHook} className={loading ? css.loading : css.loaded}>
            <Suspense fallback={<></>}>
              <Component
                onLoaded={onComponentLoaded}
                {...{ ...customData, widgetTitle, prefetchedRealEstates }}
              />
            </Suspense>
          </div>
        </VisibilityDetector>
        {!loading && failedToLoad && renderFailedToLoadIndicatorForTesting()}
      </>
    );
  },
);
