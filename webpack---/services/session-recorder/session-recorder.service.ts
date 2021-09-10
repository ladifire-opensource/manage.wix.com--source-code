import { getStepsCategories } from '@src/selectors';
import { DashboardWidgetData, Step } from '@wix/dashboard-setup-common';
import { WixRecorder } from '@wix/wix-recorder';
import {
  CustomAttribute,
  SessionRecorder,
  SessionRecorderEvent,
  STEP_ACTION_CLICKED_PREFIX,
} from './session-recorder.types';

const initSessionRecorder = (wixRecorder: WixRecorder): SessionRecorder => {
  return {
    start: (dashboardWidgetData: DashboardWidgetData): void => {
      wixRecorder.addCustomAttribute(
        CustomAttribute.Category,
        getStepsCategories(dashboardWidgetData),
      );
    },
    markEvent: (event: SessionRecorderEvent): void => {
      wixRecorder.addCustomAttribute(CustomAttribute.Event, event);
    },
    markStepCtaClick: (step: Step): void => {
      wixRecorder.addCustomAttribute(
        CustomAttribute.Event,
        STEP_ACTION_CLICKED_PREFIX + step.dealer.offerName,
      );
    },
  };
};

export const sessionRecorder = initSessionRecorder(window.wixRecorder);
