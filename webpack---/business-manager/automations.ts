import { appDefIds, configModule, isAppInstalled, ModuleId, } from '@wix/business-manager-api';

const getTranslations = async (locale: string, baseUrl: string) => fetch(`${baseUrl}/assets/locale/messages_${locale}.json`).then(r => r.json());

const basicSchema = {
  'recurring-name': {
    displayName: 'Recurring invoice name',
    type: 'string',
    sample: 'Recurring invoice name'
  },
  cycle: {
    displayName: 'Cycle',
    type: 'string',
    sample: '1'
  },
  'subscription-id': {
    displayName: 'Subscription Id',
    type: 'string',
    sample: '123e4567-e89b-12d3-a456-426655440000'
  },
  'recurring-duration': {
    displayName: 'Recurring duration',
    type: 'number',
    sample: 12
  },
  'customer-name': {
    displayName: 'Customer Name',
    type: 'string',
    sample: 'John Doe'
  },
  'customer-email': {
    displayName: 'Customer Email',
    type: 'string',
    sample: 'email@email.com'
  },
  'customer-address-street': {
    displayName: 'Customer Address Street',
    type: 'string',
    sample: 'Customer Address Street'
  },
  'customer-address-city': {
    displayName: 'Customer Address City',
    type: 'string',
    sample: 'Customer Address City'
  },
  'customer-address-zip': {
    displayName: 'Customer Address Zip',
    type: 'string',
    sample: 'Customer Address Zip'
  },
  'customer-address-country': {
    displayName: 'Customer Address Country',
    type: 'string',
    sample: 'Customer Address Country'
  },
  'currency': {
    displayName: 'Currency',
    type: 'string',
    sample: 'USD'
  },
  'total': {
    displayName: 'Total',
    type: 'number',
    sample: 100
  },
  ...Array.from(Array(10).keys()).reduce((obj, i) => ({
    ...obj,
    [`item-${i + 1}`]: {
      displayName: `Item-${i + 1}`,
      type: 'text',
      sample: 'some item 100'
    }
  }), {}),
  'business-name': {
    displayName: 'Business Name',
    type: 'string',
    sample: 'My Business'
  },
  'business-email': {
    displayName: 'Business Email',
    type: 'string',
    sample: 'my@business.com'
  },
};

const cancellationSchema = {
  ...basicSchema,
  'current-cycle': {
    displayName: 'Current Cycle',
    type: 'number',
    sample: 3
  },
  'cancellation-reason': {
    displayName: 'Cancellation Reason',
    type: 'number',
    sample: 'Cancellation Reason'
  },
  'cancellation-initiator': {
    displayName: 'Cancellation Initiator',
    type: 'number',
    sample: 'Cancellation Initiator'
  },
};

const EVENT_TYPES = {
  recurringInvoicesCreated: 'recurring-invoices/created',
  recurringInvoicesCanceled: 'recurring-invoices/canceled',
};

export const registerAutomationsRecurringTriggers = async (experiments, moduleParams) => {
  if (isAppInstalled(appDefIds.recurringInvoices)) {
    const translations = await getTranslations(moduleParams.accountLanguage, moduleParams.config.topology.invoicesV2StaticsUrl);

    configModule(ModuleId.Invoices, ModuleId.Triggers, {
      appDefId: appDefIds.invoices,
      appTitle: translations.invoices,
      events: {
        [EVENT_TYPES.recurringInvoicesCreated]: {
          displayName: translations['recurring-invoice.triggers.created.name'],
          displayDescription: translations[`recurring-invoice.triggers.created.description`],
          sourceId: appDefIds.recurringInvoices,
          displayColor: '#EF73C0',
          supportsImmediateChat: false,
          supportsPreEventTrigger: false
        },
        [EVENT_TYPES.recurringInvoicesCanceled]: {
          displayName: translations['recurring-invoice.triggers.canceled.name'],
          displayDescription: translations[`recurring-invoice.triggers.canceled.description`],
          sourceId: appDefIds.recurringInvoices,
          displayColor: '#EF73C0',
          supportsImmediateChat: false,
          supportsPreEventTrigger: false,
          actionComponentInfo: {
            componentName: 'triggered-emails',
            actionConfig: {
              templateTag: 'recurring_payment_canceled',
            },
          }
        }
      },
      generateEventSchema: async (eventId) => {
        if (eventId === EVENT_TYPES.recurringInvoicesCanceled) {
          return cancellationSchema;
        }
        return basicSchema;
      }
    });
  }
};
