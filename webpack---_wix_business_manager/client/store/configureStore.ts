import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers/rootReducer';
import { IState } from '../types/store';
import { composeWithDevTools } from 'redux-devtools-extension';

export function configureStore(initialState) {
  let appliedMiddleware;

  if (initialState.isDebug) {
    const middleware = [thunk, createLogger()];
    appliedMiddleware = composeWithDevTools(applyMiddleware(...middleware));
  } else {
    appliedMiddleware = applyMiddleware(thunk);
  }

  return createStore<IState>(rootReducer, initialState, appliedMiddleware);
}
