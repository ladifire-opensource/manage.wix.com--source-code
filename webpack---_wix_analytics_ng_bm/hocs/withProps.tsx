import React from 'react';
import { TModuleParams } from '@wix/business-manager-api';

import { ComponentIds } from '../constants/enums';

export function withProps(
  Component: React.ElementType,
  moduleParams: TModuleParams,
  entryPoint: string,
  componentId: ComponentIds,
  extProps: { [key: string]: any } = {},
) {
  return (props: any) => {
    return (
      <Component
        {...props}
        moduleParams={moduleParams}
        entryPoint={entryPoint}
        componentId={componentId}
        extProps={extProps}
      />
    );
  };
}
