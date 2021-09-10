import { axiosInstance } from '../../utils/axiosInstance';

export const createTipInteractionReporter = (msid) => ({
  itemSeen: (itemId) => axiosInstance.post('/_api/whats-next-web/items-seen', { itemsIds: [itemId], metaSiteId: msid }).catch(),
  itemClicked: (itemId) => axiosInstance.post('/_api/whats-next-web/item-click', { itemId, metaSiteId: msid }).catch(),
  itemClosed: (itemId) => axiosInstance.post('/_api/whats-next-web/item-close', { itemId, metaSiteId: msid }).catch(),
});
