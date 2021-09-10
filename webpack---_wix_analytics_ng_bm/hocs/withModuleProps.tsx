import React from 'react';
import { TModuleParams } from '@wix/business-manager-api';

import { IInitialDataService, IReportingService } from '../types';
import { ComponentIds } from '../constants/enums';

export function withModuleProps(
  Component: React.ElementType,
  reportingService: IReportingService,
  initialDataService: IInitialDataService,
  moduleParams: TModuleParams,
  entryPoint: string,
  componentId: ComponentIds,
) {
  return (props: any) => {
    return (
      <Component
        {...props}
        moduleParams={moduleParams}
        reportingService={reportingService}
        initialDataService={initialDataService}
        entryPoint={entryPoint}
        componentId={componentId}
      />
    );
  };
}
