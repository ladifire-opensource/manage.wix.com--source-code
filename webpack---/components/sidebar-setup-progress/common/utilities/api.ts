import { AxiosInstance } from 'axios';
import { EUpdateUrls, IUpdate } from '../../api';
import { appDefIds, getCurrentInstance } from '@wix/business-manager-api';

let axiosInstance: AxiosInstance;

export const initializeApiService = (instance: AxiosInstance) => {
  axiosInstance = instance;
};

export const requestUndoSkipItem = async (
  metaSiteId: string,
  itemId: string,
): Promise<any> => {
  await updateItem({
    metaSiteId,
    itemId,
    url: EUpdateUrls.itemUndoSkipUrl,
    errorMessage: 'Omni-setup error requesting undo skip',
  });
};

export const requestItemSkip = async (
  metaSiteId: string,
  itemId: string,
): Promise<any> => {
  await updateItem({
    metaSiteId,
    itemId,
    url: EUpdateUrls.itemSkipUrl,
    errorMessage: 'Omni-setup error requesting skip',
  });
};

export const requestItemShowLater = async (
  metaSiteId: string,
  itemId: string,
): Promise<any> => {
  await updateItem({
    metaSiteId,
    itemId,
    url: EUpdateUrls.showLaterUrl,
    errorMessage: 'Omni-setup error requesting show later',
  });
};

export const updateItem = async ({
  metaSiteId,
  itemId,
  url,
  errorMessage,
}: IUpdate): Promise<any> => {
  try {
    await axiosInstance.post(url, {
      metaSiteId,
      itemId,
      headers: { Authorization: getCurrentInstance(appDefIds.metaSite) },
    });

    return;
  } catch (error) {
    throw new Error(`${errorMessage}, ${error}`);
  }
};
