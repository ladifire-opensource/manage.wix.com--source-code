import * as React from 'react';
import { FC, memo, useEffect } from 'react';
import { useModuleParams } from 'yoshi-flow-bm-runtime';
import { requestWelcomeLightbox } from '../../services/dealer-lightbox/request-welcome-lightbox';

export const ModalsComponent: FC = memo(() => {
  const moduleParams = useModuleParams();
  const {
    metaSiteId,
    accountLanguage,
    config: { topology },
  } = moduleParams;
  const { dealerTranslationsStaticsUrl, dealerLightbox } = topology;

  useEffect(() => {
    requestWelcomeLightbox(dealerTranslationsStaticsUrl, accountLanguage, dealerLightbox, metaSiteId);
  }, [dealerTranslationsStaticsUrl, accountLanguage, dealerLightbox, metaSiteId]);

  return <div data-hook="business-dashboard-modals-root"></div>;
});
