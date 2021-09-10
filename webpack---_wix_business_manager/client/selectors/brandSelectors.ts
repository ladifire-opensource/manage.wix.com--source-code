import { IState } from '../types/store';
import { Brand } from '@wix/business-manager-api';

export const getBrand = (state: IState): Brand => state.brand;

export const isEditorXBrand = (state: IState): boolean => getBrand(state) === Brand.EDITORX;
