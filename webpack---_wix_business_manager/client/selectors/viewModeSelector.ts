import { IState } from '../types/store';
import { IViewMode } from '@wix/business-manager-api';

export const getViewMode = (state: IState): IViewMode => state.viewMode;
export const getIsInEditor = (state: IState): boolean => getViewMode(state) === IViewMode.EDITOR;
export const getIsInDashboard = (state: IState): boolean => getViewMode(state) === IViewMode.DASHBOARD;
