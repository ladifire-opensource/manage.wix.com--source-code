import * as React from 'react';
import { connect } from 'react-redux';
import { getViewMode } from '../../selectors/viewModeSelector';
import { IState } from '../../types/store';
import { sendBusinessManagerBI, getBIHostingApp } from '../../services/BIService';
import { BIEvents } from '../../../common/consts/bi';
import { ToastEntry } from '../../types/toasts';
import { ToastType, ToastPriority, ToastScope } from '@wix/business-manager-api';
import { timeoutValueMap } from './Toast';
import { getMetaSiteId } from '../../selectors/siteMetaDataSelectors';
import * as wixRecorderMethods from '../../services/wix-recorder-methods';

const typeBiMap = {
  [ToastType.ERROR]: 'error',
  [ToastType.WARNING]: 'warning',
  [ToastType.SUCCESS]: 'success',
  [ToastType.PREMIUM]: 'premium',
  [ToastType.STANDARD]: 'standard'
};

const priorityBiMap = {
  [ToastPriority.HIGH]: 'high',
  [ToastPriority.NORMAL]: 'normal',
  [ToastPriority.LOW]: 'low'
};

const scopeBiMap = {
  [ToastScope.DASHBOARD]: 'dashboard',
  [ToastScope.APP]: 'app',
};

const enum ClickType {
  CLOSE = 'dismiss',
  ACTION = 'CTA'
}

export const withToastBi = WrappedComponent => {
  const ToastBi = props => {
    const { msid, viewMode, ...otherProps } = props;
    const reportToastViewed = (toast: ToastEntry) => {
      const { config } = toast;
      const { biName } = config;

      sendBusinessManagerBI({
        evid: BIEvents.toastViewed, // 85
        name: biName,
        type: typeBiMap[config.type],
        severity: priorityBiMap[config.priority],
        scope: scopeBiMap[config.scope],
        timeout: timeoutValueMap[config.timeout],
        hosting: getBIHostingApp(viewMode),
        msid
      });

      wixRecorderMethods.reportGlobalToast(biName);
    };

    const generateClickTypeReporter = (clickType: ClickType) => (toast: ToastEntry) => {
      const { config } = toast;

      sendBusinessManagerBI({
        evid: BIEvents.toastClicked, // 86
        click_type: clickType,
        name: config.biName,
        type: typeBiMap[config.type],
        severity: priorityBiMap[config.priority],
        scope: scopeBiMap[config.scope],
        timeout: timeoutValueMap[config.timeout],
        hosting: getBIHostingApp(viewMode),
        msid
      });
    };

    const reportToastCloseClicked = generateClickTypeReporter(ClickType.CLOSE);
    const reportToastActionClicked = generateClickTypeReporter(ClickType.ACTION);

    return (<WrappedComponent
      reportToastViewed={reportToastViewed}
      reportToastCloseClicked={reportToastCloseClicked}
      reportToastActionClicked={reportToastActionClicked}
      {...otherProps}
    />);
  };

  function mapStateToProps(state: IState) {
    return {
      msid: getMetaSiteId(state),
      viewMode: getViewMode(state)
    };
  }

  return connect(mapStateToProps)(ToastBi);
};
