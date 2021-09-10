import React, { FC, useState } from 'react';
import { useBILogger, BILogger } from 'yoshi-flow-bm-runtime';
import { BI_WIDGET_NAME } from '@src/utils/bi-mappers';
import { HappyMomentComponent } from './happy-moment.component';
import { useDashboardWidgetData } from '@src/components/dashboard-widget/dashboard-widget.context';

export const HappyMoment: FC = () => {
  const biLogger: BILogger = useBILogger();
  const { closeHappyMoment } = useDashboardWidgetData();

  const onVisible = () => {
    biLogger.viewInDashboard({
      name: 'happy-moment',
      widget_name: BI_WIDGET_NAME,
    });
  };

  const onClick = () => {
    biLogger.clickInDashboard({
      name: 'happy-moment-cta',
      widget_name: BI_WIDGET_NAME,
    });

    closeHappyMoment();
  };

  const onCloseClick = () => {
    biLogger.clickInDashboard({
      name: 'happy-moment-close',
      widget_name: BI_WIDGET_NAME,
    });

    closeHappyMoment();
  };

  return (
    <HappyMomentComponent
      onVisible={onVisible}
      onClick={onClick}
      onCloseClick={onCloseClick}
    />
  );
};
