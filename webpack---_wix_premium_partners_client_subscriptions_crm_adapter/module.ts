import type { ModuleInitFn, ModuleFlowAPI } from '@wix/yoshi-flow-bm';
import {
  configureForm,
  isEnabledResponse,
  Context,
  CYCLE_TYPE,
  Flow,
} from '@wix/crm-financial-products-list-api';
import { ModuleRegistry } from 'react-module-container';
import { ModuleId } from '@wix/business-manager-api';
import { resetSessionData } from './SelectedPlanData';

export const init: ModuleInitFn = (flowAPI: ModuleFlowAPI) => {
  const getText = async () => {
    try {
      const i18n = await flowAPI.getI18n();
      return i18n.t('premium_partners.crm_integration.add_plans.button');
    } catch (e) {
      return 'Add a Premium Plan';
    }
  };

  const isAddItemEnabled = async (
    context: Context,
  ): Promise<isEnabledResponse> => {
    if (!context.metaSiteId) {
      const i18n = await flowAPI.getI18n();
      return {
        isEnabled: false,
        reason: i18n.t(
          'premium_partners.crm_integration.add_plans.button.disabled.no_site',
        ),
      };
    }
    if (context.invoice.lineItems.items.length > 0) {
      const i18n = await flowAPI.getI18n();
      return {
        isEnabled: false,
        reason: i18n.t(
          'premium_partners.crm_integration.add_plans.button.disabled.line_item_created',
        ),
      };
    }
    return {
      isEnabled: true,
    };
  };

  const isIntegrationEnabled = async (context: Context): Promise<boolean> => {
    const cycleType = context.invoice.cycle?.type;
    if (
      (context.flow === Flow.SERVICE_AND_PREMIUM_PLAN &&
        cycleType === CYCLE_TYPE.MONTHLY) ||
      cycleType === CYCLE_TYPE.YEARLY
    ) {
      ModuleRegistry.getModule(
        'PREMIUM_PARTNERS_CLIENT_SUBSCRIPTIONS_MODAL',
      ).prefetchComponent(
        'premium-partners-client-subscriptions-modal.components.ClientSubscriptionPlansModal',
      );
      return true;
    }
    return false;
  };

  resetSessionData();
  configureForm(
    'PREMIUM_PARTNERS_CLIENT_SUBSCRIPTIONS_CRM_ADAPTER' as ModuleId,
    {
      appDefId: '1a648079-f577-4b60-b316-f7efc87d224e',
      isEnabled: isIntegrationEnabled,
      lineItem: {
        product: {
          customProductPicker: {
            componentName:
              'PREMIUM_PARTNERS_CLIENT_SUBSCRIPTIONS_CRM_ADAPTER.components.premium-partners-client-subscriptions-crm-adapter-title-input',
          },
        },
        actions: {
          edit: {
            isEnabled: () => true,
          },
          add: {
            text: getText,
            isEnabled: isAddItemEnabled,
          },
        },
        quantity: {
          getInputAttributes: () => {
            return { editable: false };
          },
        },
        price: {
          getInputAttributes: () => {
            return { editable: false };
          },
        },
      },
    },
  );
};
