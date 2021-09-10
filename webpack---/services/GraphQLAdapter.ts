import axios from 'axios';
import {getCurrentInstance, appDefIds} from '@wix/business-manager-api';

export const GRAPH_QL_ENDPOINT = '/_api/wixstores-graphql-server/graphql';

export interface WatchQueryOptions {
  query: any;
}

export class GraphQLAdapter {
  /* istanbul ignore next */
  public async query<T>(options: WatchQueryOptions, reportError: (e: Error) => void) {
    try {
      const query = options.query;
      const response = await axios.post(
        GRAPH_QL_ENDPOINT,
        {
          query: query.loc?.source.body,
        },
        {
          headers: {
            Authorization: getCurrentInstance(appDefIds.wixECommerce),
          },
        }
      );
      const {data} = response;
      return {
        settings: data.data.settings,
        orders2: data.data.orders2,
      };
      // eslint-disable-next-line sonarjs/no-useless-catch
    } catch (err) {
      reportError(err);
      throw err;
    }
  }
}
