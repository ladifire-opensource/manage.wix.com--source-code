import { AggregatedData, PredefinedTimeframe } from '@wix/ambassador-analytics-ng-server/types';
import { ReportsRegistry } from '@wix/analytics-ng-common';
import { debounce } from 'lodash';

import { ReportsContainer } from './ReportsContainer';
import {
  IReportingService,
  IReportsOptions,
  QueryStatus,
  IQueryOptions,
  IReportData,
  IAggregatedQueryResult,
} from '../../types/types';

export class UnifiedReportsContainer extends ReportsContainer {
  private _bypassCache: boolean;
  private _unifiedDataView: string;

  constructor(
    key: string,
    reportingService: IReportingService,
    reportIds: string[],
    options: IReportsOptions,
  ) {
    super(
      key,
      reportingService,
      reportIds.map((reportId) => {
        return { reportId };
      }),
      options,
    );
    this._setUnifiedDataView(
      reportIds.map((reportId) => {
        return { reportId };
      }),
    );
    this._bypassCache = false;
  }

  setReportIds(reportsData: IReportData[]) {
    this._setUnifiedDataView(reportsData);
    super.setReportIds(reportsData);
  }

  _setUnifiedDataView(reportsData: IReportData[]) {
    this._unifiedDataView = null;
    if (reportsData.length !== 0) {
      const unifiedDataViewName = this._getUnifiedDataViewName(reportsData);
      if (unifiedDataViewName) {
        this._unifiedDataView = unifiedDataViewName;
      } else {
        throw new Error(`UnifiedReportsContainer - Reports doesn't have single dataView `);
      }
    }
  }

  _getUnifiedDataViewName(reportsData: IReportData[]) {
    const reportsIds = reportsData.map((report) => report.reportId);
    const dataViewNames = reportsIds.map((reportId) =>
      this._service.getReportUnifiedDataView(reportId),
    );
    const allNamesAreEqual = dataViewNames.every((name) => name === dataViewNames[0]);
    return allNamesAreEqual && dataViewNames[0];
  }

  _getUnifiedFieldName(name: string): string {
    return `unified_api.${name}`;
  }

  _getDimensionName(): string {
    return this._getUnifiedFieldName('created_date');
  }

  runQuery(reportId: string, options: IQueryOptions) {
    this._bypassCache = this._bypassCache || options.bypassCache;
    void this._runUnifiedQuery();
    return Promise.resolve();
  }

  _runUnifiedQuery = debounce(async () => {
    const allReportIds = this._getAllReportIds();
    if (!this._unifiedDataView) {
      throw new Error(`UnifiedReportsContainer - _unifiedDataView must be initialized `);
    }

    const bypass = this._bypassCache;
    this._bypassCache = false;
    const timeframe = this.getTimeframe();

    const unifiedReportsMeasures = allReportIds.reduce<string[]>((currentMeasures, reportId) => {
      const reportUnifiedMeasure = this.getService().getReportUnifiedMeasures(reportId);
      return [...currentMeasures, reportUnifiedMeasure];
    }, []);
    const unifiedRequirementsMeasures: string[] = this._getRequirementsMeasures();
    let unifiedMeasures = [...unifiedRequirementsMeasures, ...unifiedReportsMeasures];
    const unifiedMeasuresSet = new Set(unifiedMeasures);
    unifiedMeasures = Array.from(unifiedMeasuresSet);
    const dimensionName = this._getDimensionName();

    const query = {
      dimensions: [dimensionName],
      measures: unifiedMeasures,
      filters: {},
      sorts: [dimensionName],
      view: this._unifiedDataView,
    };

    const queryRequest = {
      ...query,
      filters: {
        ...query.filters,
      },
      predefined: timeframe.timeframe,
      bypassCache: bypass,
    };

    let chunkSize: number;

    if (timeframe.timeframe === PredefinedTimeframe.LAST_90_DAYS) {
      chunkSize = 7;
    }
    const queryResult = await this.getService().runAggregatedQuery(queryRequest, chunkSize);

    this._handleRequirementsResult(queryResult);
    await this._handleReportsResult(queryResult);
  }, 100);

  _handleRequirementsResult(queryResult: IAggregatedQueryResult): void {
    const newStatusFlags = {};
    const { isMeasureActive } = queryResult.data;
    const cachedRequirement: { [key: string]: boolean } = {};
    this.requirementsIds.forEach((requirementId: string) => {
      const requirement = ReportsRegistry.getRequirement(requirementId);
      const measure = requirement.unifiedApi.measure;
      const result: boolean = isMeasureActive[measure];
      newStatusFlags[requirementId] = result;

      if (requirement.cache) {
        cachedRequirement[requirementId] = result;
      }
    });

    if (Object.keys(cachedRequirement).length > 0) {
      void this._service.updateCacheUserStatus(cachedRequirement);
    }

    this._service.status.updateStatus(newStatusFlags);
  }

  async _handleReportsResult(queryResult: IAggregatedQueryResult): Promise<void> {
    const allReportIds = this._getAllReportIds();
    const viewData = await this._service.getViewData(this.getWidgetKey(), this._unifiedDataView);
    const dimensionName = this._getDimensionName();

    allReportIds.forEach(async (reportId) => {
      const reportData = ReportsRegistry.getReportData(reportId);
      const { unifiedApi } = reportData;

      const unifiedMeasure = unifiedApi.measure;

      const report = this._getReport(reportId);
      const {
        dataPoints,
        today,
        yesterday,
        currentPeriod,
        previousPeriod,
        periodDiffPercentage,
      } = queryResult.data;
      const { updatedAt } = queryResult;

      const convert = (obj) => {
        return this._convertUnifiedToNamed<number>(unifiedMeasure, obj);
      };

      const finalDataPoints = dataPoints.reduce<any[]>((newDataPoints, currentPoint) => {
        let newPoints = [];
        const { data, fromDate, toDate } = currentPoint;
        const unifiedMeasureData = data[unifiedMeasure];

        if (Array.isArray(unifiedMeasureData)) {
          newPoints = unifiedMeasureData.map((subPointData) => {
            return {
              data: convert(subPointData),
              fromDate: subPointData[dimensionName],
              toDate: subPointData[dimensionName],
            };
          });
        } else {
          newPoints.push({
            data: convert(data),
            fromDate,
            toDate,
          });
        }

        return [...newDataPoints, ...newPoints];
      }, []);
      const newMeasuresResult: AggregatedData = {
        dataPoints: finalDataPoints,
        today: {
          ...today,
          data: convert(today.data),
        },
        yesterday: {
          ...yesterday,
          data: convert(yesterday.data),
        },
        currentPeriod: {
          ...currentPeriod,
          data: convert(currentPeriod.data),
        },
      };

      if (previousPeriod) {
        newMeasuresResult.previousPeriod = {
          ...previousPeriod,
          data: convert(previousPeriod.data),
        };
      }

      if (periodDiffPercentage && typeof periodDiffPercentage[unifiedMeasure] === 'number') {
        newMeasuresResult.periodDiffPercentage = convert(periodDiffPercentage);
      }

      report.setResult({
        measuredResult: newMeasuresResult,
        view: viewData,
        updatedAt,
      });

      report.changeQueryStatus(QueryStatus.UPDATED);
    });
  }

  _convertUnifiedToNamed<ValueType>(
    unifiedMeasureName: string,
    objNamed: { [key: string]: ValueType },
  ): { [key: string]: ValueType } {
    const dimensionName = this._getDimensionName();

    const result = {};
    result[unifiedMeasureName] = objNamed[unifiedMeasureName];
    result[dimensionName] = objNamed[dimensionName];

    return result;
  }

  _getRequirementsMeasures(): string[] {
    return this.requirementsIds.map((requirementId: string) => {
      const requirement = ReportsRegistry.getRequirement(requirementId);
      const {
        unifiedApi: { measure },
      } = requirement;
      return measure;
    });
  }
}
