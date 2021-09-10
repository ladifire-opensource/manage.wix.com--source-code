import { configureGQLClient } from '@wix/wixstores-client-core/dist/src/graphql-client';
import { IStoreInfo } from '@wix/wixstores-graphql-schema';

import { getStoreInfo } from './graphql';

const getStoreInfoAsync = async (instance: string): Promise<IStoreInfo> => {
  const GQLClient = configureGQLClient({ instance });
  const data = ((await GQLClient.query({
    ...getStoreInfo(),
    fetchPolicy: 'network-only',
  })) as any).data;

  return data.storeInfo as IStoreInfo;
};

const StoreService = { getInfo: getStoreInfoAsync };

export { StoreService };
