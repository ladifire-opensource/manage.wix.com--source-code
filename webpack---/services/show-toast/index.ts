import { showToast, ToastTimeout, ToastType } from '@wix/business-manager-api';

export const showErrorToast = ({ message, isTimed }: { message: string; isTimed?: boolean }) => {
  showToast({
    biName: 'business-dashboard',
    message,
    type: ToastType.ERROR,
    timeout: isTimed ? ToastTimeout.NORMAL : ToastTimeout.NONE,
  });
};
