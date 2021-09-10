import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ModuleRegistry } from 'react-module-container';
import { VIEW_FINISHED_LOADING } from '@wix/business-manager-api';

export function withAppsFedOpsLogger(WrappedComponent) {
  return class ComponentWithAppsFedopsLogger extends React.Component<any> {
    public readonly context: {
      appsFedopsLogger: any;
    };

    static contextTypes = {
      appsFedopsLogger: PropTypes.object.isRequired
    };

    render() {
      return <WrappedComponent appsFedopsLogger={this.context.appsFedopsLogger} {...this.props} />;
    }
  };
}

export function withAppMonitor({ WrappedComponent, pageComponentName, pageComponentId }) {
  class AppMonitorEnricher extends React.Component<any, any> {
    private viewFinishedLoadingSubscription;

    componentStartLoading() {
      this.props.appsFedopsLogger.interactionStarted(`interaction-${pageComponentName}`);
    }

    viewFinishLoading = () => {
      this.props.appsFedopsLogger.interactionEnded(`interaction-${pageComponentName}`);
      this.viewFinishedLoadingSubscription.remove();
    }

    componentDidMount() {
      this.componentStartLoading();
      this.viewFinishedLoadingSubscription = ModuleRegistry.addListener(VIEW_FINISHED_LOADING, this.viewFinishLoading);
      this.addWixRecorder();
    }

    componentWillUnmount() {
     this.viewFinishedLoadingSubscription.remove();
    }

    render() {
      return <WrappedComponent {...this.props}/>;
    }

    private addWixRecorder() {
      window.wixRecorder && window.wixRecorder.addLabel(pageComponentId);
    }
  }

  return withAppsFedOpsLogger(AppMonitorEnricher);
}
