import {
  AggregatedData,
  AlertType,
  CompareType,
  GetDashboardsPermissionsResponse,
  GetDataViewResponse,
  PeriodEnumPeriod,
  PredefinedTimeframe,
  QueryDataViewRequest,
} from '@wix/ambassador-analytics-ng-server/types';
import EventEmitter from 'eventemitter3';
import { TModuleParams } from '@wix/business-manager-api';
import { IQueryData } from '@wix/analytics-ng-common';

import { AlertColorScheme, ReportCategories, EnterReportOriginBI } from '../constants/enums';

declare interface JsonMap<T> {
  [key: string]: T;
}

export interface IDashboard {
  name: string;
  category: ReportCategories;
  title: string;
  description: string;
  main: boolean;
  new: boolean;
  deleted: boolean;
  order: undefined | number;
  scopes: string[];
  permissions: string[];
  shares: string[];
  experiments: string[];
  visIcon: string;
  groupId: string;
  external: {
    dashboardId: string | undefined;
    userId: string | undefined;
    dashboard?: any;
    dashboardIdLookML: string | undefined;
    dashboardIdLookML_advanced: string | undefined;
    dashboardIdLookML_mobile: string | undefined;
  };
  dashboardId: string;
  createdAt: string;
  visibility: string;
  privacy: string;
  owner: string;
  ownerProfile: {
    firstName: string;
    lastName: string;
    email: string;
  };
  tenantId: string;
  reportHelperContent: {
    aboutReport: string;
  };
}

export interface IGroup {
  groupId: string;
  name: string;
  defaultView: string;
}

export const VisIcons = {
  table: 'table',
  chart: 'chart',
  bars: 'bars',
  barsSplit: 'bars split',
  combo: 'combo',
  line: 'line',
  lineSplit: 'line split',
  lineChartPercentage: 'line chart percentage',
  map: 'map',
  cityMap: 'city map',
  pie: 'pie',
  heatmap: 'heatmap',
  funnel: 'funnel',
};

export const PRIVACY_PUBLIC = 'public';
export const PRIVACY_PRIVATE = 'private';

export const REFERRAL_INFO = 'referralInfo';
export const EMAIL_PARAM = 'email';
export const ALERT_EMAIL_PARAM = 'alert-email';
export const WIDGET_PARAM = 'widget';
export const SIDEBAR_PARAM = 'sidebar';
export const ANALYTICS_MARKETING_PAGE_PARAM = 'analytics_marketing_page';
export const NEW_RELEASES = 'new_releases';
export const INSIGHTS = 'insights';
export const INSIGHTS_WIDGET = 'insights-widget';
export const SUGGESTIONS_ANALYTICS_DIGEST_EMAIL_PARAM = 'suggestions_analytics_digest_email';
export const DIGEST_MAIL_HOW_PEOPLE_FIND_YOU_PARAM = 'digest_mail_how_people_find_you';
export const DIGEST_MAIL_TRAFFIC_INSIGHTS_PARAM = 'digest_mail_traffic_insights';
export const DIGEST_MAIL_BOOKINGS_STATS_PARAM = 'digest_mail_bookings_stats';
export const DIGEST_MAIL_STORE_STATS_PARAM = 'digest_mail_store_stats';
export const DIGEST_MAIL_BLOG_STATS_PARAM = 'digest_mail_blog_stats';
export const DIGEST_MAIL_MAIN_CTA_TOP_PARAM = 'digest_mail_main_CTA_top';
export const DIGEST_MAIL_VISITORS_AND_REFERRAL_TRAFFIC_PARAM =
  'digest_mail_visitors_and_referral_traffic';
export const DIGEST_MAIL_MAIN_CTA_BOTTOM_PARAM = 'digest_mail_main_CTA_bottom';
export const EMAIL_UPDATES_PARAM = 'email_updates';
export const TRAFFIC_OVERVIEW_PAGE_PARAM = 'traffic-overview-page';
export const SALES_OVERVIEW_PAGE_PARAM = 'sales-overview-page';
export const FORECAST_PAGE_PARAM = 'forecast-page';

export const REFERRAL_INFO_FOR_BI = {
  [EMAIL_PARAM]: EnterReportOriginBI.subscribeEmail,
  [ALERT_EMAIL_PARAM]: EnterReportOriginBI.alertEmail,
  [WIDGET_PARAM]: EnterReportOriginBI.dashboardWidget,
  [SIDEBAR_PARAM]: EnterReportOriginBI.sidebar,
  [ANALYTICS_MARKETING_PAGE_PARAM]: EnterReportOriginBI.analyticsMarketingPage,
  [NEW_RELEASES]: EnterReportOriginBI.newReleases,
  [INSIGHTS]: EnterReportOriginBI.insights,
  [INSIGHTS_WIDGET]: EnterReportOriginBI.insightsWidget,
  [SUGGESTIONS_ANALYTICS_DIGEST_EMAIL_PARAM]: EnterReportOriginBI.suggestionsAnalyticsDigestEmail,
  [DIGEST_MAIL_HOW_PEOPLE_FIND_YOU_PARAM]: EnterReportOriginBI.digestMailHowPeopleFindYou,
  [DIGEST_MAIL_TRAFFIC_INSIGHTS_PARAM]: EnterReportOriginBI.digestMailTrafficInsights,
  [DIGEST_MAIL_BOOKINGS_STATS_PARAM]: EnterReportOriginBI.digestMailBookingsStats,
  [DIGEST_MAIL_STORE_STATS_PARAM]: EnterReportOriginBI.digestMailStoreStats,
  [DIGEST_MAIL_BLOG_STATS_PARAM]: EnterReportOriginBI.digestMailBlogStats,
  [DIGEST_MAIL_MAIN_CTA_TOP_PARAM]: EnterReportOriginBI.digestMailMainCTATop,
  [DIGEST_MAIL_VISITORS_AND_REFERRAL_TRAFFIC_PARAM]:
    EnterReportOriginBI.digestMailVisitorsAndReferralTraffic,
  [DIGEST_MAIL_MAIN_CTA_BOTTOM_PARAM]: EnterReportOriginBI.digestMailMainCTABottom,
  [EMAIL_UPDATES_PARAM]: EnterReportOriginBI.emailUpdates,
  [TRAFFIC_OVERVIEW_PAGE_PARAM]: EnterReportOriginBI.trafficOverviewPage,
  [SALES_OVERVIEW_PAGE_PARAM]: EnterReportOriginBI.salesOverviewPage,
  [FORECAST_PAGE_PARAM]: EnterReportOriginBI.forecastPage,
};

export const DownloadTaskStatuses = {
  success: 'success',
  failure: 'failure',
};

export enum InfoModalMode {
  Create = 1,
  DuplicateAndEdit,
}

export enum StorageLocationType {
  Local = 'localStorage',
  Remote = 'remoteStorage',
}

export enum PremiumSiteStatus {
  FREE = 'FREE',
  PREMIUM = 'PREMIUM',
  PREMIUM_MAX_PLAN = 'PREMIUM_MAX_PLAN',
}

export interface IStorageOptions {
  storageType: StorageLocationType;
  expirationInSeconds?: number;
}

export interface IStorageService {
  set<dataType>(key: string, data: dataType, options: IStorageOptions): Promise<void>;
  get<dataType>(key: string, options: IStorageOptions): Promise<dataType>;
}

export interface ITimeService {
  getHoursInMS(hours: number): number;
  getCurrentTimestamp(): number;
}

export interface IPremiumService extends EventEmitter {
  isFreeSite(): Promise<boolean>;
  getDashboardsPermissions(): Promise<GetDashboardsPermissionsResponse>;
}

export interface IInitialDataService extends EventEmitter {
  getInitialData(props: any): Promise<any>;
}

export interface IAppsService {
  isBlogInstalled(): boolean;
  isBookingsInstalled(): boolean;
}

export enum QueryStatus {
  NONE = 'QUERY_STATE_NONE',
  FETCHING = 'QUERY_STATE_FETCHING',
  STALE_DATA = 'QUERY_STALE_DATA',
  UPDATED = 'QUERY_STATE_UPDATED',
  UPDATING = 'QUERY_STATE_REFRESHING',
  GENERAL_ERROR = 'QUERY_STATE_GENERAL_ERROR',
  INVALIDATING = 'INVALIDATING',
}

export interface IQueryResult {
  data: JsonMap<any>[];
  timestamp: number;
}

export interface IAggregatedQueryResult {
  data: AggregatedData;
  timestamp: number;
  updatedAt: string;
}

export interface IAnalyticResult {
  measuredResult: AggregatedData;
  view: GetDataViewResponse;
  updatedAt: string;
}
export type DataUpdateCallback = (status: QueryStatus, analyticData: IAnalyticResult) => any;

export interface ITimeFrame {
  timeframe: PredefinedTimeframe;
}

/** ***********************************/

type ReportId = string;

export enum ReportEventTypes {
  DISPOSED = 'DISPOSED',
  DataUpdated = 'DataUpdated',
  REPORTS_CHANGED = 'REPORTS_CHANGED',
  TIMEFRAME_CHANGED = 'TIMEFRAME_CHANGED',
}

export enum ReportingServiceEventTypes {
  DASHBOARD_STATS_UPDATED = 'DASHBOARD_STATS_UPDATED',
  INITIALIZED = 'INITIALIZED',
}

export interface IReportsOptions {
  isUnified: boolean;
  preloadReportsIds: string[];
  requirements?: string[];
  defaultTimeframe?: PredefinedTimeframe;
}

export interface IReport extends EventEmitter<ReportEventTypes> {
  onDataUpdated(callback: DataUpdateCallback): Promise<void>;
  refreshData(): Promise<void>;
  dispose(): void;
  getStatus(): QueryStatus;
  getQueryResult(): IAnalyticResult;
  getReportId(): string;
  changeTimeframe(timeframe: PredefinedTimeframe): Promise<void>;
  getTimeframe(): PredefinedTimeframe;
  getUpdatedAt(): string;
}

export interface IReportsContainer extends EventEmitter<ReportEventTypes> {
  setRequirementsIds(requirements: string[]);
  initialize(options: IReportsOptions): Promise<void>;
  getReport(reportId: ReportId): IReport;
  disposeReport(reportId: ReportId): void;
  dispose(): void;
  refreshReport(reportId: ReportId, options: IQueryOptions): Promise<void>;
  refreshData({ bypassCache: boolean }): void;
  changeTimeframe(timeframe: ITimeFrame): void;
  getTimeframe(): ITimeFrame;
  getCachedResult(reportId: string): Promise<IAnalyticResult>;
  setCachedResult(reportId: string, result: IAnalyticResult): Promise<void>;
  isWorking(): boolean;
  runQuery(reportId: string, options: IQueryOptions): Promise<void>;
  setReportIds(reportsData: IReportData[]): void;
  getReportIds(): string[];
  getUpdatedAt(): string;
}

export interface IReportingService
  extends IStorageService,
    EventEmitter<ReportingServiceEventTypes> {
  updateCacheUserStatus(cachedRequirement: { [key: string]: boolean }): Promise<void>;
  status: any;
  getViewData(widgetTitle: string, view: string): Promise<GetDataViewResponse>;
  getReports(key: string, options: IReportsOptions): Promise<IReportsContainer>;
  loadQueryDataById(reportId: string): IQueryData;
  runQuery(query: QueryDataViewRequest): Promise<IQueryResult>;
  runAggregatedQuery(
    query: QueryDataViewRequest,
    chunkSize?: number,
  ): Promise<IAggregatedQueryResult>;
  getCurrentTimestamp(): number;
  setDashboardStats(stats: string[]): void;
  getDashboardStats(): string[];
  getReportUnifiedMeasures(reportId: string): string;
  getDefaultDashboardStats(): string[];
  getReportUnifiedDataView(reportId: string);
}

export const ADVANCED = '_advanced';

export interface IReportingWidgetProps {
  reportKey: string;
  reportingService: IReportingService;
  moduleParams: TModuleParams;
  onLoaded(data?: any): void;
  onRemoved(data?: any): void;
  hasBusinessPlan: boolean;
  isPremium: boolean;
  shouldConnectPaymentMethod: boolean;
  userProfile: { [key: string]: any };
}

export interface IQueryOptions {
  bypassCache: boolean;
}

export interface IDatePeriod {
  startDate: Date;
  endDate?: Date;
}

export interface IDatePeriods {
  startPeriod: IDatePeriod;
  endPeriod?: IDatePeriod;
}

export interface IAlert {
  active: boolean;
  alertId: string;
  alertType: AlertType;
  compareType: CompareType;
  createdAt: string;
  dayOfMonth: number;
  dayOfWeek: number;
  measureToCheck: string;
  name: string;
  owner: string;
  period: PeriodEnumPeriod;
  system: boolean;
  timesTriggered: number;
  compareValue: string;
  lastTimeTriggered: string;
  colorScheme: AlertColorScheme;
  statKey: string;
}

export interface IReportData {
  reportId: string;
  timeframe?: PredefinedTimeframe;
}
