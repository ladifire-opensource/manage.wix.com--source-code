import React from 'react';
import PropTypes from 'prop-types';
import { BiLogger } from './logger';
import { BiLoggerType, InjectedBiLoggerProps } from './types';

export interface LoggerProviderProps {
  origin?: string;
  metaSiteId?: string;
  logger?: BiLoggerType;
  children: any;
}

export class LoggerProvider extends React.Component<LoggerProviderProps> {
  private readonly biLogger: BiLoggerType;

  static childContextTypes = {
    biLogger: PropTypes.any,
  };

  constructor(props) {
    super(props);

    this.biLogger = props.logger || new BiLogger(props.origin, props.metaSiteId);
  }

  getChildContext() {
    return {
      biLogger: this.biLogger
    };
  }

  render() {
    return this.props.children;
  }
}

export const provideLogger = <PropTypes extends {}>(WrappedComponent: React.ComponentType<PropTypes & InjectedBiLoggerProps>): React.ComponentType<PropTypes & { overrideLogger?: BiLoggerType }> => {
  class ComponentWithLogger extends React.Component<{ overrideLogger?: BiLoggerType } & PropTypes> {
    static contextTypes = {
      biLogger: PropTypes.any,
    };

    render() {
      return <WrappedComponent biLogger={this.props.overrideLogger || this.context.biLogger} {...this.props} />;
    }
  }

  return ComponentWithLogger;
};
