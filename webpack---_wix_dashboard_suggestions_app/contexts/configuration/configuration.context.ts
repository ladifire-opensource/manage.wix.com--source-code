import { createContext, useContext } from 'react';

export interface ConfigurationData {
  phaseName: string;
  accountLanguage: string;
  defaultRemindLaterDays: number;
}
export interface ConfigurationContext extends ConfigurationData {}

export const ConfigurationContext = createContext({} as ConfigurationContext);

export const useConfiguration = () => useContext(ConfigurationContext);
