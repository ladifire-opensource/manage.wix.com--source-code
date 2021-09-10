import { MethodFn, BMMethodFlowAPI } from '@wix/yoshi-flow-bm';
import { Channel, PromotionTemplates } from '../types';
import { appDefIds, getCurrentInstance } from '@wix/business-manager-api';
import { FEDOPS_INTERACTIONS } from '../constants';
import { Logger } from '@wix/bi-logger-promote-connect';
import { FedopsLogger } from '@wix/fe-essentials-business-manager';

const api = '/_serverless/promoter-service/api/v1';

interface GetPromotionTemplatesParams {
  intentType: string;
  itemId: string;
  referrer: string;
  options: { channels: Channel[]; maxPerChannel: number };
}

const getPromotionTemplates: MethodFn = async (
  bmProps: BMMethodFlowAPI,
  {
    intentType = '',
    itemId = '',
    referrer = '',
    options = { channels: Object.values(Channel), maxPerChannel: 1 },
  }: GetPromotionTemplatesParams,
): Promise<PromotionTemplates> => {
  const [fedopsLogger, biLogger]: [FedopsLogger, Logger] = await Promise.all([
    bmProps.getModuleFedopsLogger(),
    bmProps.getBILogger(),
  ]);
  try {
    fedopsLogger.interactionStarted(
      FEDOPS_INTERACTIONS.GET_PROMOTION_TEMPLATES,
    );
    await biLogger.clientReport({
      type: 'getPromotionTemplates',
      data: JSON.stringify({
        intentType,
        itemId,
        referrer,
        options,
      }),
      msid: bmProps.moduleParams.metaSiteId,
    });
    return bmProps.httpClient
      .get(`${api}/templates/${intentType}/${itemId}`, {
        headers: { Authorization: getCurrentInstance(appDefIds.promote) },
        params: options,
      })
      .then(({ data }) => {
        const res = resolveChannels(options.channels, data);
        fedopsLogger.interactionEnded(
          FEDOPS_INTERACTIONS.GET_PROMOTION_TEMPLATES,
        );
        return res;
      })
      .catch(async (error) => {
        await biLogger.clientError({
          type: error.message || JSON.stringify(error),
          data: JSON.stringify({
            intentType,
            itemId,
            referrer,
            options,
          }),
        });
        return Promise.reject(error);
      });
  } catch (error) {
    await biLogger.clientError({
      type: error.message || JSON.stringify(error),
      data: JSON.stringify({
        intentType,
        itemId,
        referrer,
        options,
      }),
      msid: bmProps.moduleParams.metaSiteId,
    });
    return Promise.reject(error);
  }
};

function resolveChannels(reqChannels: Channel[], data: any) {
  const channels: any = {};
  reqChannels.forEach((channel: Channel) => {
    const channelData = data.channels.find((_: any) => _.channel === channel);
    channels[channel] = channelData
      ? channelData.templatesData.map(
          (templateData: any) => templateData[Object.keys(templateData)[0]],
        )
      : [];
  });
  return {
    intentType: data.intentType,
    itemId: data.itemId,
    channels,
    itemThumbnail: data.itemThumbnail,
  };
}

export default getPromotionTemplates;
