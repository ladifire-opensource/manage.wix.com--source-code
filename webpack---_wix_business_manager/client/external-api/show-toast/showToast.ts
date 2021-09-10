import { ModuleRegistry } from 'react-module-container';
import { showToast, removeToast } from '../../actions/toastActions';
import { ToastConfig, ShowToast, SHOW_TOAST } from '@wix/business-manager-api';
import { ToastId } from '../../types/toasts';
import { createShowToast } from './createShowToast';
import { bindActionCreators, Dispatch } from 'redux';
import { IState } from '../../types/store';

export const initShowToastApi = (dispatch: Dispatch<IState>) => {
  const boundActionCreators = bindActionCreators({ showToast, removeToast }, dispatch);
  const wrappedShowToast = (id: ToastId, toastConfig: ToastConfig) => void boundActionCreators.showToast(id, toastConfig);
  const wrappedRemoveToast = (id: ToastId) => void boundActionCreators.removeToast(id);
  const showToastApi: ShowToast = createShowToast(wrappedShowToast, wrappedRemoveToast);

  ModuleRegistry.registerMethod(SHOW_TOAST, () => showToastApi);
};
