import { ResolveFn } from 'yoshi-flow-bm-runtime';
import type { i18n } from 'yoshi-flow-bm-runtime';
import { CustomizableWidgetsList } from '@types';
import { getAvailableWidgets } from '../../api/get-available-widgets.api';
import { fetchTranslations } from '../../i18n/fetch-translations';
import { fedopsInteractions } from '@consts';

export interface ResolvedProps {
  customizableWidgets: CustomizableWidgetsList;
  i18n: i18n;
}

export const resolve: ResolveFn<ResolvedProps> = async ({
  httpClient,
  moduleParams,
  getI18n,
  getFedopsLogger,
}) => {
  const { accountLanguage } = moduleParams;
  const [widgetsList, i18nInstance, messages, fedopsLogger] = await Promise.all([
    httpClient.request(getAvailableWidgets)(),
    getI18n(),
    fetchTranslations(
      moduleParams.config.topology.businessDashboardWidgetsPanelTranslations,
      accountLanguage,
    ),
    getFedopsLogger(),
  ]);
  fedopsLogger.interactionStarted(fedopsInteractions.LOAD_CUSTOMIZATION_WIDGETS_PANEL);
  i18nInstance.addResourceBundle(accountLanguage, 'translation', messages, true, false);

  return {
    customizableWidgets: widgetsList,
    i18n: i18nInstance,
  };
};
