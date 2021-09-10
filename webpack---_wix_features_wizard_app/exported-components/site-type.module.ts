import { fetchTranslations } from '@src/i18n/fetch-translations';
import { fetchSiteType } from '@src/services/site-type/site-type.service';
import { Messages, ResolveFn } from '@wix/yoshi-flow-bm';
import { getCurrentInstance } from '@wix/business-manager-api';

const APP_DEF_ID = 'dee319be-791e-4578-8ed8-55e57498851e';

export interface ResolvedProps {
  messages: Messages;
  category?: string;
}

export const resolve: ResolveFn<ResolvedProps> = async ({
  moduleParams,
  sentry,
}) => {
  const { userId, metaSiteId } = moduleParams;

  try {
    const [messages, category] = await Promise.all([
      fetchTranslations(
        moduleParams.config.topology.featuresWizardTranslations,
        moduleParams.accountLanguage,
      ),
      fetchSiteType(getCurrentInstance(APP_DEF_ID)),
    ]);

    return {
      messages,
      category,
    };
  } catch (e) {
    sentry.captureException(`Failed to resolve site type initial data ${e}`, {
      captureContext: { tags: { userId, metaSiteId } },
    });

    throw e;
  }
};
