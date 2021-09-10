import { IState } from '../types/store';
import { CoBrandingParams } from '@wix/business-manager-api';

export const getCoBranding = (state: IState): CoBrandingParams => state.coBranding;
