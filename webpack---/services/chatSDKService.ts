import { chatSdk } from '@wix/chat-sdk';
import { DataCapsule, LocalStorageStrategy } from 'data-capsule';
import { Experiments } from '@wix/chat-sdk/lib/src/types/sdk-api.types';
import { getInstance } from './BusinessManagerService';
import { getChatToken } from './serverApi/serverApi';
import { WidgetView } from '../components/WidgetLoader/WidgetLoader';

const appName = 'inbox-header-widget';

export const connectToChatSdk = async (
  experiments: Experiments,
  view: WidgetView,
) => {
  const dataCapsule = new DataCapsule({
    strategy: new LocalStorageStrategy(),
    namespace: appName,
  });

  const { chatToken } = await getChatToken(view);

  try {
    chatSdk.init({
      preFetch: false,
      appName,
      chatServerUrl: '/',
      chatToken,
      experiments,
      throttleThreshold: 100,
      persistenceEngine: dataCapsule,
      tokenServer: {
        url: '/',
        get authorization() {
          if (view === 'site_level') {
            return getInstance();
          }
        },
      },
      presenceOptions: {
        useNewConvention:
          experiments?.['specs.chat.PresenceNewConvention'] === 'true',
        disableWatch: false,
      },
    });
  } catch (e) {
    console.error('failed to init chat:', e);
  }

  await chatSdk.waitForInitialized();
};
