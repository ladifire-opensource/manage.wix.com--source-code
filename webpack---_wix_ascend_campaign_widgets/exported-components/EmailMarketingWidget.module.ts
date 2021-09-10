import { ResolveFn } from '@wix/yoshi-flow-bm';
import { ModuleId } from '@wix/business-manager-api';
import { ModuleRegistry } from 'react-module-container';
import { getEmailMarketingCampaignInfo } from '../api/email-marketing.api';
import { EmailMarketingInfo } from '../services/interfaces';
import { DEFAULT_CURRENCY } from '../components/CampaignWidgets/EmailMarketingWidget/constants';
import BiEventsFactory from '../utils/bi-events';

export interface ResolvedProps {
  emailMarketingInfo: EmailMarketingInfo | null;
  isStore: boolean;
  currency: string;
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
  getBILogger,
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
    const logger = await getBILogger();
    const biEvents = new BiEventsFactory(logger, metaSiteId);
    biEvents.emailMarketingLoadFailure(error);
    throw error;
  }
};
