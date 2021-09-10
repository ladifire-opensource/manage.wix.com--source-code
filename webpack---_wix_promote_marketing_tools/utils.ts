import { BMMethodFlowAPI } from '@wix/yoshi-flow-bm';
import { Channel } from './types';

export const getTFunction = async (bmProps: BMMethodFlowAPI) => {
  const i18n = await bmProps.getI18n();
  return i18n
    .createInstance()
    .use({
      type: 'backend',
      read: (language: any, namespace: any, callback: any) => {
        return import(`./assets/locale/messages_${language}.json`)
          .then((translation) => callback(null, translation))
          .catch((error) => callback(error));
      },
    })
    .init({
      lng: bmProps.moduleParams.locale,
      fallbackLng: 'en',
      keySeparator: false,
    });
};

export const getBackToastConfig = (t: Function, channel: Channel) => ({
  buttonText: t(
    `promoter.${channelToKey(channel)}.navigate-back-toast.button-text`,
  ),
  text: t(`promoter.${channelToKey(channel)}.navigate-back-toast.text`),
});

export const channelToKey = (c: Channel) => {
  switch (c) {
    case Channel.EMAIL_MARKETING:
      return 'em';
    case Channel.SOCIAL_POSTS:
      return 'sp';
    case Channel.VIDEO_MAKER:
      return 'vm';
    default:
      return '';
  }
};

export const getTFunctionFromMessages = (
  messages: {
    [key: string]: string;
  },
  keysMode?: boolean,
) => (keysMode ? (key: string) => key : (key: string) => messages[key]);

export const biLoggerMock = {
  promoterWebChannelClick: () => {},
  promoterWebModalView: () => {},
  promoterWebErrorModalView: () => {},
  promoterWebCloseModalClick: () => {},
  promoterNavigateToChannel: () => {},
  promoterNavigateToChannelSuccess: () => {},
};
