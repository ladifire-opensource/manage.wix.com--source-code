import { Duplexer } from '@wix/wix-duplexer-js';

export const duplexerUrl =
  (window as any).DUPLEXER_ALB_URL || 'www.wix.com/wix-duplexer-sockets-server';
export const apiKey = '6a7046b2-2f89-4bcf-810e-d518a1ccff8e';
export const authUrl = '/_api/bi-websocket-web/auth-duplexer';
export const eventName = 'progress_bar_event';

export const generatePrivateChannel = ({
  userId,
  metaSiteId,
}: Partial<RealTime>): string =>
  `@private-omni-setup-${userId}-${metaSiteId}-channel`;

export interface RealTime {
  metaSiteId: string;
  userId: string;
  eventHandler(payload: any): void;
}

const duplexer = new Duplexer(duplexerUrl);

export const subscribeToEvents = ({
  metaSiteId,
  userId,
  eventHandler,
}: RealTime) => {
  const appConnection: any = duplexer.connect({
    apiKey,
    auth: {
      url: authUrl,
      onBeforeRequest: () => ({
        body: {
          metaSiteId,
        },
      }),
    },
  });

  const privateChannel = appConnection.subscribe(
    generatePrivateChannel({ metaSiteId, userId }),
  );

  privateChannel.on(eventName, (payload: any) => {
    eventHandler(payload);
  });
};

export const closeConnection = () => {
  duplexer.close();
};
