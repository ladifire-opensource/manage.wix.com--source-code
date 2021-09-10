import { ItemsDto, RealEstateDefinition } from './items';

export enum EUpdateUrls {
  showLaterUrl = '/_api/whats-next-web/item-close',
  itemSkipUrl = '/_api/whats-next-web/item-skip',
  itemUndoSkipUrl = '/_api/whats-next-web/item-undo-skip',
}

export interface IUpdate {
  metaSiteId: string;
  itemId: string;
  url: EUpdateUrls;
  errorMessage: string;
}

export interface ProgressBarDataResponse {
  realEstates: RealEstateDefinition[];
  items: ItemsDto;
}
