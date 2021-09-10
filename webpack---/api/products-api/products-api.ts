import {
  CommonSortOrder,
  QueryProductResponse,
  WixQuotesWeb,
} from '@wix/ambassador-wix-quotes-web/http';
import { Product } from '@wix/ambassador-wix-quotes-web/src/types';

export const BASE_URL = '/_api/wix-quotes-web/';
export const HTTP_CLIENT_CONFIG = { ignoredProtoHttpUrlPart: '/api' };

export const productsApi = ({instance}) => {
  return {
    async fetchAllProducts(): Promise<Product[]> {
      const limit = 500;
      let offset = 0;
      let productResponse: QueryProductResponse;
      let products: Product[] = [];
      do {
        productResponse = await WixQuotesWeb(BASE_URL, HTTP_CLIENT_CONFIG).InvoicesProductService()({ Authorization: instance }).queryProduct({
          query: {
            fields: null,
            fieldsets: ['description', 'name', 'price', 'productId', 'productVersion'],
            sort: [{ fieldName: 'name', order: CommonSortOrder.DESC }],
            paging: {
              limit,
              offset
            },
          }
        });
        products = [...products, ...(productResponse.results || [])];
        offset += limit;
      } while (productResponse.totalResults === limit);

      return products;
    }
  };
};
