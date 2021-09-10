import EventEmitter from 'eventemitter3';
import { PredefinedTimeframe } from '@wix/ambassador-analytics-ng-server/types';

import {
  DataUpdateCallback,
  IAnalyticResult,
  IReport,
  IReportsContainer,
  IReportsOptions,
  QueryStatus,
  ReportEventTypes,
} from '../../types/types';
import { createSampleResult } from '../../widgets/utils/sampleAnalyticResult';

export class Report extends EventEmitter<ReportEventTypes> implements IReport {
  private readonly _options: IReportsOptions;
  private readonly _reports: IReportsContainer;
  private readonly _reportId: string;
  private _queryStatus: QueryStatus;
  private _result: IAnalyticResult;
  private _timeframe: PredefinedTimeframe;

  constructor(
    reports: IReportsContainer,
    reportId: string,
    timeframe: PredefinedTimeframe,
    options: IReportsOptions,
  ) {
    super();
    this._options = options;
    this._reports = reports;
    this._reportId = reportId;
    this._result = null;
    this._queryStatus = QueryStatus.NONE;
    this._timeframe = timeframe;
  }

  getTimeframe(): PredefinedTimeframe {
    return this._timeframe;
  }

  changeTimeframe(timeframe: PredefinedTimeframe): Promise<void> {
    if (this._timeframe !== timeframe) {
      this._timeframe = timeframe;
      return this._runReport(false);
    }
  }

  getReportId() {
    return this._reportId;
  }

  getUpdatedAt() {
    return this._result && this._result.updatedAt;
  }

  setResult(result: IAnalyticResult): void {
    this._result = result;
  }

  getQueryResult(): IAnalyticResult {
    return this._result || createSampleResult();
  }

  getStatus(): QueryStatus {
    return this._queryStatus;
  }

  _runReport(bypassCache: boolean): Promise<void> {
    return this._reports.refreshReport(this._reportId, {
      bypassCache,
    });
  }

  async onDataUpdated(callback: DataUpdateCallback): Promise<void> {
    this.on(ReportEventTypes.DataUpdated, callback);
    if (this.getStatus() !== QueryStatus.UPDATED && this.getStatus() !== QueryStatus.UPDATING) {
      void this._reports.runQuery(this._reportId, {
        bypassCache: false,
      });
    }
  }

  changeQueryStatus(status: QueryStatus) {
    this._queryStatus = status;
    this.emit(ReportEventTypes.DataUpdated, this._queryStatus, this._result);
  }

  refreshData(): Promise<void> {
    return this._runReport(true);
  }

  dispose(): void {
    this.emit(ReportEventTypes.DISPOSED, {
      sender: this,
      reportId: this._reportId,
    });
    this.removeAllListeners();
  }
}
