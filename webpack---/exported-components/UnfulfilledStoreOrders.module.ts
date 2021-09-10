import {ResolveFn} from 'yoshi-flow-bm-runtime';
import {StoresApiService} from '../services/StoreApiService';
import {Order, StoreSettings} from '@wix/wixstores-graphql-schema-node';
import {createErrorReporter} from '../common/sentry';

export interface ResolvedProps {
  totalCount: number;
  settings: StoreSettings;
  orders: Order[];
}

export const resolve: ResolveFn<ResolvedProps> = async ({moduleParams, sentry}) => {
  const data = await StoresApiService.getInitialData({
    reportError: createErrorReporter(sentry, moduleParams),
  });
  return {
    settings: data.settings,
    orders: data.orders2.orders || [],
    totalCount: data.orders2.totalCount,
  };
};
