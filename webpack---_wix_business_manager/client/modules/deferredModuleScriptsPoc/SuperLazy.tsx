import * as React from 'react';
import { ModuleRegistry } from 'react-module-container';
import { UndefinedComponentErrorPage } from '../../components/ErrorPages/ErrorPages';

export class SuperLazy extends React.Component<any, any> {
  state = { modulesLoaded: false };
  Component: any;

  componentDidMount() {
    const loadModules = this.props.componentName === 'business-dashboard' ? '__deferredModuleScriptsPoc__loadFastPathModulesFiles' : '__deferredModuleScriptsPoc__loadModulesFiles';

    window[loadModules]()
      .then(() => {
        this.Component = ModuleRegistry.component(this.props.componentName);
      })
      .then(() => this.setState({ modulesLoaded: true }));
  }

  render() {
    const { modulesLoaded } = this.state;
    const { componentName, ...props } = this.props;

    if (!modulesLoaded) {
      return null;
    }

    return this.Component ? <this.Component {...props}/> : UndefinedComponentErrorPage;
  }
}
