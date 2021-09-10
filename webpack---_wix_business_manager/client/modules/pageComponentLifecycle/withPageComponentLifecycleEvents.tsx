import * as React from 'react';
import { ModuleRegistry } from 'react-module-container';
import { PageComponentId } from '@wix/business-manager-api';

export function withPageComponentLifecycleEvents(WrappedComponent, pageComponentId: PageComponentId, appDefId: string) {
  return class PageComponentLifecycleEventsEnricher extends React.Component<any, any> {
    private componentStartLoadingSubscription;
    private componentReadySubscription;

    private readonly componentStartLoading = payload => {
      this.componentStartLoadingSubscription.remove();
      ModuleRegistry.notifyListeners('businessManager.pageComponentStartLoading', pageComponentId, appDefId, payload);
    }

    private readonly componentReady = payload => {
      this.componentReadySubscription.remove();
      ModuleRegistry.notifyListeners('businessManager.pageComponentReady', pageComponentId, appDefId, payload);
    }

    UNSAFE_componentWillMount() {
      ModuleRegistry.notifyListeners('businessManager.pageComponentWillMount', pageComponentId, appDefId);
      this.componentStartLoadingSubscription = ModuleRegistry.addListener('reactModuleContainer.componentStartLoading', this.componentStartLoading);
      this.componentReadySubscription = ModuleRegistry.addListener('reactModuleContainer.componentReady', this.componentReady);
    }

    componentDidMount() {
      ModuleRegistry.notifyListeners('businessManager.pageComponentDidMount', pageComponentId, appDefId);
    }

    componentWillUnmount() {
      ModuleRegistry.notifyListeners('businessManager.pageComponentWillUnmount', pageComponentId, appDefId);
      this.componentStartLoadingSubscription.remove();
      this.componentReadySubscription.remove();
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}
