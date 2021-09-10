import { useEffect, useState } from 'react';
import { useMount } from 'react-use';

import {
  IReportingService,
  IReportsContainer,
  IReportsOptions,
  ReportEventTypes,
  IReportData,
} from '../types/types';

interface UseReportingServiceResult {
  reports: IReportsContainer;
  isWorking: boolean;
  updateIsWorking: (status: boolean) => void;
}

export function useReportingService(
  reportingService: IReportingService,
  reportIds: IReportData[],
  reportKey: string,
  options: IReportsOptions,
): UseReportingServiceResult {
  const requirements = options.requirements || [];
  const [isWorking, setIsWorking] = useState<boolean>(true);
  const [, setReportsTimestamp] = useState<number>(0);
  const [reports, setReports] = useState<IReportsContainer>(null);

  const updateIsWorking = (status) => setIsWorking(status);

  useMount(() => {
    void reportingService.getReports(reportKey, options).then((reportsInstance) => {
      setIsWorking(reportsInstance.isWorking());
      reportsInstance.on(ReportEventTypes.DataUpdated, () => {
        setIsWorking(reportsInstance.isWorking());
      });

      setReportsTimestamp(new Date().getTime());
      reportsInstance.on(ReportEventTypes.REPORTS_CHANGED, () => {
        setReportsTimestamp(new Date().getTime());
      });

      setReports(reportsInstance);
    });
  });

  useEffect(() => {
    if (reports) {
      reports.setReportIds(reportIds);
      reports.setRequirementsIds(requirements);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reports, reportIds.map((reportData) => reportData.reportId).join(''), reportKey]);

  return { reports, isWorking, updateIsWorking };
}
