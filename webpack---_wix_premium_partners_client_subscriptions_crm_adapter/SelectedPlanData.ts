import { EditorType } from '@wix/ambassador-meta-site-search-web/types';
import { CYCLE_TYPE } from '@wix/crm-financial-products-list-api';
import { ModalState } from '../../client-subscriptions-modal/src/types';
import { PremiumLineData, PremiumLineDataType } from './types';

const STORAGE_KEY =
  'wix-premium-partners-client-subscriptions-crm-adapter-storage-model';
const MODEL_VERSION = 1;

export const getSelectedPlanDataObj = ({
  type,
  valueId,
  productId,
  metaSiteId,
  modalState,
  total,
  price,
  priceWithTax,
  editorType,
  siteName,
  cycle,
}: {
  type: PremiumLineDataType;
  valueId: string;
  productId: string;
  siteName: string;
  metaSiteId: string;
  modalState: ModalState;
  editorType: EditorType;
  total: number;
  price: number;
  priceWithTax: number;
  cycle: CYCLE_TYPE;
}): PremiumLineData => {
  return {
    _version: MODEL_VERSION,
    _id: valueId,
    _type: type,
    total,
    price,
    priceWithTax,
    cycle,
    site: {
      metaSiteId,
      name: siteName,
      editorType,
    },
    data: {
      modalState,
      productId,
    },
  };
};

export function storeSessionData(data: PremiumLineData) {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    // TODO - report
  }
}

export function getSessionData(): PremiumLineData | null {
  try {
    const rawObj = window.sessionStorage.getItem(STORAGE_KEY);
    if (rawObj) {
      return JSON.parse(rawObj);
    }
  } catch (e) {
    // TODO - report
  }
  return null;
}

export function resetSessionData() {
  window.sessionStorage.removeItem(STORAGE_KEY);
}
