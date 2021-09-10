import EventEmitter from 'eventemitter3';
import { PredefinedTimeframe } from '@wix/ambassador-analytics-ng-server/types';

import {
  IReportsContainer,
  IReport,
  ITimeFrame,
  IReportingService,
  IReportsOptions,
  ReportEventTypes,
  IAnalyticResult,
  StorageLocationType,
  QueryStatus,
  IQueryOptions,
  IReportData,
} from '../../types/types';
import { Report } from './Report';

export class ReportsContainer extends EventEmitter<ReportEventTypes> implements IReportsContainer {
  private readonly _key: string;
  protected readonly _service: IReportingService;
  readonly _options: IReportsOptions;
  private _reportsRegistry: Report[];
  private _timeframe: ITimeFrame;
  private _isInitialized: boolean;
  requirementsIds: string[];

  constructor(
    key: string,
    reportingService: IReportingService,
    reportsData: IReportData[],
    options: IReportsOptions,
  ) {
    super();
    this._key = key;
    this._service = reportingService;
    this._options = options;
    this._reportsRegistry = [];
    this._isInitialized = false;
    this._timeframe = {
      timeframe: options.defaultTimeframe || PredefinedTimeframe.LAST_30_DAYS,
    };
    this.requirementsIds = [];
    this._createReports(reportsData);
    void this.initialize(options);
  }

  getReportIds(): string[] {
    return this._getAllReportIds();
  }

  setReportIds(reportsData: IReportData[]): void {
    // Remove reports that are not in the list
    this._forEachReport((report) => {
      const reportId = report.getReportId();
      if (!reportsData.some((reportData) => reportData.reportId === reportId)) {
        report.dispose();
      }
    });
    this._createReports(reportsData);
    this.emit(ReportEventTypes.REPORTS_CHANGED);
  }

  setRequirementsIds(requirementsIds: string[]) {
    this.requirementsIds = requirementsIds;
  }

  private _createReports(reportsData: IReportData[]) {
    reportsData
      // Add missing reports and update timeframes
      .forEach(({ reportId, timeframe }) => {
        const report = this._getReport(reportId);
        if (report) {
          if (timeframe) {
            void report.changeTimeframe(timeframe);
          }
        } else {
          const newReport = new Report(
            this,
            reportId,
            timeframe || this._timeframe.timeframe,
            this._options,
          );
          this._reportsRegistry.push(newReport);
          newReport.on(ReportEventTypes.DataUpdated, () => {
            this.emit(ReportEventTypes.DataUpdated);
          });
          newReport.on(ReportEventTypes.DISPOSED, (params) => {
            const { reportId: disposedReportId } = params;
            const reportIndex = this._getReportIndex(disposedReportId);
            if (reportIndex !== -1) {
              this._reportsRegistry.splice(reportIndex, 1);
            }
          });
        }
      });

    // Sort the reports list
    this._reportsRegistry = this._reportsRegistry.sort((reportA, reportB) => {
      const reportAId = reportA.getReportId();
      const reportBId = reportB.getReportId();
      return (
        reportsData.map((data) => data.reportId).indexOf(reportAId) -
        reportsData.map((data) => data.reportId).indexOf(reportBId)
      );
    });
  }

  _getReportIndex(reportId: string): number {
    const report = this._getReport(reportId);
    return this._reportsRegistry.indexOf(report);
  }

  isWorking(): boolean {
    const allReportIds = this._getAllReportIds();
    return allReportIds.some((reportId) => {
      const report = this.getReport(reportId);
      return report.getStatus() !== QueryStatus.UPDATED;
    });
  }

  _getAnalyticResultKey(reportId: string): string {
    return `${this._key}${reportId}result`;
  }

  _getTimeframeKey(): string {
    return `${this._key}timeframe`;
  }

  getWidgetKey(): string {
    return this._key;
  }

  getCachedResult(reportId: string): Promise<IAnalyticResult> {
    return this._service.get<IAnalyticResult>(this._getAnalyticResultKey(reportId), {
      storageType: StorageLocationType.Local,
    });
  }

  setCachedResult(reportId: string, result: IAnalyticResult): Promise<void> {
    return this._service.set<IAnalyticResult>(this._getAnalyticResultKey(reportId), result, {
      storageType: StorageLocationType.Local,
    });
  }

  async _initializeTimeframe(): Promise<void> {
    const timeframe = await this._service.get<ITimeFrame>(this._getTimeframeKey(), {
      storageType: StorageLocationType.Local,
    });

    this._timeframe = timeframe || this._timeframe;
    this.emit(ReportEventTypes.TIMEFRAME_CHANGED, this.getTimeframe().timeframe);
  }

  async initialize(options: IReportsOptions): Promise<void> {
    const { preloadReportsIds } = options;
    if (!this._isInitialized) {
      this._isInitialized = true;
      await Promise.all([this._initializeTimeframe()]);
      if (preloadReportsIds.length > 0) {
        this.refreshData({ bypassCache: false });
      }
    }
  }

  getTimeframe(): ITimeFrame {
    return this._timeframe;
  }

  _getReport(reportId: string): Report {
    return this._reportsRegistry.find((report) => {
      return report.getReportId() === reportId;
    });
  }

  disposeReport(reportId: string): void {
    const report = this._getReport(reportId);
    report.dispose();
  }

  getUpdatedAt() {
    const allReportIds = this._getAllReportIds();
    const reportId = allReportIds && allReportIds[0];
    return reportId ? this.getReport(reportId).getUpdatedAt() : null;
  }

  getReport(reportId: string): IReport {
    let report = this._getReport(reportId);
    if (!report) {
      this._createReports([{ reportId }]);
      report = this._getReport(reportId);
    }
    return report;
  }

  _getAllReportIds(): string[] {
    return this._reportsRegistry.map((report) => {
      return report.getReportId();
    });
  }

  _forEachReport<ReturnType>(fnc: (report: Report) => ReturnType) {
    const allReportIds = this._getAllReportIds();
    allReportIds.forEach((reportId) => {
      const report = this._getReport(reportId);
      return fnc(report);
    });
  }

  dispose(): void {
    this._forEachReport((report) => {
      this.disposeReport(report.getReportId());
    });
  }

  refreshData(options: { bypassCache: boolean }): void {
    const { bypassCache } = options;
    this._forEachReport((report) => {
      return this.refreshReport(report.getReportId(), {
        bypassCache,
      });
    });
  }

  changeTimeframe(timeframe: ITimeFrame): void {
    void this._service.set<ITimeFrame>(this._getTimeframeKey(), timeframe, {
      storageType: StorageLocationType.Local,
    });

    this._timeframe = timeframe;
    this.emit(ReportEventTypes.TIMEFRAME_CHANGED, this.getTimeframe().timeframe);

    this._forEachReport((report) => {
      return this.refreshReport(report.getReportId(), {
        bypassCache: false,
      });
    });
  }

  refreshReport(reportId: string, options: IQueryOptions): Promise<void> {
    const report = this._getReport(reportId);
    report.changeQueryStatus(QueryStatus.UPDATING);
    return this.runQuery(reportId, options);
  }

  async runQuery(reportId: string, options: IQueryOptions) {
    const report = this._getReport(reportId);
    const queryData = this._service.loadQueryDataById(reportId);
    const timeframe = report.getTimeframe();
    const { query } = queryData;
    const { view } = query;

    const viewData = await this._service.getViewData(this._key, view);

    const queryRequest = {
      ...query,
      filters: {
        ...query.filters,
      },
      predefined: timeframe,
      bypassCache: options.bypassCache,
    };
    let chunkSize: number;
    if (timeframe === PredefinedTimeframe.LAST_90_DAYS) {
      chunkSize = 7;
    }
    const queryResult = await this._service.runAggregatedQuery(queryRequest, chunkSize);

    report.setResult({
      measuredResult: queryResult.data,
      view: viewData,
      updatedAt: queryResult.updatedAt,
    });

    // void this._reports.setCachedResult(this._reportId, this._result);
    report.changeQueryStatus(QueryStatus.UPDATED);
  }

  getService(): IReportingService {
    return this._service;
  }
}
