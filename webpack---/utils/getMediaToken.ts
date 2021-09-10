import { sentryClient } from '../services/sentryClient';
import { getRetriableAxios } from './getRetriebleAxios';

export const getMediaToken = async (instance: string): Promise<string> => {
  return getRetriableAxios()
    .get('/_api/video-maker-modal/media-token', {
      params: {
        instance,
      },
    })
    .then((response) => response.data.mediaToken)
    .catch((error) => {
      sentryClient.captureException(error);
      throw error;
    });
};
