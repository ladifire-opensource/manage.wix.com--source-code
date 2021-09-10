import abTranslate from 'ab-translate/dist/src/abTranslate-runtime';
import { ExperimentsBag } from '@wix/wix-experiments';
import { getModule } from '@wix/business-manager-api';
import { DASHBOARD_SETUP_MODULE_ID } from '@src/consts';
import { FlowBusinessManagerModule, Messages } from 'yoshi-flow-bm-runtime';

export interface i18nParams {
  messages: Messages;
  experiments: ExperimentsBag;
}

export const createI18n = ({ messages, experiments }: i18nParams) =>
  (
    getModule(DASHBOARD_SETUP_MODULE_ID) as unknown as FlowBusinessManagerModule
  )._essentials.createI18n({
    messages: abTranslate(experiments, messages),
    useSuspense: false,
  });
