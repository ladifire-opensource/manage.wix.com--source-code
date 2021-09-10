import { dsl } from '@wix/yoshi-serverless/wrap';

export const getContactsDataApi = dsl({
          functionName: 'getContactsDataApi',
          fileName: 'api/Contacts.api',
        });