import { IState } from '../types/store';
import { ToastEntry } from '../types/toasts';
import { ToastType, ToastPriority } from '@wix/business-manager-api';
import { sortBy } from 'lodash';

const typeWeight = {
  [ToastType.ERROR]: 4,
  [ToastType.WARNING]: 3,
  [ToastType.SUCCESS]: 2,
  [ToastType.PREMIUM]: 1,
  [ToastType.STANDARD]: 0
};

const priorityWeight = {
  [ToastPriority.HIGH]: 2,
  [ToastPriority.NORMAL]: 1,
  [ToastPriority.LOW]: 0
};

const priorityCount: number = Object.keys(priorityWeight).length;
const weight = (toast: ToastEntry): number => (typeWeight[toast.config.type] * priorityCount + priorityWeight[toast.config.priority]) || 0;
const descendingWeight = (toast: ToastEntry) => -weight(toast);

export const getToasts = (state: IState) => sortBy(state.toasts, descendingWeight);
