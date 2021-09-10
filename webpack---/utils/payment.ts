import {
  showToast,
  ToastTimeout,
  ToastScope,
  ToastActionUiType,
  ToastType,
} from '@wix/business-manager-api';

export const showPaymentToast = (message, buttonText, onClick = () => null) =>
  showToast({
    message,
    type: ToastType.SUCCESS,
    biName: 'wixforms.connectpaymentmethod',
    timeout: ToastTimeout.NONE,
    scope: ToastScope.APP,
    action: {
      uiType: ToastActionUiType.BUTTON,
      text: buttonText,
      onClick: () => {
        onClick();
        parent.postMessage(
          '{"intent":"TPA2", "action":"CLOSE", "type":"closeWindow", "namespace": "Wix", "data": {}}',
          '*',
        );
      },
    },
  });
