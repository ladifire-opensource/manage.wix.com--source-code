import * as React from 'react';
import { ReactLazyComponent } from 'react-module-container';
import {
  AUTOMATION_WIDGET_COMPONENT_ID,
  PAGE_COMPONENT_ID,
  SIDE_PANEL_COMPONENT_ID,
  TASKS_WIDGET_COMPONENT_ID,
} from './config';
import {
  TAutomationsTasksProps,
  TContactsTasksProps,
  TTasksWebProps,
} from '@wix/tasks-client-common';
import { ModuleId, getModule } from '@wix/business-manager-api';
import Experiments from '@wix/wix-experiments';
import { LazyComponentProps } from '@wix/business-manager-dashboard-api';

const minified = (debug) => (debug ? '' : '.min');

const tasksBundleFiles = (props, entryPoint) => [
  `${props.config.topology.tasksWebStaticsUrl}${entryPoint}.bundle${minified(
    props.debug,
  )}.js`,
  `${props.config.topology.tasksWebStaticsUrl}${entryPoint}${minified(
    props.debug,
  )}.css`,
];

const tasksClientAppBundleFiles = (props, entryPoint = 'tasks-web-app') => [
  `${
    props.config.topology.tasksClientAppStaticsUrl
  }${entryPoint}.bundle${minified(props.debug)}.js`,
  `${props.config.topology.tasksClientAppStaticsUrl}${entryPoint}${minified(
    props.debug,
  )}.css`,
];

const getExperiments = async () => {
  const experiments = new Experiments();
  await Promise.all([
    experiments.load('business-manager'),
    experiments.load('my-account'),
  ]);
  return experiments.all();
};

export class TasksWebLazyComponent extends (ReactLazyComponent as React.ComponentClass<
  TTasksWebProps
>) {
  constructor(props: TTasksWebProps) {
    super(props, {
      files: tasksClientAppBundleFiles(props, 'tasks-web-app'),
      component: PAGE_COMPONENT_ID,
      resolve: async () => ({ experiments: await getExperiments() }),
    });
  }
}

class TasksBaseContactLazyComponent extends (ReactLazyComponent as React.ComponentClass<
  TContactsTasksProps
>) {
  constructor(props: TContactsTasksProps) {
    super(props, {
      files: tasksBundleFiles(props, 'tasks-web-contact-widget'),
      component: SIDE_PANEL_COMPONENT_ID,
      resolve: async () => ({
        experiments: await getExperiments(),
        isExtendedView: props.isExtendedView,
        accountLanguage: props.accountLanguage,
      }),
    });
  }
}
export class TasksContactOverviewLazyComponent extends TasksBaseContactLazyComponent {
  constructor(props: TContactsTasksProps) {
    super({ ...props, isExtendedView: true });
  }
}
export class TasksContactSidePanelLazyComponent extends TasksBaseContactLazyComponent {
  constructor(props: TContactsTasksProps) {
    super({
      ...props,
      isExtendedView: false,
      // when rendered in side panel, task contact widget gets 'locale' prop instead of 'accountLanguage' prop
      accountLanguage: props.locale,
    });
  }
}

export class TasksAutomationLazyComponent extends (ReactLazyComponent as React.ComponentClass<
  TAutomationsTasksProps
>) {
  constructor(props: TAutomationsTasksProps) {
    const module = getModule(ModuleId.TasksWeb) as any;
    super(props, {
      files: tasksBundleFiles(props, 'tasks-web-automation-widget'),
      component: AUTOMATION_WIDGET_COMPONENT_ID,
      resolve: async () => ({
        experiments: await getExperiments(),
        translations: module.getTranslations(),
      }),
    });
  }
}

export class TasksWidgetLazyComponent extends (ReactLazyComponent as React.ComponentClass<
  TTasksWebProps
>) {
  constructor(props: LazyComponentProps & TTasksWebProps) {
    super(props, {
      files: tasksBundleFiles(props, 'tasks-web-widget'),
      component: TASKS_WIDGET_COMPONENT_ID,
      resolve: async () => ({
        experiments: await getExperiments(),
      }),
    });
  }
}
