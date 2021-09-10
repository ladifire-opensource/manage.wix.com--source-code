import {
  ReactLazyComponent,
  ReactLazyComponentOptions,
} from 'react-module-container';
import { IBMModuleParams } from '../config';
import {
  getCurrentInstance,
  appDefIds,
  getModule,
  ModuleId,
} from '@wix/business-manager-api';

export const getModuleParams = () => {
  return (getModule(ModuleId.Engage) as any).moduleParams as IBMModuleParams;
};

export const getInstance = () => {
  const engageAppDefId = getModule(ModuleId.Engage).appDefId;
  return getCurrentInstance(engageAppDefId);
};

export const getChatInstance = () => {
  return getCurrentInstance(appDefIds.wixChat);
};

export interface CreateLazyComponentOptions {
  componentName: string;
  bundleFile: string;
  dependencies?: string[];
}

export const createLazyComponent = ({
  componentName,
  bundleFile,
  dependencies = [],
}: CreateLazyComponentOptions) =>
  class extends ReactLazyComponent<IBMModuleParams> {
    constructor(props: IBMModuleParams) {
      const minified = (debug: boolean) => (debug ? '' : '.min');
      const options: ReactLazyComponentOptions = {
        files: [
          ...dependencies,
          `${
            props.config.topology.inboxSettingsStaticsUrl
          }${bundleFile}.bundle${minified(props.debug)}.js`,
          `${
            props.config.topology.inboxSettingsStaticsUrl
          }${bundleFile}${minified(props.debug)}.css`,
          `${
            props.config.topology.externalChatWidgetStaticsUrl
          }external-chat-widget.umd${minified(props.debug)}.js`,
        ],
        component: componentName,
      };
      super(props, options);
    }
  };
