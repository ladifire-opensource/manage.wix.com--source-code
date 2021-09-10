import { connect } from 'react-redux';
import { Toast } from './Toast';
import { IState } from '../../types/store';
import { ToastEntry } from '../../types/toasts';
import { getToasts } from '../../selectors/toastSelectors';
import { removeToast } from '../../actions/toastActions';
import { withPageComponentLinkBuilder } from '../../navigation/withPageComponentLinkBuilder';
import { first } from 'lodash';
import { withToastBi } from './Toast.bi';
import { ToastTimeout } from '@wix/business-manager-api';

const toastIsGlobal = (toast: ToastEntry): boolean => toast.config.timeout === ToastTimeout.NONE;
const toastIsFlashing = (toast: ToastEntry): boolean => toast.config.timeout === ToastTimeout.NORMAL;

const getGlobalToasts = (toasts: ToastEntry[]): ToastEntry[] => toasts.filter(toastIsGlobal);
const getFlashingToasts = (toasts: ToastEntry[]): ToastEntry[] => toasts.filter(toastIsFlashing);

function mapStateToProps(state: IState) {
  const toasts = getToasts(state);

  return {
    globalToast: first(getGlobalToasts(toasts)),
    flashingToast: first(getFlashingToasts(toasts))
  };
}

export default connect(mapStateToProps, { removeToast })(withPageComponentLinkBuilder(withToastBi(Toast)));
