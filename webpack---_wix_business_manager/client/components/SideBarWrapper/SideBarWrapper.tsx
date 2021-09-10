import * as React from 'react';
import { ModuleRegistry } from 'react-module-container';

export class SideBarWrapper extends React.PureComponent {
  render() {
    const Sidebar = ModuleRegistry.component('business-manager.sidebar');
    return <Sidebar/>;
  }
}
