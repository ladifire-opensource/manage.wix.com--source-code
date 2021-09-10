import { TModuleParams } from '@wix/business-manager-api';

// types
export enum RegisteredEntityTypes {
  TabWidget = 'contact-page-tab-widget',
  OverviewWidget = 'contact-page-overview-widget',
  OverviewSidePanelWidget = 'contact-page-overview-side-widget',
  SidePanelWidget = 'contact-panel-widget',
  SidePanelDrillInWidget = 'contact-panel-drill-in-widget',
  MoreActions = 'contact-page-actions',
  SidePanelQuickActions = 'contact-panel-quick-actions',
}

export type ShouldRenderFunc = (
  contactId: string,
  moduleParams: TModuleParams,
) => Promise<boolean>;

export interface RegisteredTabWidget extends RegisteredEntity {
  componentName: string;
  type: RegisteredEntityTypes.TabWidget;
  tabName({ moduleParams: TModuleParams }): Promise<string>;
}

export interface RegisteredOverviewWidget extends RegisteredEntity {
  type:
    | RegisteredEntityTypes.OverviewWidget
    | RegisteredEntityTypes.OverviewSidePanelWidget;
  componentName: string;
}

export interface SidePanelWidget extends RegisteredEntity {
  type: RegisteredEntityTypes.SidePanelWidget;
  componentName: string;
  hasFooter: boolean;
}

export interface SidePanelDrillInWidget extends RegisteredEntity {
  type: RegisteredEntityTypes.SidePanelDrillInWidget;
  componentName: string;
  hasFooter: boolean;
}

export type registeredComponents =
  | RegisteredActions
  | RegisteredTabWidget
  | RegisteredOverviewWidget
  | SidePanelDrillInWidget
  | SidePanelQuickActions
  | SidePanelWidget;

export interface MoreAction {
  label: Promise<string>;
  priority: number;
  onClick({ contactId: string, moduleParams: TModuleParams }): void;
  icon?: JSX.Element;
  subtitle?: Promise<string>;
}
export interface RegisteredActions extends RegisteredEntity {
  type: RegisteredEntityTypes.MoreActions;
  actions: MoreAction[];
}
export interface SidePanelQuickActions extends RegisteredEntity {
  type: RegisteredEntityTypes.SidePanelQuickActions;
  actions: MoreAction[];
}
export const widgetModes = {
  BASE: 'base',
  EXPANDED: 'expanded',
  FOOTER: 'footer',
};
export interface RegisteredEntity {
  shouldRender: ShouldRenderFunc;
  moduleId: string;
}
