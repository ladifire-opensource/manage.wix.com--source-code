import { ACTIVE_DASHBOARD_SECTION_ID } from '@consts';
import { Logger } from '@wix/bi-logger-new-dash-platform';

// evid: 195
export const sendClickInDashboardEvent = (logger: Logger, name: string) => {
  logger.clickInDashboard({
    widget_name: ACTIVE_DASHBOARD_SECTION_ID,
    name,
  });
};

// evid: 1172
export const sendViewInDashboardEvent = (logger: Logger, name: string) => {
  logger.viewInDashboard({
    widget_name: ACTIVE_DASHBOARD_SECTION_ID,
    name,
  });
};

// evid: 583
export const sendShowTooltipEvent = (logger: Logger) => {
  logger.bizManagerShowTooltip({
    place: ACTIVE_DASHBOARD_SECTION_ID,
    name: 'customize-dashboard',
    is_hover: true,
  });
};

// evid: 1473
export const sendAddOrDropWidgetEvent = ({
  logger,
  widgetName,
  fromLocation,
  toLocation,
}: {
  logger: Logger;
  widgetName: string;
  fromLocation: string;
  toLocation: string;
}) => {
  logger.activeDashboardDrapAndDropWidget({
    widget_name: widgetName,
    from_location: fromLocation,
    to_location: toLocation,
  });
};

// evid: 1480
export const sendAddOrDropWidgetErrorEvent = ({
  logger,
  widgetName,
  fromLocation,
}: {
  logger: Logger;
  widgetName: string;
  fromLocation: string;
}) => {
  logger.activeDashboardErrorOfDrapAndDropWidget({
    widget_name: widgetName,
    from_location: fromLocation,
  });
};
