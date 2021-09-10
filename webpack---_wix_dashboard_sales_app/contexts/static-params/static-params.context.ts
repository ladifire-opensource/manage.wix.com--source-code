import { createContext, useContext } from 'react';

export interface StaticParams {
  siteName?: string;
  primaryDomain?: string;
}

export const StaticParamsContext = createContext<StaticParams>({});

export const useStaticParams = () => useContext(StaticParamsContext);
