import React, { useState, FunctionComponent } from 'react';
import { ConfigurationContext, ConfigurationData } from './configuration.context';

export interface ConfigurationProviderProps {
  configuration: ConfigurationData;
}

export const ConfigurationProvider: FunctionComponent<ConfigurationProviderProps> = props => {
  const [configuration] = useState(props.configuration);

  return (
    <ConfigurationContext.Provider value={configuration}>
      {props.children}
    </ConfigurationContext.Provider>
  );
};
