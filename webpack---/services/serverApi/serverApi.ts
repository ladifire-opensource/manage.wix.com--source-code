import axios, { AxiosInstance } from 'axios';
import { wixAxiosInstanceConfig } from '@wix/wix-axios-config';
import Experiments, { ExperimentsBag } from '@wix/wix-experiments';
import { getInstance } from '../BusinessManagerService';
import { ContactsByChatroom, IContactInfo } from '../../types';
import { WidgetView } from '../../components/WidgetLoader/WidgetLoader';

export interface Permissions {
  permissions: string[];
}

export interface ChatToken {
  chatToken: string;
}

export const getWixInboxInstanceHeaders = (
  useAuthorizationHeader = false,
  view: WidgetView = 'site_level',
) => {
  const authHeaderValue = view === 'site_level' ? getInstance() : undefined;
  if (!authHeaderValue) {
    // in site-less mode (dashboard site-list - we don't have a BM instance)
    // server api calls should work with cookie
    return {};
  }
  const AuthHeaderName = useAuthorizationHeader
    ? 'Authorization'
    : 'X-Wix-Inbox-Instance';
  return {
    [AuthHeaderName]: authHeaderValue,
  };
};

export const axiosInstance: AxiosInstance = wixAxiosInstanceConfig(axios, {
  baseURL: `/`,
});

export const inboxUrlPrefix = '/_api/crm-inbox-server';
export const chatTokensPrefix = '/_api/wix-chat-tokens-server';
export const coreChatUrlPrefix = `${inboxUrlPrefix}/core-chat`;

export const getPermissions = (): Promise<Permissions> => {
  return axiosInstance
    .get(`${inboxUrlPrefix}/v2/permissions`, {
      headers: getWixInboxInstanceHeaders(),
    })
    .then((res) => res.data);
};

export const getChatToken = (view: WidgetView): Promise<ChatToken> => {
  return axiosInstance
    .post(
      `${chatTokensPrefix}/v1/chat-tokens?isForUnifiedList=true`,
      {},
      {
        headers: getWixInboxInstanceHeaders(true, view),
      },
    )
    .then((res) => res.data);
};

export const conductScopes = async (
  scopes: string[],
): Promise<ExperimentsBag> => {
  const experiments = new Experiments({ requestContext: {} });

  scopes.forEach((scope) => experiments.load(scope));

  await experiments.ready();

  return experiments.all();
};

export const getContactInfo = (obj: {
  contactId?: string;
  chatroomId?: string;
}): Promise<IContactInfo> => {
  return axiosInstance
    .put(`${coreChatUrlPrefix}/conversations`, obj, {
      headers: getWixInboxInstanceHeaders(),
    })
    .then((res) => res.data);
};

export const getBatchContactInfo = ({
  contactIds,
}: {
  contactIds: string[];
}): Promise<{ results: ContactsByChatroom }> => {
  return axiosInstance
    .post(
      `${inboxUrlPrefix}/contacts`,
      { contactIds },
      {
        headers: getWixInboxInstanceHeaders(),
      },
    )
    .then((res) => res.data)
    .catch(() => ({ results: {} }));
};

export const getUserSiteList = (
  limit: number = 2,
): Promise<{
  entries: any[];
}> => {
  return axiosInstance
    .post(
      `/meta-site-search-web/v2/search`,
      {
        paging: { pageSize: limit },
        filters: { state: 'ACTIVE' },
      },
      {
        headers: getWixInboxInstanceHeaders(),
      },
    )
    .then((res) => res.data);
};
