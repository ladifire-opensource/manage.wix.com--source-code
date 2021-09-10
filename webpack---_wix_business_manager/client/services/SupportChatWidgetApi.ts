import supportChatWidget from '@wix/support-chat-widget-wrapper';
import { getCurrentInstance, appDefIds } from '@wix/business-manager-api';

export function init(msid) {
  const authorizationToken = getCurrentInstance(appDefIds.metaSite);
  supportChatWidget.init({ origin: `BusinessManager`, msid, authorizationToken });
}
