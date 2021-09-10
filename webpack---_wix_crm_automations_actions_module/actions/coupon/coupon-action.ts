import Experiments from '@wix/wix-experiments';
import {
  configModule,
  ModuleId,
  TModuleParams,
  isAppInstalled,
  appDefIds,
} from '@wix/business-manager-api';
import axios from 'axios';
import { COUPON_ACTION_LAZY_COMPONENT } from './coupon-lazy-component';
import { verifySendCouponConfig } from './verifyConfig';

export const ASCEND_APP_ID = '49170593-b074-416b-8358-876fdcec96f1';
export const SEND_COUPON_ACTION_NAME = 'send-coupon-action';

export const registerCouponAction = async (
  moduleParams: TModuleParams,
  experiments: Experiments,
) => {
  const withCouponAction = experiments.enabled(
    'specs.ascend.AutomationsShowSendCoupon',
  );
  const useRequiredTypes = experiments.enabled(
    'specs.crm.AutomationsMissingEmailsInForms',
  );

  const requiredAppsInstalled =
    isAppInstalled(appDefIds.wixBookings) ||
    isAppInstalled(appDefIds.events) ||
    isAppInstalled(appDefIds.wixECommerce);

  if (withCouponAction && requiredAppsInstalled) {
    const locale = moduleParams.accountLanguage || 'en';
    const baseUrl = moduleParams.config.topology.automationsCouponStaticsUrl;
    const { data: translations } = await axios.get(
      `${baseUrl}assets/locales/messages_${locale}.json`,
    );

    configModule(ModuleId.Automations, ModuleId.Triggers, {
      appDefId: ASCEND_APP_ID,
      actions: {
        [SEND_COUPON_ACTION_NAME]: {
          displayName: translations['send_coupon_action.display_name'],
          displayInfo: translations['send_coupon_action.display_info'],
          componentName: COUPON_ACTION_LAZY_COMPONENT,
          verifyConfig: async (params: { actionConfig?: string }) => {
            try {
              const verified = await verifySendCouponConfig(
                translations,
                params.actionConfig,
              );
              return verified;
            } catch (e) {
              console.error(e?.message ?? e);
              throw e;
            }
          },
          requiredTypes: useRequiredTypes ? ['EMAIL'] : null,
        },
      },
    });
  }
};
