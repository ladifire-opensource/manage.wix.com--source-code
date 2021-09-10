import { ProductListConfig, ProductListResults } from '@wix/crm-financial-products-list-api';
import { navigateToInvoices } from '../api/navigation/navigation';

export interface RegisteredProductList {
  appDefId: string;
  products: ProductListResults;
  config: ProductListConfig;
}

export const navigateToInvoicesProductList = () =>
  navigateToInvoices({
    contextData: {
      appState: `products/list`,
    },
  });

export const getInvoicesProductListConfig = async ({
  translationsPromise,
}: {
  translationsPromise: Promise<{[key: string]: string}>;
}): Promise<ProductListConfig> => {
  const translations = await translationsPromise;
  const translate = (key: string): string => {
    return translations[key] || key;
  };

  const title = {
    text: translate('invoice_form.product_list.title'),
  };

  const hint = {
    text: translate('invoice_form.product_list.tooltip.text'),
    navigateToProductsCatalogActionText: translate('invoice_form.product_list.tooltip.cta'),
  };

  const orderCreationConfig = {
    isEnabled: true,
  }

  return {
    title,
    hint,
    onNavigateToProductsCatalog: navigateToInvoicesProductList,
    orderCreationConfig,
  };
};
