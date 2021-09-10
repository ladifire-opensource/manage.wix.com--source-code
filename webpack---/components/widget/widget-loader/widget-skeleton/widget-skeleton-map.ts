import { ACTIVE_DASHBOARD_SECTION_BM_COMPONENT } from '@consts';
import { SkeletonContent } from 'wix-style-react';
import { WidgetComponentNames } from '../constants';

export const DEFAULT_SKELETON_KEY = 'default';

export interface SkeletonContentResult {
  key: string;
  content: SkeletonContent[] | null;
  height?: number;
}

export const SKELETON_WITH_3_LINES_CONTENT: SkeletonContent[] = [
  { type: 'line', size: 'small' },
  { type: 'line', size: 'large' },
  { type: 'line', size: 'medium' },
];

const widgetSkeletonArray: SkeletonContentResult[] = [
  {
    key: WidgetComponentNames.DashboardSmartHeader,
    height: 18,
    content: null,
  },
  {
    key: WidgetComponentNames.DashboardCelebrations,
    content: null,
  },
  {
    key: ACTIVE_DASHBOARD_SECTION_BM_COMPONENT,
    content: null,
  },
  {
    key: DEFAULT_SKELETON_KEY,
    height: 120,
    content: SKELETON_WITH_3_LINES_CONTENT,
  },
  {
    key: WidgetComponentNames.SiteDetails,
    height: 160,
    content: SKELETON_WITH_3_LINES_CONTENT,
  },
  {
    key: WidgetComponentNames.SetupWidget,
    height: 396,
    content: SKELETON_WITH_3_LINES_CONTENT,
  },
  {
    key: WidgetComponentNames.SuggestionsWidget,
    height: 396,
    content: SKELETON_WITH_3_LINES_CONTENT,
  },
  {
    key: WidgetComponentNames.TopSuggestionsWidget,
    height: 220,
    content: SKELETON_WITH_3_LINES_CONTENT,
  },
  {
    key: WidgetComponentNames.SalesWidget,
    height: 200,
    content: SKELETON_WITH_3_LINES_CONTENT,
  },
  {
    key: WidgetComponentNames.HelpWidget,
    height: 283,
    content: SKELETON_WITH_3_LINES_CONTENT,
  },
  {
    key: WidgetComponentNames.Analytics,
    height: 463,
    content: SKELETON_WITH_3_LINES_CONTENT,
  },
];

const widgetSkeletonContentMap: {
  [componentName in WidgetComponentNames | 'default']: SkeletonContentResult;
} = widgetSkeletonArray.reduce(
  (map, skeleton) => ({
    ...map,
    [skeleton.key]: skeleton,
  }),
  {} as any,
);

export const getWidgetSkeletonContent = (componentName: string): SkeletonContentResult =>
  widgetSkeletonContentMap[componentName as WidgetComponentNames] ||
  widgetSkeletonContentMap.default;
