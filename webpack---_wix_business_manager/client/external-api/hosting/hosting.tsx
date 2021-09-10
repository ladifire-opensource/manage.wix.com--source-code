import * as React from 'react';
import { ModuleRegistry } from 'react-module-container';
import type { IState } from '../../types/store';
import { hasPermissions } from '../../selectors/siteMetaDataSelectors';
import type {
  getHostContainer as getHostContainerApi,
  setupExtensionComponent as setupExtensionComponentApi,
  HostingApiPlatformProps
} from '@wix/business-manager-api';
import { getComponentsByHostContainerId } from '../../selectors/componentsSelectors';
import { wrapRemoteComponent } from '@wix/wix-remote-react-component-wrapper';
import { ErrorComponent } from './components/ErrorComponent/ErrorComponent';
import { createGetBiExtraFields } from './createGetBiExtraFields';

export const initHostingApi = (state: IState) => {
  const storedComponentConfig = {};

  const hostingContainers = {};
  const DefaultLoaderComponent = () => null;
  const getBiExtraFields = createGetBiExtraFields();

  const getHostContainer: typeof getHostContainerApi = (hostContainerId: string) => {
    if (!(hostContainerId in hostingContainers)) {
      throw new Error(`Unregistered hostContainerId: ${hostContainerId}, use BusinessManagerModule#registerHostContainer() to register a host container`);
    }

    return {
      getExtensions: async () => getComponentsByHostContainerId(state, hostContainerId)
        .filter(component => component.componentId in storedComponentConfig)
        .map(component => {
          const { componentId, requiredPermission, componentName, sentryDsn } = component;
          const { componentOptions, loaderComponent } = storedComponentConfig[componentId];
          const LoaderComponent = loaderComponent ? () => React.createElement(ModuleRegistry.component(loaderComponent.componentName), loaderComponent.componentProps) : DefaultLoaderComponent;
          const isPermitted = hasPermissions(state, requiredPermission);
          const WrappedComponent = wrapRemoteComponent<HostingApiPlatformProps>(ModuleRegistry.component(componentName), {
            wrapperContextId: hostContainerId,
            componentId,
            sentryDsn,
            ErrorComponent,
            LoaderComponent,
            getBiExtraFields: isFinalEvent => getBiExtraFields(component, state, isFinalEvent)
          });
          const Component = (props: any) => <WrappedComponent {...props}/>;

          return {
            componentId,
            componentOptions,
            isPermitted,
            Component
          };
        })
    };
  };

  const setupExtensionComponent: typeof setupExtensionComponentApi = (componentId: string, componentConfig: any): void => {
    storedComponentConfig[componentId] = componentConfig;
  };

  const registerHostContainer = (hostContainerId: string): void => {
    hostingContainers[hostContainerId] = {};
  };

  ModuleRegistry.registerMethod('businessManager.getHostContainer', () => getHostContainer);
  ModuleRegistry.registerMethod('businessManager.setupExtensionComponent', () => setupExtensionComponent);
  ModuleRegistry.registerMethod('businessManager.registerHostContainer', () => registerHostContainer);
};
