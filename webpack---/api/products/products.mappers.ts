import { Product } from '@wix/crm-financial-products-list-api';
import { Product as ProductInterface } from '@wix/ambassador-wix-quotes-web/src/types';

export const mapProductDTOToProduct = (productDTO: ProductInterface, currency: string) : Product=> {
  if(!productDTO){
    return null
  }
  return {
    name: productDTO.name,
    description: productDTO.description,
    price:{
      amount: productDTO.price.serializedValue,
      currencyCode: currency
    },
    hasVariants: false
  }
};

export const mapProductListDTOToProductList = (productListDTO: ProductInterface[], currency: string) : Product[] => {
  if(!productListDTO){
    return [];
  }
  return productListDTO.filter(product => product.price !== undefined).map(product => mapProductDTOToProduct(product,currency));
};
