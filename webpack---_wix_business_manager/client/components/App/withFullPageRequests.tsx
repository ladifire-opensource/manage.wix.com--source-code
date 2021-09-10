import * as React from 'react';
import {
  HIDE_UNAUTHORIZED_PAGE_METHOD_NAME, onNavigationCompleted,
  SHOW_UNAUTHORIZED_PAGE_METHOD_NAME
} from '@wix/business-manager-api';
import { ModuleRegistry } from 'react-module-container';

export const SHOW_NO_PERMISSIONS_PAGE_METHOD_NAME = 'businessManager.showNoPermissionsPage';

export const withFullPageRequests = ( Component ) => {
  type State = { unauthorizedPageRequested: boolean, noPermissionsPageRequested: boolean };

  class ComponentWithFullPages extends React.Component<any, State> {
    private lastUnathorizedLocation;

    constructor(props) {
      super(props);
      this.state = { unauthorizedPageRequested: false, noPermissionsPageRequested: false };

      this.registerUnauthorizedPageApi();
      this.registerNoPermissionsPageApi();
    }

    registerUnauthorizedPageApi = () => {
      ModuleRegistry.registerMethod(SHOW_UNAUTHORIZED_PAGE_METHOD_NAME, () => () => {
        this.lastUnathorizedLocation = window.location.href;
        this.setState({ unauthorizedPageRequested: true });
      });

      ModuleRegistry.registerMethod(HIDE_UNAUTHORIZED_PAGE_METHOD_NAME, () => () => {
        this.setState({ unauthorizedPageRequested: false });
      });

      onNavigationCompleted(() => {
        if (window.location.href !== this.lastUnathorizedLocation) {
          this.lastUnathorizedLocation = null;
          this.setState({ unauthorizedPageRequested: false });
        }
      });
    }

    registerNoPermissionsPageApi = () => {
      ModuleRegistry.registerMethod(SHOW_NO_PERMISSIONS_PAGE_METHOD_NAME, () => () => {
        this.setState({ noPermissionsPageRequested: true });
      });
    }

    render() {
      const { unauthorizedPageRequested, noPermissionsPageRequested } = this.state;
      return <Component {...this.props}
                       unauthorizedPageRequested={unauthorizedPageRequested}
                       noPermissionsPageRequested={noPermissionsPageRequested}/>;
    }
  }

  return ComponentWithFullPages;
};
