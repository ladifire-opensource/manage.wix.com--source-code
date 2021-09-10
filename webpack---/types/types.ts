import type { LoaderComponents } from '@components/loaders/widget-loader-components';
import type { HostContainerConfig } from '@wix/business-manager-api';
import type { ComponentType } from 'react';
import { DashboardLayout } from './layout-types';
import { ListOffersResponse } from '@wix/ambassador-dealer-offers-serving-service/types';
import { ComponentOptions } from '@wix/business-dashboard-common';

type RealEstateId = string;
export interface WidgetDefinition {
  widgetId: string;
  customData?: any;
  isFirstInteractive?: boolean;
  includeInDashboardMainMetrics?: boolean;
  permissions?: string[];
  widgetTitleKey?: string;
  prefetchedRealEstates?: Record<RealEstateId, ListOffersResponse>;
}

export type WidgetsDefinitions = Record<string, WidgetDefinition>;

export interface DealerWidgetDefinition extends Omit<WidgetDefinition, 'permissions'> {
  permissions?: string;
}

export interface DashboardWidget
  extends Pick<
    WidgetDefinition,
    | 'widgetId'
    | 'customData'
    | 'isFirstInteractive'
    | 'includeInDashboardMainMetrics'
    | 'widgetTitleKey'
    | 'prefetchedRealEstates'
  > {}

export enum ActiveDashboardColumns {
  LEFT = 'left',
  RIGHT = 'right',
}

export const ACTIVE_DASHBOARD_COLUMN_ORDER = [
  ActiveDashboardColumns.LEFT,
  ActiveDashboardColumns.RIGHT,
];

export interface ActiveDashboardSectionLayout {
  [ActiveDashboardColumns.LEFT]: ActiveDashboardLayoutItem[];
  [ActiveDashboardColumns.RIGHT]: ActiveDashboardLayoutItem[];
  definitions?: WidgetsDefinitions;
  removed?: string[];
  available?: string[];
}

export interface ActiveDashboardSectionWidgetDefinitions {
  [index: string]: WidgetDefinition;
}

export interface WidgetsLayout {
  column1: DashboardWidget[];
  column2: DashboardWidget[];
  activeDashboardSection?: ActiveDashboardSectionLayout;
}

export interface RawWidgetsLayout {
  column1: WidgetDefinition[];
  column2: WidgetDefinition[];
  activeDashboardSection?: ActiveDashboardSectionLayout;
}

export enum ColumnsLayoutSource {
  DEALER = 'dealer',
  CACHE = 'cache',
  FALLBACK = 'fallback',
}

export interface WidgetProps {
  onLoaded: () => void;
}
export type WidgetComponentClass = ComponentType<WidgetProps>;

// TODO: Move to dashboard-common and reuse in API
export interface HostConfig extends HostContainerConfig<ComponentOptions, LoaderComponents> {}

export interface WidgetData {
  dealer: {
    realEstateId: string;
    offerId: string;
    offerName: string;
  };
  widgetId: string;
  categoryKey: string;
  descriptionKey: string;
  isNew: boolean;
  titleKey: string;
  isPermitted: boolean;
}

export interface CustomizableWidgetsList {
  available: WidgetData[];
  selected: string[];
}

export interface ActiveDashboardLayoutItem {
  widgetId: string;
}

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export interface Column {
  id: string;
  widgets: string[];
}

export interface DraggableWidgetMap {
  widgetId: string;
  component: JSX.Element;
}

export type ColumnRecord = Record<string, Column>;

export interface PlaceholderProps {
  clientHeight: number;
  clientWidth: number;
  clientY: number;
  clientX: number;
}

export interface DashboardData {
  widgetsDefinitions: WidgetsDefinitions;
  layout: DashboardLayout;
  availableWidgets: string[];
}
