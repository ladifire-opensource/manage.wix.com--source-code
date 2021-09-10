import Experiments, { ExperimentsBag } from '@wix/fe-essentials/experiments';

type Reducer<S> = (state?: S) => S;

export const experimentsReducer: Reducer<ExperimentsBag> = (state = {}) =>
  state;

type Selector<S, R> = (state: S) => R;

export const experimentsSelectors: Selector<
  { experiments: ExperimentsBag },
  Experiments
> = ({ experiments }) => new Experiments({ experiments });
