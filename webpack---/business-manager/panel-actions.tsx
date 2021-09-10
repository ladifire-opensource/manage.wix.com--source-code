import axios from 'axios';
import {
  configModule,
  ModuleId,
  PageComponentId,
} from '@wix/business-manager-api';
import { ModuleRegistry } from 'react-module-container';
import { navigateToPriceQuotes } from "../api/navigation/navigation";
import * as React from 'react';
import Payment from 'wix-ui-icons-common/Payment';

const getTranslations = async ({ priceQuotesStaticsUrl, locale }) =>
  axios
    .create()
    .get(
      `${priceQuotesStaticsUrl}assets/locale/translation/messages_${locale}.json`,
    );

const getPermission = async ({ metaSiteId }) =>
  ModuleRegistry.invoke('contacts.isPermitted', {
    action: 'view-price-quotes',
    metaSiteId,
  });

export const registerContactPanelActions = ({
  priceQuotesStaticsUrl,
  locale,
  metaSiteId,
}) => {
  const shouldRender = () => getPermission({ metaSiteId });

  const translationsRequest = getTranslations({ priceQuotesStaticsUrl, locale });
  const getLabel = async () => {
    const { data: translations } = await translationsRequest;
    return translations['quick_action.create-price-quote'];
  };

  const getSubtitle = async () => {
    const { data: translations } = await translationsRequest;
    return translations['quick_action.create-price-quote-subtitle'];
  };


  const quickActionConfig = {
    type: 'quick_actions',
    actions: async () => {
      const [isPermitted, label] = await Promise.all([
        shouldRender(),
        getLabel(),
      ]);

      return isPermitted
        ? [
            {
              priority: 2,
              label,
              type: 'navigateTo',
              action: contactId => ({
                pageComponentId: PageComponentId.PriceQuotes,
                viewId: 'create-price-quote',
                contextData: {
                  appState: `create?customerId=${contactId}`,
                  referrer: 'contactPanel',
                },
              }),
            },
          ]
        : [];
    },
  };


  const fullPageConfig = {
    type: 'contact-page-actions',
    moduleId: ModuleId.PriceQuotes,
    shouldRender,
    actions: [{
      priority: 1,
      label: getLabel(),
      onClick: ({ contactId }: { contactId: string }) => {
        navigateToPriceQuotes({
          viewId: 'create-price-quote',
          contextData: {
            appState: `create?customerId=${contactId}`,
            referrer: 'contactFullPage'
          }
        })
      },
      subtitle: getSubtitle(),
      icon: <Payment/>,
    }]
  };

  try {
    configModule(ModuleId.PriceQuotes, ModuleId.Contacts, quickActionConfig);
    configModule(ModuleId.PriceQuotes, ModuleId.Contacts, fullPageConfig);
  } catch (e) {
    console.info('Could not register panel actions');
  }
};
