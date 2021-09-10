import {GraphQLAdapter} from './GraphQLAdapter';
import getInitialDataQuery from '../graphql/initialData.graphql';
import {StoreSettings, OrderQueryResult} from '@wix/wixstores-graphql-schema-node';

export interface InitialDataParams {
  reportError: (e: Error) => void;
}

export const StoresApiService = {
  getInitialData: async ({reportError}: InitialDataParams) => {
    const apolloGqlClientAdapter = new GraphQLAdapter();
    return apolloGqlClientAdapter.query<{
      settings: StoreSettings;
      orders2: OrderQueryResult;
    }>(
      {
        query: getInitialDataQuery as any,
      },
      reportError
    );
  },
};
