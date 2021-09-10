import axios from 'axios';
import {
  IQueryParams, DataType, IServiceSearchResults,
  IContactsSearchResult, IContactsAPIResponse
} from '../../types';
import { AXIOS_TIMEOUT } from '../constants';
import { appDefIds, getCurrentInstance } from '@wix/business-manager-api';

const EXPANDED_PAGE_SIZE = 33;

const contactsSearchUrl = '/_api/contacts/v4/contacts/query';

const getFullName = (contact: IContactsAPIResponse): string => {
  if (!contact.info?.name?.first) {
    return contact.info?.name?.last || '';
  }

  if (!contact.info.name.last) {
    return contact.info.name.first;
  }

  return `${contact.info.name.first} ${contact.info.name.last}`
};

const getInitials = (contact: IContactsAPIResponse) => {
  const first = contact.info?.name?.first?.charAt(0) || '';
  const last = contact.info?.name?.last?.charAt(0) || '';

  return `${first}${last}`.toLocaleUpperCase();
};

export class ContactsService {
  static pageSize = 3;

  static async search({ query }: IQueryParams): Promise<IServiceSearchResults> {
    const result = await axios.post(contactsSearchUrl, {
      search: query,
      query: {
        paging: {
           limit: EXPANDED_PAGE_SIZE
        }
      }
    }, {
      timeout: AXIOS_TIMEOUT,
      headers: {
        Authorization: getCurrentInstance(appDefIds.metaSite)
      }
    });

    const data: { contacts: IContactsAPIResponse[]; pagingMetadata: { total: number } } = result.data;

    const results = (data?.contacts || []).map<IContactsSearchResult>(res => ({
      type: DataType.Contacts,
      id: res.id,
      title: getFullName(res),
      snippet: res.primaryInfo?.email,
      avatar: res.info?.picture?.image?.url || getFullName(res) || '?',
      payload: {
        contactId: res.id,
        initials: getInitials(res)
      }
    }));

    const totalResults = data?.pagingMetadata?.total && data.pagingMetadata.total || results.length;

    return { results, totalResults, availableResults: results.length };
  }
}
