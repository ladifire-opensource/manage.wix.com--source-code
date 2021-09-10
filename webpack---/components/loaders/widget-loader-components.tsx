import React from 'react';
import { ModuleRegistry } from 'react-module-container';
import { EmptyLoader, EmptyLoaderProps } from './empty-loader.component';
import { SkeletonLoader, SkeletonLoaderProps } from './skeleton-loader.component';

const DASHBOARD_SKELETON_LOADER = 'DashboardSkeletonLoader';
const DASHBOARD_EMPTY_LOADER = 'DashboardEmptyLoader';

export type LoaderComponents = {
  [DASHBOARD_SKELETON_LOADER]: {
    componentProps: SkeletonLoaderProps;
  };
  [DASHBOARD_EMPTY_LOADER]: {
    componentProps: EmptyLoaderProps;
  };
};

export const registerLoaderComponents = () => {
  ModuleRegistry.registerComponent(DASHBOARD_SKELETON_LOADER, () => SkeletonLoader);
  ModuleRegistry.registerComponent(DASHBOARD_EMPTY_LOADER, () => (props: EmptyLoaderProps) => (
    <EmptyLoader {...props} />
  ));
};
