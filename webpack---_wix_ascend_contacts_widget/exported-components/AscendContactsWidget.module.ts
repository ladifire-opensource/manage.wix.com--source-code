import { ResolveFn } from '@wix/yoshi-flow-bm';
import { contactsDTO } from '../services/ContactsDTO';
import { getContactsDataApi } from '../api/Contacts.api';

export interface ResolvedProps {}

export const resolve: ResolveFn<ResolvedProps> = async ({
  moduleParams,
  fedopsLogger,
  httpClient,
}) => {
  fedopsLogger.appLoadStarted();
  const locale = moduleParams.accountLanguage;
  let success: boolean = false;

  const { data } = await httpClient.request(getContactsDataApi);

  const { contactsData, totalNumberOfContacts } = contactsDTO(data, locale);

  success = true;

  return {
    contactsData,
    totalNumberOfContacts,
    success,
    locale,
  };
};
