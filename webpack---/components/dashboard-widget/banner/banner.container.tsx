import React, { FC } from 'react';
import { useBILogger, BILogger } from 'yoshi-flow-bm-runtime';
import { BI_WIDGET_NAME } from '@src/utils/bi-mappers';
import { BannerComponent } from './banner.component';
import { useFeaturesWizard } from '@wix/features-wizard-modal';

export const Banner: FC = () => {
  const biLogger: BILogger = useBILogger();
  const { open: openFeaturesWizard } = useFeaturesWizard();

  const onVisible = () => {
    biLogger.viewInDashboard({
      name: 'feature-wizard-banner',
      widget_name: BI_WIDGET_NAME,
    });
  };

  const onClick = () => {
    openFeaturesWizard();
    biLogger.clickInDashboard({
      name: 'feature-wizard-banner',
      widget_name: BI_WIDGET_NAME,
    });
  };

  return <BannerComponent onVisible={onVisible} onClick={onClick} />;
};
