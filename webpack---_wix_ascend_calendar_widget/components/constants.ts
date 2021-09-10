export const DAYS_A_WEEK = 7;

export const DATAHOOKS = {
  Widget: 'ascend-calendar-widget',
  WidgetError: 'ascend-calendar-widgetError',
  TodayButton: 'ascend-calendar-widget.headerTodayButton',
  DateRange: 'ascend-calendar-widget.headerDateRange',
  HeaderTitle: 'ascend-calendar-widget.headerTitle',
  PreviusWeekButton: 'ascend-calendar-widget.headerPreviusWeekButton',
  NextWeekButton: 'ascend-calendar-widget.headerNextWeekButton',
  Calendar: 'ascend-calendar-widget.calendar',
  Title: 'ascend-calendar-widget.title',
  Time: 'ascend-calendar-widget.time',
  Badge: 'ascend-calendar-widget.badge',
  Thumbnail: 'ascend-calendar-widget.thumbnail',
  EventDetail: 'ascend-calendar-widget.eventDetail',
  SuggestionDetail: 'ascend-calendar-widget.suggestionDetail',
  showSuggestions: 'ascend-calendar-widget.showSuggestions',
  errorMessage: 'ascend-calendar-widget.errorMessage',
  errorMessageCTA: 'ascend-calendar-widget.errorMessageCTA',
  firstTimmer: 'ascend-calendar-widget.firstTimmer',
  firstTimmerAndFutureEvents:
    'ascend-calendar-widget.firstTimmerAndFutureEvents',
  addButton: 'ascend-calendar-widget.addButton',
  addMenu: 'ascend-calendar-widget.addMenu',
  futureEvent: 'calendar-widget.futureEvent',
  moreSuggestion: 'calendar-widget.moreSuggestion',
  suggestionDismiss: 'ascend-calendar-widget.suggestionDismiss',
  DetailChannel: 'ascend-calendar-widget.detail.channel',
  DetailTitle: 'ascend-calendar-widget.detail.title',
  DetailDescription: 'ascend-calendar-widget.detail.description',
  DetailDateTime: 'ascend-calendar-widget.detail.dateTime',
  DetailStatus: 'ascend-calendar-widget.detail.status',
  DetailImage: 'ascend-calendar-widget.detail.image',
  BackgroundImage: 'ascend-calendar-widget.detail.backgroundImage',
  DetailDistribuions: 'ascend-calendar-widget.detail.distribions',
  DetailMainCTA: 'ascend-calendar-widget.detail.mainCTA',
  DetailSecondaryCTA: 'ascend-calendar-widget.detail.secondaryCTA',
  DetailTextCTA: 'ascend-calendar-widget.detail.textCTA',
  DetailPreviewButton: 'ascend-calendar-widget.detail.previewButton',
  DetailPreviewButtonTooltip:
    'ascend-calendar-widget.detail.previewButtonTooltip',
  DetailMenuText: 'ascend-calendar-widget.detail.menuText',
  DetailMenu: 'ascend-calendar-widget.detail.menu',
  AnalyticsButton: 'ascend-calendar-widget.detail.analyticsButton',
  MockRescheduleNextDay: 'ascend-calendar-widget.detail.rescheduleNextDay',
  MockRescheduleNextHour: 'ascend-calendar-widget.detail.rescheduleNextHour',
  MockRescheduleNextWeek: 'ascend-calendar-widget.detail.rescheduleNextWeek',
  MessageModal: 'ascend-calendar-widget.detail.messageModal',
  MessageModalLayout: 'ascend-calendar-widget.detail.messageModalLayout',
  CalendarDetail: 'ascend-calendar-widget.calendarDetail',
  AscendLogo: 'ascend-calendar-widget.ascendLogo',
  UpgradeMessage: 'ascend-calendar-widget.upgradeMessage',
  UpgradeMessageCTA: 'ascend-calendar-widget.upgradeMessageCTA',
  DetailStatisticTitle: 'ascend-calendar-widget.detailStatisticTitle',
};

export const ERROR = {
  LoadingData: 'Error loafing the data of calendar!!!',
};

export const WIDGET_CTA_CLICK = {
  add_new: 'add_new',
  create_new_social_post: 'create_new_social_post',
  create_new_email_marketing_campaign: 'create_new_email_marketing_campaign',
  create_new_blog_post: 'create_new_blog_post',
  navigate_week_forward: 'navigate_week_forward',
  navigate_week_backward: 'navigate_week_backward',
  navigate_today: 'navigate_today',
};

export const WIDGET_CTA_CLICK_MAIN = [
  WIDGET_CTA_CLICK.create_new_blog_post,
  WIDGET_CTA_CLICK.create_new_email_marketing_campaign,
  WIDGET_CTA_CLICK.create_new_social_post,
];

export const HTTP_CLIENT_CONFIG = { ignoredProtoHttpUrlPart: '/api' };

export const BI_TIMER = 1000;

export const CALENDAR_WIDTH_OLD = 510;
export const CALENDAR_WIDTH = 684;

export const CALENDAR_DETAIL_TOP = '-45px';
export const CALENDAR_DETAIL_TOP_OLD = '-90px';

export const DEFAULT_SP_INTENT = '1f789d70-0a7d-4ce4-b1f8-59b654f4df55';

export enum TOAST_TYPES {
  FIRST_TIME = 'first_time',
  MORE_SUGGESTION = 'more_suggestion',
  MORE_SCHEDULED = 'more_scheduled',
  FIRST_TIME_AND_SCHEDULED = 'first_time_and_scheduled',
  ERROR_EMAIL_MARKETING = 'error_email_marketing',
  ERROR_BLOG_POST = 'error_blog_post',
  ERROR_SOCIAL_POST = 'error_social_post',
  ERROR_SUGGESTIONS = 'error_suggestions',
  ERROR_SCHEDULE_EMAIL_MARKETING = 'error_schedule_email_marketing',
  ERROR_SCHEDULE_SOCIAL_POST = 'error_schedule_social_post',
}

export type ToastTypes =
  | TOAST_TYPES.FIRST_TIME
  | TOAST_TYPES.MORE_SUGGESTION
  | TOAST_TYPES.MORE_SCHEDULED
  | TOAST_TYPES.FIRST_TIME_AND_SCHEDULED
  | TOAST_TYPES.ERROR_EMAIL_MARKETING
  | TOAST_TYPES.ERROR_BLOG_POST
  | TOAST_TYPES.ERROR_SOCIAL_POST
  | TOAST_TYPES.ERROR_SUGGESTIONS
  | TOAST_TYPES.ERROR_SCHEDULE_EMAIL_MARKETING
  | TOAST_TYPES.ERROR_SCHEDULE_SOCIAL_POST;

export enum CTA_TYPES {
  CLOSE = 'close',
  MAIN_CTA = 'main_cta',
  SECONDARY_CTA = 'secondary_cta',
}
export type CTA_Types =
  | CTA_TYPES.CLOSE
  | CTA_TYPES.MAIN_CTA
  | CTA_TYPES.SECONDARY_CTA;

export enum CTA_ACTION {
  DETAIL = 'detail',
  DETAIL_CLOSE = 'detail_close',
  SEE_ALL = 'see_all',
  SEE_TEMPLATES = 'see_templates',
  REUSE = 'reuse',
  PREVIEW = 'preview',
  RESCHEDULE = 'reschedule',
  EDIT_SCHEDULE = 'edit_schedule',
  DISMISS_SUGGESTION = 'dismiss_suggestion',
  PAUSE_SCHEDULE = 'pause_schedule',
  CANCEL_SCHEDULE = 'cancel_schedule',
  DELETE_SCHEDULE = 'delete_schedule',
  NEW_FROM_SUGGESTION = 'new_from_suggestion',
  ANALYTICS = 'analytics',
}

export type CTA_Action =
  | CTA_ACTION.DETAIL
  | CTA_ACTION.DETAIL_CLOSE
  | CTA_ACTION.SEE_ALL
  | CTA_ACTION.SEE_TEMPLATES
  | CTA_ACTION.REUSE
  | CTA_ACTION.PREVIEW
  | CTA_ACTION.RESCHEDULE
  | CTA_ACTION.EDIT_SCHEDULE
  | CTA_ACTION.DISMISS_SUGGESTION
  | CTA_ACTION.PAUSE_SCHEDULE
  | CTA_ACTION.CANCEL_SCHEDULE
  | CTA_ACTION.DELETE_SCHEDULE
  | CTA_ACTION.NEW_FROM_SUGGESTION
  | CTA_ACTION.ANALYTICS;

export const BLOG_ANALYTICS_REPORT = 'f4d4f700-d8f0-48b7-8c85-b5501535f217';
