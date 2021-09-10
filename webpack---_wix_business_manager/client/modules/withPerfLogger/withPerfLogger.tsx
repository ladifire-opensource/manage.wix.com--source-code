import * as React from 'react';
import { createFedopsLogger } from '../../services/essentials';

export function withPerfLogger(wrappedComponent, moduleName) {

  class PerfLoggerEnricher extends React.Component<any, any> {
    constructor(props) {
      super(props);
      const instance = createFedopsLogger(moduleName);
      instance.clearResourceTimings();
      instance.appLoadStarted();
    }

    render() {
      return React.createElement(wrappedComponent, this.props);
    }
  }

  return PerfLoggerEnricher;
}
