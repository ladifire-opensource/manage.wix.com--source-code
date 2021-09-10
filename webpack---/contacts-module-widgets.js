import { ModuleRegistry } from 'react-module-container';

const QuickActionTypes = {
  ContactPageActions: 'contact-page-actions',
  SidePanelQuickActions: 'contact-panel-quick-actions',
};

const WidgetTypes = {
  ContactPageTabWidget: 'contact-page-tab-widget',
  OverviewWidget: 'contact-page-overview-widget',
  OverviewSidePanelWidget: 'contact-page-overview-side-widget',
  SidePanelWidget: 'contact-panel-widget',
  SidePanelDrillInWidget: 'contact-panel-drill-in-widget',
};

const registeredComponentsTypesList = [
  WidgetTypes.ContactPageTabWidget,
  WidgetTypes.OverviewWidget,
  WidgetTypes.OverviewSidePanelWidget,
  QuickActionTypes.ContactPageActions,
  WidgetTypes.SidePanelWidget,
  WidgetTypes.SidePanelDrillInWidget,
  QuickActionTypes.SidePanelQuickActions,
];

export const isContactsViewsRegisteredComponent = (configPayload) =>
  registeredComponentsTypesList.includes(configPayload.type);

export const initRegisteredComponents = () => {
  const registeredComponents = new Map();
  registeredComponentsTypesList.forEach((registeredComponentsType) => {
    registeredComponents.set(registeredComponentsType, []);
  });
  return registeredComponents;
};

export const registerContactsViewsComponent = (
  sourceModuleId,
  configPayload,
  registeredComponents,
) => {
  switch (configPayload.type) {
    case WidgetTypes.ContactPageTabWidget:
      registeredComponents.get(WidgetTypes.ContactPageTabWidget).push({
        componentName: configPayload.componentName,
        moduleId: sourceModuleId,
        shouldRender: configPayload.shouldRender,
        type: WidgetTypes.ContactPageTabWidget,
        tabName: configPayload.tabName,
      });
      ModuleRegistry.notifyListeners(
        `crm.contacts.registeredComponents.${WidgetTypes.ContactPageTabWidget}`,
      );
      break;
    case QuickActionTypes.ContactPageActions:
      registeredComponents.get(QuickActionTypes.ContactPageActions).push({
        moduleId: sourceModuleId,
        shouldRender: configPayload.shouldRender,
        type: QuickActionTypes.ContactPageActions,
        actions: configPayload.actions,
      });
      ModuleRegistry.notifyListeners(
        `crm.contacts.registeredComponents.${QuickActionTypes.ContactPageActions}`,
      );
      break;
    case WidgetTypes.OverviewWidget:
      registeredComponents.get(WidgetTypes.OverviewWidget).push({
        componentName: configPayload.componentName,
        moduleId: sourceModuleId,
        shouldRender: configPayload.shouldRender,
        type: WidgetTypes.OverviewWidget,
      });
      ModuleRegistry.notifyListeners(
        `crm.contacts.registeredComponents.${WidgetTypes.OverviewWidget}`,
      );
      break;
    case WidgetTypes.OverviewSidePanelWidget:
      registeredComponents.get(WidgetTypes.OverviewSidePanelWidget).push({
        componentName: configPayload.componentName,
        moduleId: sourceModuleId,
        shouldRender: configPayload.shouldRender,
        category: configPayload.category,
        type: WidgetTypes.OverviewSidePanelWidget,
      });
      ModuleRegistry.notifyListeners(
        `crm.contacts.registeredComponents.${WidgetTypes.OverviewSidePanelWidget}`,
      );
      break;
    default:
  }
};

export const registerPaidPlans = (
  sourceModuleId,
  configPayload,
  registeredComponents,
) => {
  registeredComponents.get(WidgetTypes.OverviewSidePanelWidget).push({
    componentName: configPayload.componentName,
    moduleId: sourceModuleId,
    shouldRender: configPayload.shouldRender,
    type: WidgetTypes.OverviewSidePanelWidget,
  });
  ModuleRegistry.notifyListeners(
    `crm.contacts.registeredComponents.${WidgetTypes.OverviewSidePanelWidget}`,
  );
};

export const registerBookingTab = (
  sourceModuleId,
  configPayload,
  registeredComponents,
) => {
  registeredComponents.get(WidgetTypes.ContactPageTabWidget).push({
    componentName: configPayload.componentName,
    moduleId: sourceModuleId,
    shouldRender: configPayload.shouldRender,
    type: WidgetTypes.ContactPageTabWidget,
    tabName: async () => 'tabs.booking-title',
  });
  ModuleRegistry.notifyListeners(
    `crm.contacts.registeredComponents.${WidgetTypes.ContactPageTabWidget}`,
  );
};

export const registerNotesTab = (
  sourceModuleId,
  configPayload,
  registeredComponents,
) => {
  registeredComponents.get(WidgetTypes.ContactPageTabWidget).push({
    componentName: configPayload.componentName,
    moduleId: sourceModuleId,
    type: WidgetTypes.ContactPageTabWidget,
    tabName: async () => 'tabs.notes-title',
  });
  ModuleRegistry.notifyListeners(
    `crm.contacts.registeredComponents.${WidgetTypes.ContactPageTabWidget}`,
  );
};

export const registerTaskAndReminders = (
  sourceModuleId,
  configPayload,
  registeredComponents,
) => {
  registeredComponents.get(WidgetTypes.OverviewWidget).push({
    componentName: configPayload.componentName,
    moduleId: sourceModuleId,
    shouldRender: configPayload.shouldRender,
    type: WidgetTypes.OverviewWidget,
  });
  ModuleRegistry.notifyListeners(
    `crm.contacts.registeredComponents.${WidgetTypes.OverviewWidget}`,
  );
};
