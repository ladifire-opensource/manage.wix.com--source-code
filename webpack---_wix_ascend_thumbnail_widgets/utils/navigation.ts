import { navigateTo, PageComponentId } from '@wix/business-manager-api';

export interface ContextData {
  referrer: string;
  appState?: string;
}

export const navigateToSocialPosts = ({
  intentId,
  presetId,
  bgUrl,
  referrer,
}: {
  intentId: string;
  presetId: string;
  bgUrl: string;
  referrer: string;
}) => {
  navigateTo({
    pageComponentId: PageComponentId.ShareitWeb,
    contextData: {
      referrer,
      appState: `?dl=composer&intentId=${intentId}&presetId=${presetId}&bgUrl=${bgUrl}`,
    },
  });
};

export const naviagteToEmailMarketing = ({
  templateId,
  referrer,
}: {
  referrer: string;
  templateId: string;
}) => {
  navigateTo({
    pageComponentId: PageComponentId.Shoutout,
    contextData: {
      referrer,
      appState: `?dl=message`,
    },
    payload: {
      messageId: templateId,
      params: {},
    },
  });
};
