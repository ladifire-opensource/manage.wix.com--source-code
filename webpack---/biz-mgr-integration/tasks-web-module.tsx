import { ModuleRegistry } from 'react-module-container';
import {
  LAZY_AUTOMATION_WIDGET_COMPONENT_ID,
  LAZY_PAGE_COMPONENT_ID,
  LAZY_SIDE_PANEL_COMPONENT_ID,
  LAZY_CONTACT_OVERVIEW_COMPONENT_ID,
  LAZY_TASKS_WIDGET_COMPONENT_ID,
} from './config';
import {
  BusinessManagerModule,
  registerModule,
  ModuleId,
  configModule,
  PageComponentId,
  registerPageComponentMonitors,
} from '@wix/business-manager-api';
import {
  TasksAutomationLazyComponent,
  TasksContactSidePanelLazyComponent,
  TasksContactOverviewLazyComponent,
  TasksWebLazyComponent,
  TasksWidgetLazyComponent,
} from './tasks-web-lazy-components';
import axios from 'axios';
import { sentryClient } from '../services/sentry-client';
import { DashboardAPI } from '@wix/business-manager-dashboard-api';
import * as React from 'react';
import { TaskComplete } from 'wix-ui-icons-common';
import Experiments from '@wix/wix-experiments';
import { triggersConfig } from './triggers-config';

export class TasksWebModule extends BusinessManagerModule {
  private translations: string[];
  private readonly experiments: Experiments;

  constructor(moduleId: ModuleId) {
    super(moduleId);
    ModuleRegistry.registerComponent(
      LAZY_PAGE_COMPONENT_ID,
      () => TasksWebLazyComponent,
    );
    ModuleRegistry.registerComponent(
      LAZY_CONTACT_OVERVIEW_COMPONENT_ID,
      () => TasksContactOverviewLazyComponent,
    );
    ModuleRegistry.registerComponent(
      LAZY_SIDE_PANEL_COMPONENT_ID,
      () => TasksContactSidePanelLazyComponent,
    );

    ModuleRegistry.registerComponent(
      LAZY_TASKS_WIDGET_COMPONENT_ID,
      () => TasksWidgetLazyComponent,
    );
    this.registerComponentWithModuleParams(
      LAZY_AUTOMATION_WIDGET_COMPONENT_ID,
      TasksAutomationLazyComponent,
    );

    this.experiments = new Experiments({ scope: 'my-account' });
  }

  getTranslations() {
    return this.translations;
  }

  init(moduleParams) {
    registerPageComponentMonitors(PageComponentId.TasksWeb, {
      sentryClient,
    });

    DashboardAPI.registerWidgets({
      id: 'tasks-widget',
      staticUrl: moduleParams.config.topology.tasksWebStaticsUrl,
      initialDataEndpoint: '/_api/tasks-view-model-server/v1/widget-data',
    });

    const {
      config: {
        topology: { tasksTranslationsUrl },
      },
      accountLanguage,
    } = moduleParams;
    axios
      .get(
        `${tasksTranslationsUrl}assets/locale/messages_${accountLanguage}.json`,
      )
      .then(({ data: translations }) => {
        this.translations = translations;
        configModule(
          this.moduleId,
          ModuleId.Triggers,
          triggersConfig(translations, this.experiments),
        );
        configModule(this.moduleId, ModuleId.Contacts, {
          type: 'contact-page-actions',
          actions: [
            {
              label: Promise.resolve(this.translations['tasks.widget.addTask']),
              priority: 2,
              onClick: this.onQuickActionAddTaskClick,
              icon: <TaskComplete />,
              subtitle: Promise.resolve(
                this.translations['tasks.widget.addTaskSubtitle'],
              ),
            },
          ],
        });
      });

    const contactsSidePanelConfig = {
      componentName: LAZY_SIDE_PANEL_COMPONENT_ID,
      priority: 1,
      type: 'activity_panel',
      tabName: 'Tasks',
    };
    configModule(this.moduleId, ModuleId.Contacts, contactsSidePanelConfig);

    const contactsOverviewConfig = {
      componentName: LAZY_CONTACT_OVERVIEW_COMPONENT_ID,
      type: 'contact-page-overview-widget',
    };
    configModule(this.moduleId, ModuleId.Contacts, contactsOverviewConfig);
  }

  onQuickActionAddTaskClick = () => {
    ModuleRegistry.invoke('crm.contacts.fullPage.openTabByModuleId', {
      moduleId: ModuleId.Contacts,
    });
    ModuleRegistry.notifyListeners('tasksApp.addTaskClicked');
  };
}

registerModule(ModuleId.TasksWeb, TasksWebModule);
