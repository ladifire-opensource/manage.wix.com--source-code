import { IState } from '../types/store';

export const getCurrentUserLanguage = (state: IState): string => state.currentUser.language;
export const getCurrentUserId = (state: IState): string => state.currentUser.id;
