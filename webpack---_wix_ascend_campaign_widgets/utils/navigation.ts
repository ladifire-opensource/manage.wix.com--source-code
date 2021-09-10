import { navigateTo, PageComponentId } from '@wix/business-manager-api';

// const contextData = { referrer: 'campaign_widget_BM' };

export interface ContextData {
  referrer: string;
  appState?: string;
}

export const navigateToFBAds = (contextData: ContextData) =>
  navigateTo({
    pageComponentId: PageComponentId.PromotePaidAds,
    contextData,
  });

export const navigateToEmailMarketing = (contextData: ContextData) =>
  navigateTo({
    pageComponentId: PageComponentId.Shoutout,
    contextData,
  });

export const navigateToPromoteHome = (contextData: ContextData) =>
  navigateTo({
    pageComponentId: PageComponentId.PromoteHome,
    contextData,
  });
