import {
  getAllRegisteredProductLists,
  Product,
  ProductListConfig,
  ProductListResults,
} from '@wix/crm-financial-products-list-api';
import { getCrmFinancialSettingsInstance } from '../provision-crm-financial-settings/provision-crm-financial-settings';
import { GeneralSettingsApi } from '../general-settings-api/general-settings-api';
import { mapProductListDTOToProductList } from './products.mappers';
import { showToast, ToastType } from '@wix/business-manager-api';
import { ToastBiNames } from '../toast.api';
import { productsApi } from '../products-api/products-api';

export interface RegisteredProductList {
  appDefId: string;
  productListResults: ProductListResults;
  config: ProductListConfig;
}

export const getInvoicesProductList = async ({
  instance,
  translationsPromise
}: {
  instance: string;
  translationsPromise: Promise<{ [key: string]: string }>;
}): Promise<ProductListResults> => {
  try {
    const crmFinancialInstance = await getCrmFinancialSettingsInstance();
    const generalSettingsApi = new GeneralSettingsApi({ instance: crmFinancialInstance });
    const productsApiWithInstance = productsApi({ instance });
    const productList = await productsApiWithInstance.fetchAllProducts();
    const { currency } = await generalSettingsApi.getCurrency();
    const products: Product[] = mapProductListDTOToProductList(productList, currency);

    return {
      products,
    };
  } catch (e) {
    const translations = await translationsPromise;
    const translate = (key: string): string => translations[key] || key;
    showToast({
      biName: ToastBiNames.INVOICE_ERROR,
      message: translate('invoices.loading-invoice.error.internal'),
      type: ToastType.ERROR,
    });
    throw e;
  }
};

export const fetchAllRegisteredProductList = async (): Promise<RegisteredProductList[]> => {
  // @ts-ignore
  return Promise.allSettled(
    getAllRegisteredProductLists().map(async ({ appDefId, getProducts, getConfig, isEnabled }) => {
      const shouldAddProductList = await isEnabled();
      if (shouldAddProductList) {
        const [results, productListConfig] = await Promise.all([getProducts(), getConfig()]);
        return {
          appDefId,
          productListResults: results,
          config: productListConfig,
          onProductClick: productListConfig.onProductSelection
        };
      }
    })
  ).then((results) =>
    results
    .map((result) => (result.status === 'fulfilled' ? result.value : null))
    .filter((res) => !!res)
  );
};
