import * as React from 'react';
import { InputWithOptions } from 'wix-style-react';

interface IState {
  prevStatus: any;
  prevValue: string;
  timeOfLastChange: number;
}

const MIN_TIME_TO_READ_RESULTS_MS = 1000;

// TECHDEBT: use hideOptions + showOptions from new component | SEV: 4 | EFFORT: 2
export const InputWithOptionsPlusMonitoring: React.ComponentClass<any, IState> = class extends InputWithOptions {

  props;

  state: IState;

  static getDerivedStateFromProps(nextProps, prevState) {
    let nextState = null;

    if (nextProps.status !== prevState.prevStatus) {
      nextState = {
        prevStatus: nextProps.status,
        timeOfLastChange: Date.now()
      };
    }

    if (nextProps.value !== prevState.prevValue) {
      nextState = {
        ...nextState,
        prevValue: nextProps.value,
        timeOfLastChange: Date.now()
      };
    }

    return nextState;
  }

  timeElapsedSinceLoadFinished() {
    return this.props.status !== null ? -1 : Date.now() - this.state.timeOfLastChange;
  }

  shouldDelegateKeyDown(key) {

    if (key !== 'Enter') {
      return super['shouldDelegateKeyDown'](key);
    }

    return this.timeElapsedSinceLoadFinished() > MIN_TIME_TO_READ_RESULTS_MS;
  }

  hideOptions = () => {
    if (this.props.onHideOptions) {
      this.props.onHideOptions();
    }
    super['hideOptions']();
  }

  showOptions = () => {
    if (this.props.onShowOptions) {
      this.props.onShowOptions();
    }
    super['showOptions']();
  }
} as any;
