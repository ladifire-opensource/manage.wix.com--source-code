import thunk from 'redux-thunk';
import { IStoreState } from '../types/store';
import { createLogger } from 'redux-logger';
import { DataCapsule } from 'data-capsule';
import { Store, applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from '../reducers';

export interface IThunkExtraArgs {
  dataCapsule: DataCapsule;
}

export const configureStore = (initialState: Partial<IStoreState>, dataCapsule: DataCapsule): Store<IStoreState> => {
  let appliedMiddleware;
  const extraArgs: IThunkExtraArgs = { dataCapsule };
  if (initialState.debug) {
    const middleware = [thunk.withExtraArgument(extraArgs), createLogger()];
    appliedMiddleware = composeWithDevTools(applyMiddleware(...middleware));
  } else {
    appliedMiddleware = applyMiddleware(thunk.withExtraArgument(extraArgs));
  }

  return createStore(rootReducer, initialState, appliedMiddleware);
};
