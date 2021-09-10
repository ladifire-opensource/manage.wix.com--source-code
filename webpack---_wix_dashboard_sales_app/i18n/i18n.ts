import { FlowBusinessManagerModule, Messages } from '@wix/yoshi-flow-bm';
import { ExperimentsBag } from '@wix/wix-experiments';
import { getModule } from '@wix/business-manager-api';
import abTranslate from 'ab-translate/dist/src/abTranslate-runtime';
import { DASHBOARD_SALES_MODULE_ID } from '@consts';

export interface i18nParams {
  translations: Messages;
  experiments: ExperimentsBag;
}

export const createI18n = ({ translations, experiments }: i18nParams) =>
  (
    getModule(DASHBOARD_SALES_MODULE_ID) as unknown as FlowBusinessManagerModule
  )._essentials.createI18n({
    messages: abTranslate(experiments, translations),
    useSuspense: false,
  });
