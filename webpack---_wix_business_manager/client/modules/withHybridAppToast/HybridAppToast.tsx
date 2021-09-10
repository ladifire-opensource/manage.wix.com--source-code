import * as React from 'react';
import { withTranslation, TFunction } from '@wix/wix-i18n-config';
import { editLinkService } from '../../services/edit-link-service';
import { createShowToast } from '../../external-api/show-toast/createShowToast';
import { RemoveToastActionCreator, ShowToastActionCreator } from '../../actions/toastActions';
import { ToastTimeout } from '@wix/business-manager-api';

interface IProps {
  t: TFunction;
  showToast: ShowToastActionCreator;
  removeToast: RemoveToastActionCreator;
  fetchApplications: Function;
  shouldShowToast: boolean;
  wrappedComponent: any;
}

export class HybridAppToast extends React.Component<IProps> {
  showToastIfNeeded(props) {
    const { t, shouldShowToast, ...editLinkProps } = props;
    if (shouldShowToast) {
      const editLink = editLinkService(editLinkProps);
      const showToast = createShowToast(props.showToast, props.removeToast);
      showToast({
        message: t('shared_toast.hybrid.text'),
        biName: 'business-manager.hybrid-toast',
        timeout: ToastTimeout.NONE,
        action: {
          text: t('shared_toast.hybrid.cta'),
          removeToastOnClick: false,
          onClick: null,
          navigationTarget: {
            url: editLink.editUrl
          }
        }
      });
    }
  }

  componentDidMount() {
    this.props.fetchApplications().then(() => {
      this.showToastIfNeeded(this.props);
    });
  }

  render() {
    const { shouldShowToast, wrappedComponent: WrappedComponent, ...props } = this.props;

    return <WrappedComponent {...props} />;
  }
}

export default withTranslation()(HybridAppToast);
