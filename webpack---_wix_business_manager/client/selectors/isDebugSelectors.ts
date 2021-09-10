import { IState } from '../types/store';

export const getIsDebug = (state: IState): boolean => state.isDebug;
