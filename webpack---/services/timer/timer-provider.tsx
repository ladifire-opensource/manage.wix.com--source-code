import React from 'react';
import PropTypes from 'prop-types';
import { Timer } from './timer';

export interface TimerProviderProps {
  children: any;
}

export class TimerProvider extends React.Component<TimerProviderProps> {
  private readonly timer = new Timer();

  static childContextTypes = {
    timer: PropTypes.instanceOf(Timer).isRequired
  };

  getChildContext() {
    return {
      timer: this.timer
    };
  }

  render() {
    return this.props.children;
  }
}

export const provideTimer = <ExportedPropTypes extends {} = any>(WrappedComponent) =>
  (class ComponentWithLogger extends React.Component<{ overrideTimer?: Timer } & ExportedPropTypes> {
    static contextTypes = {
      timer: PropTypes.instanceOf(Timer)
    };

    render() {
      return <WrappedComponent timer={this.props.overrideTimer || this.context.timer} {...this.props} />;
    }
  });
