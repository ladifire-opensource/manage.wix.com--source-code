import React, { createContext, Context, ReactNode, FC, memo } from 'react';
import { ServerResponse } from '@wix/dashboard-site-details-api';
import { initBiLogger, SiteDetailsBiLogger } from '@src/services';
import { TFunction, useBILogger, useModuleParams } from 'yoshi-flow-bm-runtime';
import {
  PropagationToast,
  propagationToast,
} from '../../services/propagation-toast';

export interface Props {
  serverResponse: ServerResponse;
  t: TFunction;
  children: ReactNode;
}

export interface ContextAttributes {
  widgetData: ServerResponse;
  services: {
    biLogger: SiteDetailsBiLogger;
    propagationToast: PropagationToast;
  };
}

export let AppContext: Context<ContextAttributes>;

export const AppContextProvider: FC<Props> = memo(
  ({ serverResponse, t, children }) => {
    AppContext = AppContext || createContext({} as ContextAttributes);
    const biLogger = useBILogger();
    const moduleParams = useModuleParams();

    const generateContext = (): ContextAttributes => {
      return {
        widgetData: serverResponse,
        services: {
          biLogger: initBiLogger(biLogger, moduleParams),
          propagationToast: propagationToast(t),
        },
      };
    };

    return (
      <AppContext.Provider value={generateContext()}>
        {children}
      </AppContext.Provider>
    );
  },
);
