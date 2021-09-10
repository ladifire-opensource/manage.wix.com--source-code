import { Messages } from '@wix/wix-i18n-config';
import { fetchTranslations } from '@src/i18n/fetch-translations';
import { ResolveFn } from '@wix/yoshi-flow-bm';
import { getSiteCategoryData } from '@src/api/get-site-category.api';
import { CategoryData } from '../../types';

export interface ResolvedProps {
  messages: Messages;
  categoryData: CategoryData;
}

export const resolve: ResolveFn<ResolvedProps> = async ({
  moduleParams,
  httpClient,
  getFedopsLogger,
  sentry,
}) => {
  const { userId, metaSiteId } = moduleParams;
  const fedopsLogger = await getFedopsLogger();
  fedopsLogger.appLoadStarted();

  try {
    const [messages, { data: categoryData }] = await Promise.all([
      fetchTranslations(
        moduleParams.config.topology.featuresWizardTranslations,
        moduleParams.accountLanguage,
      ),
      httpClient.request(getSiteCategoryData()),
    ]);

    return {
      messages,
      categoryData,
    };
  } catch (e) {
    sentry.captureException(`Failed to resolve initial data ${e}`, {
      captureContext: { tags: { userId, metaSiteId } },
    });

    throw e;
  }
};
