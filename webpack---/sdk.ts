import { create } from '@wix/fedops-logger';
import { InitParams, initWidget } from '.';

export const fedopsLogger = create('wix-chatbot-widget');

const w = window as any;

fedopsLogger.appLoadStarted();

fedopsLogger.interactionStarted('main-flow-embedded');

// Init the SDK;
w.WixSupportChatSDK = {};

w.WixSupportChatSDK.show = () => {};
w.WixSupportChatSDK.hide = () => {};

// Backward compatibility
// Remove it once all teams upgrade their wrapper to 4.0.x
w.WixSupportChatSDK.answersScriptLoaded = Promise.resolve();

w.WixSupportChatSDK.init = async (initParams: InitParams): Promise<void> => {
  return initWidget({
    tooltipCloseTimeout: 24 * 60 * 60 * 1000,
    ...initParams,
  });
};

w.WixSupportChatSDK._init = w.WixSupportChatSDK.init;

fedopsLogger.interactionEnded('main-flow-embedded');

fedopsLogger.appLoaded();
