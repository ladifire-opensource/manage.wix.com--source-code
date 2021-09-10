import React, { FC, useMemo, memo } from 'react';
import { ModuleRegistry } from 'react-module-container';
import { useModuleParams } from 'yoshi-flow-bm-runtime';
import { Widget } from '@components/widget';
import { WidgetComponentClass } from '@types';
import { DASHBOARD_SALES_BANNER_COMPONENT_NAME, DASHBOARD_SALES_BANNER_WIDGET_ID } from '@consts';
import { useServices } from '@hooks/services';
import { createSentryScope } from '@services/sentry';
import styles from './sticky-banner.component.scss';

export const STICKY_BANNER_DATA_HOOK = 'business-dashboard-sticky-banner';

export const StickyBanner: FC = memo(() => {
  const StickyBannerComponent: WidgetComponentClass = useMemo(
    () => ModuleRegistry.component(DASHBOARD_SALES_BANNER_COMPONENT_NAME),
    [],
  );

  const { sentry } = useServices();
  const { userId, metaSiteId } = useModuleParams();

  if (!StickyBannerComponent) {
    sentry.captureException(
      new Error(`No sticky banner component was found`),
      undefined,
      createSentryScope({ userId, metaSiteId }),
    );
    return null;
  }

  return (
    <div
      data-hook={`${STICKY_BANNER_DATA_HOOK}_bottom`}
      className={styles.stickyBanner}
    >
      <Widget
        bmComponentName={DASHBOARD_SALES_BANNER_COMPONENT_NAME}
        config={{ widgetId: DASHBOARD_SALES_BANNER_WIDGET_ID }}
        Component={StickyBannerComponent}
        showSkeleton={false}
      />
    </div>
  );
});
