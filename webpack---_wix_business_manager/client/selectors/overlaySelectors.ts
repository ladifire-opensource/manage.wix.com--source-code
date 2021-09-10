import { IState } from '../types/store';

export const selectOverlay = (state: IState) => state.overlay.isShown;
