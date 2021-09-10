import { IState } from '../../types/store';
import { getBrand } from '../../selectors/brandSelectors';
import { Brand } from '@wix/business-manager-api';

const BRAND_PROPERTY_NAME = 'brand';
enum CommonBrand {
  WIX = 'wix',
  EDITORX = 'editorx'
}

export const BMBrandToCommonBrand: Record<Brand, CommonBrand> = {
  [Brand.EDITORX]: CommonBrand.EDITORX,
  [Brand.WIX]: CommonBrand.WIX
};

export const registerCommonConfig = (state: IState) => {
  let commonConfig = {};

  Object.defineProperty(commonConfig, BRAND_PROPERTY_NAME, {
    value: BMBrandToCommonBrand[getBrand(state)],
    writable: false,
    enumerable: true
  });

  window['commonConfig'] = commonConfig;
};
