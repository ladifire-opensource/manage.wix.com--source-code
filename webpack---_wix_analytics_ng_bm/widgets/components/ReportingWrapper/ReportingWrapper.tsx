import React, { ReactElement, useEffect, useState } from 'react';
import { TModuleParams } from '@wix/business-manager-api';
import { isFunction } from 'lodash';

import { QueryStatus, IReport, IAnalyticResult } from '../../../types/types';
import { SummaryBoxSwitcher } from '../SummaryBoxSwitcher/SummaryBoxSwitcher';

export interface IAnalyticWrapperProps {
  report: IReport;
  widgetProps?: any;
  moduleParams: TModuleParams;
  onReportUpdated?(data: IAnalyticResult): void;
}

export function ReportingWrapper(props: IAnalyticWrapperProps): ReactElement {
  const { report, widgetProps, moduleParams, onReportUpdated } = props;
  const [, setStatus] = useState<QueryStatus>(QueryStatus.NONE);

  useEffect(() => {
    void report.onDataUpdated((newStatus, analyticData) => {
      setStatus(newStatus);
      isFunction(onReportUpdated) && onReportUpdated(analyticData);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [report]);

  return (
    <SummaryBoxSwitcher report={report} widgetProps={widgetProps} moduleParams={moduleParams} />
  );
}
