import { AnalyticsNgServer } from '@wix/ambassador-analytics-ng-server/http';
import {
  AggregateQueryResponse,
  GetDataViewRequest,
  GetDataViewResponse,
  QueryDataViewAggregatedRequest,
  QueryDataViewRequest,
  QueryDataViewResponse,
} from '@wix/ambassador-analytics-ng-server/types';

export class NGServerService {
  private readonly _dataService: any;

  constructor(baseUrl: string, instance: string) {
    const analyticsNgServer = AnalyticsNgServer(baseUrl);
    this._dataService = analyticsNgServer.DataService()({
      Authorization: instance,
    });
  }

  getDataView(getDataViewRequest: GetDataViewRequest): Promise<GetDataViewResponse> {
    return this._dataService.getDataView(getDataViewRequest);
  }

  queryDataView(queryDataViewRequest: QueryDataViewRequest): Promise<QueryDataViewResponse> {
    return this._dataService.queryDataView(queryDataViewRequest);
  }

  queryDataViewWithAggregate(
    queryDataViewAggregatedRequest: QueryDataViewAggregatedRequest,
  ): Promise<AggregateQueryResponse> {
    return this._dataService.queryDataViewWithAggregate(queryDataViewAggregatedRequest);
  }
}
