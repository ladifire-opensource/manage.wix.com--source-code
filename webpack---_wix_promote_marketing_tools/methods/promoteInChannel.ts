import { MethodFn, BMMethodFlowAPI } from '@wix/yoshi-flow-bm';
import { Channel, ChannelTemplateData } from '../types';
import {
  appDefIds,
  getCurrentInstance,
  INavigateToPageConfig,
  navigateTo,
  navigateToAndShowBackToast,
  PageComponentId,
} from '@wix/business-manager-api';
import { getBackToastConfig, getTFunction } from '../utils';
import { FEDOPS_INTERACTIONS } from '../constants';
import { Logger } from '@wix/bi-logger-promote-connect';

interface PromoteInChannelParams {
  channel: Channel;
  channelTemplateData: ChannelTemplateData;
  referrer: string;
  options?: { navigateBackConfig?: INavigateToPageConfig };
}

const promoteInChannel: MethodFn = async (
  bmProps: BMMethodFlowAPI,
  reqProps: PromoteInChannelParams,
): Promise<void> => {
  const [fedopsLogger, biLogger] = await Promise.all([
    bmProps.getModuleFedopsLogger(),
    bmProps.getBILogger(),
  ]);
  try {
    fedopsLogger.interactionStarted(FEDOPS_INTERACTIONS.PROMOTE_IN_CHANNEL);
    await biLogger.clientReport({
      type: 'promoteInChannel',
      data: JSON.stringify(reqProps),
      msid: bmProps.moduleParams.metaSiteId,
    });
    switch (reqProps.channel) {
      case Channel.EMAIL_MARKETING:
        await promoteInEM(reqProps, bmProps, biLogger);
        break;
      case Channel.SOCIAL_POSTS:
        await promoteInSP(reqProps, bmProps, biLogger);
        break;
      case Channel.VIDEO_MAKER:
        await promoteInVM(reqProps, bmProps, biLogger);
        break;
      default:
        break;
    }
  } catch (error) {
    await biLogger.clientError({
      type: error.message || JSON.stringify(error),
      data: JSON.stringify(reqProps),
      msid: bmProps.moduleParams.metaSiteId,
    });
    return Promise.reject(error);
  } finally {
    fedopsLogger.interactionEnded(FEDOPS_INTERACTIONS.PROMOTE_IN_CHANNEL);
  }
};

async function promoteInEM(
  reqProps: PromoteInChannelParams,
  bmProps: BMMethodFlowAPI,
  biLogger: Logger,
) {
  const {
    // @ts-expect-error
    channelTemplateData: { messageId, templateVariables },
    referrer = '',
    options = {},
  } = reqProps;
  await biLogger.promoterNavigateToChannel({
    channel: 'EM',
    channel_template_data: JSON.stringify({ messageId, templateVariables }),
    referrer,
    msid: bmProps.moduleParams.metaSiteId,
  });
  if (options.navigateBackConfig) {
    const t = await getTFunction(bmProps);
    await navigateToAndShowBackToast(
      {
        pageComponentId: PageComponentId.Shoutout,
        contextData: {
          referrer,
          appState: '?dl=message',
        },
        payload: {
          messageId,
          params: templateVariables,
        },
      },
      options.navigateBackConfig,
      getBackToastConfig(t, Channel.EMAIL_MARKETING),
    );
  } else {
    await navigateTo({
      pageComponentId: PageComponentId.Shoutout,
      contextData: {
        referrer,
        appState: '?dl=message',
      },
      payload: {
        messageId,
        params: templateVariables,
      },
    });
  }
  await biLogger.promoterNavigateToChannelSuccess({
    channel: 'EM',
    channel_template_data: JSON.stringify({ messageId, templateVariables }),
    referrer,
    msid: bmProps.moduleParams.metaSiteId,
  });
}

async function promoteInSP(
  reqProps: PromoteInChannelParams,
  bmProps: BMMethodFlowAPI,
  biLogger: Logger,
) {
  const {
    // @ts-expect-error
    channelTemplateData: { intentId, presetId, bgUrl, text },
    referrer = '',
    options = {},
  } = reqProps;
  const appState =
    `?dl=composer&intentId=${intentId}` +
    (presetId ? `&presetId=${presetId}` : '') +
    (bgUrl ? `&bgUrl=${encodeURIComponent(bgUrl)}` : '') +
    (text ? `&text=${encodeURIComponent(text)}` : '');
  await biLogger.promoterNavigateToChannel({
    channel: 'SP',
    channel_template_data: JSON.stringify({ intentId, presetId, bgUrl, text }),
    referrer,
    msid: bmProps.moduleParams.metaSiteId,
  });
  if (options.navigateBackConfig) {
    const t = await getTFunction(bmProps);
    await navigateToAndShowBackToast(
      {
        pageComponentId: PageComponentId.ShareitWeb,
        contextData: {
          referrer,
          appState,
        },
      },
      options.navigateBackConfig,
      getBackToastConfig(t, Channel.EMAIL_MARKETING),
    );
  } else {
    await navigateTo({
      pageComponentId: PageComponentId.ShareitWeb,
      contextData: {
        referrer,
        appState,
      },
    });
  }
  await biLogger.promoterNavigateToChannelSuccess({
    channel: 'SP',
    channel_template_data: JSON.stringify({ intentId, presetId, bgUrl, text }),
    referrer,
    msid: bmProps.moduleParams.metaSiteId,
  });
}

async function promoteInVM(
  reqProps: PromoteInChannelParams,
  bmProps: BMMethodFlowAPI,
  biLogger: Logger,
) {
  const {
    // @ts-expect-error
    channelTemplateData: { scenario, template, videoData, productId },
    referrer = '',
  } = reqProps;
  const vmoModule = await import('@wix/video-maker-opener');
  const videoMakerOpener = new vmoModule.VideoMakerOpener();

  // @ts-expect-error
  const siteMediaToken = window.__MEDIA_TOKEN__;

  const additionalParams = {
    debug: bmProps.moduleParams.debug,
    locale: bmProps.moduleParams.locale || 'en',
    opener: 'Promote',
    origin: referrer,
    metaSiteId: bmProps.moduleParams.metaSiteId,
    siteMediaToken,
    userId: bmProps.moduleParams.userId,
  };

  if (referrer === 'stores.product') {
    const videoMakerParams = {
      scenario: vmoModule.Scenarios.Product,
      productId,
      ...additionalParams,
    };
    videoMakerOpener
      .withInstanceGetter(async () => {
        return getCurrentInstance(appDefIds.promote);
      })
      // @ts-expect-error
      .open(videoMakerParams)
      .then(() =>
        biLogger.promoterNavigateToChannelSuccess({
          channel: 'VM',
          channel_template_data: JSON.stringify(videoMakerParams),
          referrer,
          msid: bmProps.moduleParams.metaSiteId,
        }),
      );
  } else {
    videoData.scriptData.secondaryMessage = bmProps.moduleParams.siteName;
    videoData.business.websiteOrEmail =
      bmProps.moduleParams.liveSite?.viewUrl || '';
    const videoMakerParams = {
      scenario,
      template,
      videoData,
      ...additionalParams,
    };
    await biLogger.promoterNavigateToChannel({
      channel: 'VM',
      channel_template_data: JSON.stringify(videoMakerParams),
      referrer,
      msid: bmProps.moduleParams.metaSiteId,
    });
    videoMakerOpener
      .withInstanceGetter(async () => {
        return getCurrentInstance(appDefIds.promote);
      })
      // @ts-expect-error
      .open(videoMakerParams)
      .then(() =>
        biLogger.promoterNavigateToChannelSuccess({
          channel: 'VM',
          channel_template_data: JSON.stringify(videoMakerParams),
          referrer,
          msid: bmProps.moduleParams.metaSiteId,
        }),
      );
  }
}

export default promoteInChannel;
