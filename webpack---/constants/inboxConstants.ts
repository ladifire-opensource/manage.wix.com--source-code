export const BOT_CONTACT_ID = '062bd3a6-0d87-4394-a972-57190511adb9';
export const ASCEND_BOT_CONTACT_ID = '07a5ff49-fb4d-4ae6-8803-6cd9ecb9bba7';
export const INBOX_SETUP_CONTACT_ID = 'feae3178-a9ad-4321-a252-876095e44b35';
export const INBOX_SETUP_CLIENT_REF = 'InboxOnboardingId';
export const INBOX_SETUP_ROUTE = 'inbox-setup';
export const INBOX_APP_NAME = 'inbox';
export const INBOX_APP_DEF_ID = '141fbfae-511e-6817-c9f0-48993a7547d1';
export const UNSET_CHATROOM_ID_IF_EMPTY_DEBOUNCE_TIME = 1000;
export const FEEDBACK_LINK = 'https://www.wixinbox-feedback.com/';
export const HELP_CENTER_BASE = 'https://support.wix.com';
export const HELP_CENTER_LINK = `${HELP_CENTER_BASE}/en/ascend-by-wix/wix-inbox`;
export const INTRO_VIDEO =
  'https://wixmp-9127dea18607b759d29e6784.wixmp.com/Inbox/onboarding/setup_video.mp4';
export const GMAIL_ERROR_LEARN_MORE_LINK =
  'https://support.wix.com/en/article/wix-inbox-connecting-your-gmail-account';
export const FACEBOOK_ERROR_LEARN_MORE_LINK =
  'https://support.wix.com/article/wix-inbox-connecting-your-facebook-page';
export const LEARN_MORE_BUSINESS_INFO =
  'https://support.wix.com/en/article/wix-inbox-managing-your-settings#email-settings';
export const bots = {
  [BOT_CONTACT_ID]: {
    isAllowedToSendMessage: true,
  },
  [ASCEND_BOT_CONTACT_ID]: {
    isAllowedToSendMessage: false,
  },
  [INBOX_SETUP_CONTACT_ID]: {
    isAllowedToSendMessage: false,
  },
};

export const persistentStorageKeys = {
  CONTACT_PANEL_CLOSE: 'contact-panel.closed-by-user',
  CHAT_AVAILABILITY_ONBOARDING_SHOWN: 'CHAT_AVAILABILITY_ONBOARDING_SHOWN',
  MESSAGES_SENT: 'MESSAGES_SENT',
  DESKTOP_NOTIFICATIONS_DISMISSED: 'DESKTOP_NOTIFICATIONS_DISMISSED',
};
export const INBOX_DATA_CAPSUL_SPACE_NAME = 'wix-engage-web';

export enum INBOX_STORE_APP_NAME {
  INBOX = 'engage-web',
  INBOX_CONVERSATION = 'inbox-conversation',
}

export const INBOX_ONBOARDING_REAL_ESTATE_ID =
  '1486a892-1fd9-49fa-8681-360ca51631b0';

export const INBOX_FILTER_TOOLTIP_REAL_ESTATE_ID =
  'add338f9-7645-4f4e-a49a-090273528244';
