import { IState } from '../types/store';

export const getBaseStaticUrl = (state: IState): string => state.clientTopology.staticsBaseUrl;
export const getDashboardAnswersWidgetStaticsVersion = (state: IState): string => state.clientTopology.dashboardAnswersWidgetStaticsVersion;
export const getHeaderClientStaticsUrl = (state: IState): string => state.clientTopology.headerClientStaticsUrl;
export const getPingNotificationsWidgetStaticsUrl = (state: IState): string => state.clientTopology.pingNotificationsWidgetStaticsUrl;
export const getSearchEverythingWidgetStaticsUrl = (state: IState): string => state.clientTopology.searchEverythingWidgetStaticsUrl;
export const getInboxHeaderWidgetStaticsUrl = (state: IState): string => state.clientTopology.inboxHeaderWidgetStaticsUrl;
export const getTipsTranslationsStaticsUrl = (state: IState): string => state.clientTopology.tipsTranslationsBaseUrl;
export const getPublicUrl = (state: IState): string => state.clientTopology.publicUrl;
