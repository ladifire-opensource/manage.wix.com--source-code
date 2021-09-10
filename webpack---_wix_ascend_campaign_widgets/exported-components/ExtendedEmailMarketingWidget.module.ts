import { ResolveFn } from '@wix/yoshi-flow-bm';
import { ModuleId } from '@wix/business-manager-api';
import { ModuleRegistry } from 'react-module-container';
import { getEmailMarketingCampaignInfo } from '../api/email-marketing.api';
import { EmailMarketingInfo } from '../services/interfaces';
import { DEFAULT_CURRENCY } from '../components/CampaignWidgets/EmailMarketingWidget/constants';

export interface ResolvedProps {
  emailMarketingInfo?: EmailMarketingInfo | null;
  isStore?: boolean;
  currency?: string;
  isError?: boolean;
}

const getSiteCurrency = async (metaSiteId: string): Promise<string> => {
  const settings = await ModuleRegistry.invoke(
    'businessSettings.getBusinessSettings',
    metaSiteId,
  );
  return settings?.currency || DEFAULT_CURRENCY;
};

export const resolve: ResolveFn<ResolvedProps> = async ({
  httpClient,
  moduleParams: { metaSiteId },
  fedopsLogger,
}) => {
  try {
    fedopsLogger.appLoadStarted();
    const isStore = !!ModuleRegistry.getModule(ModuleId.Stores);
    const emailMarketingInfoPromise = httpClient.request(
      getEmailMarketingCampaignInfo(isStore),
    );
    const currencyPromise = getSiteCurrency(metaSiteId);
    const [{ data: emailMarketingInfo }, currency] = await Promise.all([
      emailMarketingInfoPromise,
      currencyPromise,
    ]);
    return {
      emailMarketingInfo,
      isStore,
      currency,
    };
  } catch (error) {
    const { default: BiEventsFactory } = await import(
      /* webpackPrefetch: true, webpackChunkName: 'promote-bi-events' */ '../utils/promote-bi-events'
    );
    const biEvents = new BiEventsFactory(metaSiteId);
    biEvents.widgetLoadError('EM', error);
    return {
      isError: true,
    };
  }
};
