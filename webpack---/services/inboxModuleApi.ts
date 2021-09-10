import { getGlobalObj, getModuleParams } from '../services/bmUtils';
import { showBadge, BadgeType } from '@wix/business-manager-api';
import { ChatSdk } from '@wix/chat-sdk/lib/src/api/chat-sdk';

const getChatSdk = async () => {
  const chatSdk = await getGlobalObj<ChatSdk>('chatSdk');
  await chatSdk.waitForInitialized();
  return chatSdk;
};

export const getUnreadCount = async (): Promise<{
  chatroomIds: string[];
  chatroomCount: number;
}> => {
  const chatSdk = await getChatSdk();
  const instanceId = getModuleParams().instanceId;
  return chatSdk.getUnreadCount({ participantIds: [instanceId] });
};

export const getRealtimeUnreadCount = async (
  callback: ({ count: number, overflow: boolean }) => any,
): Promise<{ unsubscribe: Function }> => {
  const chatSdk = await getChatSdk();
  const instanceId = getModuleParams().instanceId;
  return chatSdk.subscribeToGlobalUnreadStatus({
    callback,
    filter: { participantIds: [instanceId] },
  });
};

const updateBadgeRealTime = async ({ count }: { count: number }) => {
  showBadge({
    itemId: 'inbox',
    type: BadgeType.COUNT,
    count,
  });
};

export const initializeUpdateBadgeRealTime = () => {
  return getRealtimeUnreadCount(updateBadgeRealTime);
};
