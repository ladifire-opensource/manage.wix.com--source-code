import { DashboardWidgetData, Step } from '@wix/dashboard-setup-common';

export enum CustomAttribute {
  Category = 'setup-widget-category',
  Event = 'setup-widget-event',
}

export enum SessionRecorderEvent {
  VideoClicked = 'video-clicked',
}

export const STEP_ACTION_CLICKED_PREFIX = 'step-action-clicked_';

export interface SessionRecorder {
  start(dashboardWidgetData: DashboardWidgetData): void;
  markEvent(event: SessionRecorderEvent): void;
  markStepCtaClick(step: Step): void;
}
