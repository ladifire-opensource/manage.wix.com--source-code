import { cloneDeep } from 'lodash';
import EventEmitter from 'eventemitter3';
import {
  GetDataViewResponse,
  QueryDataViewRequest,
} from '@wix/ambassador-analytics-ng-server/types';
import { IQueryData, ReportsRegistry, UserStatus } from '@wix/analytics-ng-common';

import {
  IAggregatedQueryResult,
  IAppsService,
  IPremiumService,
  IQueryResult,
  IReportingService,
  IReportsContainer,
  IReportsOptions,
  IStorageOptions,
  IStorageService,
  ITimeService,
  ReportingServiceEventTypes,
  StorageLocationType,
} from '../../types/types';
import { ReportsContainer } from './ReportsContainer';
import { UnifiedReportsContainer } from './UnifiedReportsContainer';
import { NGServerService } from '../NGServerService';

export interface IReportingServiceOptions {}

enum InitializedState {
  NOT_INITIALIZED = 'NOT_INITIALIZED',
  INITIALIZING = 'INITIALIZING',
  INITIALIZED = 'INITIALIZED',
}

export class ReportingService
  extends EventEmitter<ReportingServiceEventTypes>
  implements IReportingService, IStorageService {
  _tenantId: string;
  _dataService: NGServerService;
  _views: { [key: string]: GetDataViewResponse };
  _options: IReportingServiceOptions;
  _storageService: IStorageService;
  _timeService: ITimeService;
  _premiumService: IPremiumService;
  _appsService: IAppsService;
  _isFreeSite: boolean;
  private _initializedState: InitializedState;
  private _dashboardStats: any;
  private readonly _keysToUnifiedReportsContainers: {
    [key: string]: UnifiedReportsContainer;
  };
  private _isPremium: boolean;
  private _hasBusinessPlan: boolean;
  status: any;

  constructor(
    tenantId: string,
    storageService: IStorageService,
    timeService: ITimeService,
    premiumService: IPremiumService,
    dataService: NGServerService,
    appsService: IAppsService,
    options: IReportingServiceOptions,
  ) {
    super();
    this._keysToUnifiedReportsContainers = {};
    this._tenantId = tenantId;
    this._options = options;
    this._views = {};
    this._dataService = dataService;
    this._timeService = timeService;
    this._storageService = storageService;
    this._premiumService = premiumService;
    this._appsService = appsService;
    this._initializedState = InitializedState.NOT_INITIALIZED;
    this.status = new UserStatus();
  }

  getReportUnifiedMeasures(reportId: string): string {
    const reportData = ReportsRegistry.getReportData(reportId);
    if (!reportData) {
      throw new Error(
        `ReportingService - getReportUnifiedMeasures - Report Id '${reportId}' doesn't exist`,
      );
    }
    const {
      unifiedApi: { measure },
    } = reportData;

    return measure;
  }

  getReportUnifiedDataView(reportId: string): string {
    const reportData = ReportsRegistry.getReportData(reportId);
    if (!reportData) {
      throw new Error(
        `ReportingService - getReportUnifiedDataView - Report Id '${reportId}' doesn't exist`,
      );
    }
    const {
      unifiedApi: { dataView },
    } = reportData;

    return dataView;
  }

  getDashboardStats(): string[] {
    if (!this._dashboardStats) {
      this._dashboardStats = this.getDefaultDashboardStats();
    }
    return this._dashboardStats;
  }

  _getDashboardStatsKey(): string {
    return 'dashboard';
  }

  _getStatusKey(): string {
    return 'status_key';
  }

  setDashboardStats(stats: string[]): void {
    this._dashboardStats = stats;

    void this._storageService.set<any>(this._getDashboardStatsKey(), stats, {
      storageType: StorageLocationType.Local,
    });

    this.emit(ReportingServiceEventTypes.DASHBOARD_STATS_UPDATED);
  }

  async _initializedPremium() {
    const [{ isPremium, hasBusinessPlan }, isFreeSite] = await Promise.all([
      this._premiumService.getDashboardsPermissions(),
      this._premiumService.isFreeSite(),
    ]);
    this._isFreeSite = isFreeSite;
    this._isPremium = isPremium;
    this._hasBusinessPlan = hasBusinessPlan;
  }

  async _initializeDashboardStats() {
    this._dashboardStats = await this._storageService.get<any>(this._getDashboardStatsKey(), {
      storageType: StorageLocationType.Local,
    });
  }

  async _initializeUnifiedApiView() {
    // await Promise.all([this.getViewData('unified_api'), this.getViewData('unified_api_embed')]);
  }

  async initialize() {
    if (this._initializedState === InitializedState.NOT_INITIALIZED) {
      this._initializedState = InitializedState.INITIALIZING;
      await Promise.all([
        this._initializedPremium(),
        this._initializeDashboardStats(),
        // this._initializeUnifiedApiView(),
      ]);
      this._initializedState = InitializedState.INITIALIZED;
    }
    this.emit(ReportingServiceEventTypes.INITIALIZED);
  }

  set<dataType>(key: string, data: dataType, options: IStorageOptions): Promise<void> {
    return this._storageService.set<dataType>(key, data, options);
  }

  get<dataType>(key: string, options: IStorageOptions): Promise<dataType> {
    return this._storageService.get<dataType>(key, options);
  }

  getCurrentTimestamp(): number {
    return this._timeService.getCurrentTimestamp();
  }

  _getView(view: string): Promise<GetDataViewResponse> {
    return this._dataService.getDataView({ view });
  }

  async getViewData(widgetTitle: string, view: string): Promise<GetDataViewResponse> {
    let viewData = this._views[view];

    if (!viewData) {
      viewData = await this._storageService.get<GetDataViewResponse>(`${widgetTitle}${view}`, {
        storageType: StorageLocationType.Local,
      });
    }

    if (!viewData) {
      viewData = await this._getView(view);
      this._views[view] = viewData;
      void this._storageService.set<GetDataViewResponse>(`${widgetTitle}${view}`, viewData, {
        storageType: StorageLocationType.Local,
        expirationInSeconds: 60 * 60 * 24,
      });
    }

    return viewData;
  }

  async getReports(key: string, options: IReportsOptions): Promise<IReportsContainer> {
    const { isUnified, preloadReportsIds = [] } = options;
    if (isUnified) {
      const reportIds = preloadReportsIds;
      if (!this._keysToUnifiedReportsContainers[key]) {
        this._keysToUnifiedReportsContainers[key] = new UnifiedReportsContainer(
          key,
          this,
          reportIds,
          options,
        );
      }
      return this._keysToUnifiedReportsContainers[key];
    }
    return new ReportsContainer(key, this, [], options);
  }

  loadQueryDataById(reportId: string): IQueryData {
    const query = cloneDeep(ReportsRegistry.getReportData(reportId).queryData);

    return query;
  }

  async runAggregatedQuery(
    query: QueryDataViewRequest,
    chunkSize?: number,
  ): Promise<IAggregatedQueryResult> {
    const data = await this._dataService.queryDataViewWithAggregate({
      query,
      chunkSize,
    });

    const timestamp: number = this._timeService.getCurrentTimestamp();
    const queryResult = {
      data: data.data,
      timestamp,
      updatedAt: data.updatedAt,
    };

    return queryResult;
  }

  async runQuery(query: QueryDataViewRequest): Promise<IQueryResult> {
    const {
      view,
      dimensions,
      measures,
      filters,
      limit,
      sorts,
      timezone,
      bypassCache,
      predefined,
    } = query;

    const dataResult = await this._dataService.queryDataView({
      view,
      tenantId: this._tenantId,
      dimensions,
      measures,
      filters,
      limit,
      sorts,
      timezone,
      bypassCache,
      predefined,
    });

    const timestamp: number = this._timeService.getCurrentTimestamp();
    const queryResult = { data: dataResult.data, timestamp };

    return queryResult;
  }

  getDefaultDashboardStats = (): string[] => {
    const hasBlog = this._appsService.isBlogInstalled();
    const hasBookings = this._appsService.isBookingsInstalled();

    if (!this._isPremium || this._hasBusinessPlan) {
      if (hasBlog && hasBookings) {
        return ['traffic_api.sessions_count', 'bookings_api.bookings', 'transactions_api.amount'];
      }
      if (hasBlog) {
        return ['traffic_api.sessions_count', 'blog_api.view_count', 'transactions_api.amount'];
      }
      if (hasBookings) {
        return ['traffic_api.sessions_count', 'bookings_api.bookings', 'transactions_api.amount'];
      }
      return ['traffic_api.sessions_count', 'people_api.active_leads', 'transactions_api.amount'];
    }
    if (hasBlog && hasBookings) {
      return ['traffic_api.sessions_count', 'blog_api.view_count', 'bookings_api.bookings'];
    }
    if (hasBlog) {
      return ['traffic_api.sessions_count', 'blog_api.view_count', 'people_api.active_leads'];
    }
    if (hasBookings) {
      return ['traffic_api.sessions_count', 'people_api.active_leads', 'bookings_api.bookings'];
    }
    return ['traffic_api.sessions_count', 'people_api.active_leads'];
  };

  async updateCacheUserStatus(cachedStatus: { [key: string]: boolean }): Promise<void> {
    const statusKey = this._getStatusKey();
    const currentCachedStatus = await this.get<{ [key: string]: boolean }>(statusKey, {
      storageType: StorageLocationType.Remote,
    });

    const newCachedStatus = { ...currentCachedStatus, ...cachedStatus };
    void this.set<{ [key: string]: boolean }>(statusKey, newCachedStatus, {
      storageType: StorageLocationType.Remote,
    });
  }

  async getCachedUserStatus(): Promise<{ [key: string]: boolean }> {
    const statusKey = this._getStatusKey();
    return this.get<{ [key: string]: boolean }>(statusKey, {
      storageType: StorageLocationType.Remote,
    });
  }
}
