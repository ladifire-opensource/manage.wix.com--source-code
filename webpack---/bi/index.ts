import { factory } from '@wix/web-bi-logger';
import { DealerOfferPayloadTooltip } from '../dealer/types';
import { IState, IPosition } from '../store/widget';
import { InitParams, WIDGET_LOAD_FAIL_PHASE } from '../types';

// The event is triggered whenever a user drags the widget
export const BI_DRAG_WIDGET = 1108;
// The chatbot widget is opened after being minimized
export const BI_OPEN_WIDGET = 1109;
// The chatbot widget is closed
export const BI_CLOSE_WIDGET = 1110;
// Chatbot widget is shown to the user
export const BI_WIDGET_LOADED = 1111;
// The user attempts to load the chatbot widget
export const BI_WIDGET_LOAD_ATTEMPT = 1113;
// The user fails to open the chatbot widget
export const BI_WIDGET_LOAD_FAILURE = 1114;
// The user is shown a tooltip near the chatbot widget
export const BI_TOOLTIP_LOAD = 1115;
// The chatbot widget is opened after the user clicks on a tooltip
export const BI_TOOLTIP_CLICK = 1116;
// The user closes a chatbot tooltip
export const BI_TOOLTIP_CLOSE = 1117;

const biChatbot = factory({ endpoint: 'chatbot' })
  .updateDefaults({
    src: 4,
    current_page_name: document.title,
    msid: '',
    node_name: '',
  })
  .logger();

export const biOpenWidget = (state: IState) => {
  biChatbot.log({
    evid: BI_OPEN_WIDGET,
    conversation_id: state.conversation_id,
    lang: state.lang,
    node_id: state.node_id,
    notificationCount: state.unreadCount,
    orig_page_name: state.orig_page_name,
    orig_platform: state.orig_platform,
    referral_info: state.referral,
  });
};

export const biCloseWidget = (state: IState) => {
  biChatbot.log({
    evid: BI_CLOSE_WIDGET,
    conversation_id: state.conversation_id,
    lang: state.lang,
    node_id: state.node_id,
    orig_page_name: state.orig_page_name,
    orig_platform: state.orig_platform,
  });
};

export const biDragWidget = (state: IState, args: IPosition) => {
  biChatbot.log({
    evid: BI_DRAG_WIDGET,
    conversation_id: state.conversation_id,
    lang: state.lang,
    new_position: `{${args?.top}, ${args?.left}}`,
    old_position: `{${state.top}, ${state.left}}`,
    widget_state: state.expanded ? 'open' : 'closed',
    node_id: state.node_id,
    orig_page_name: state.orig_page_name,
    orig_platform: state.orig_platform,
  });
};

export const biWidgetLoaded = ({
  state,
  initParams,
  dealerOfferId = '',
}: {
  state: Omit<IState, 'unreadCount'>;
  initParams: InitParams;
  dealerOfferId: string | undefined;
}) => {
  biChatbot.log({
    evid: BI_WIDGET_LOADED,
    conversation_id: state.conversation_id,
    lang: state.lang,
    node_id: state.node_id,
    notificationCount: 0,
    dealer_offer_id: dealerOfferId,
    init_params: initParams,
    orig_page_name: state.orig_page_name,
    orig_platform: state.orig_platform,
    widget_state: state.expanded ? 'open' : 'closed',
    referral_info: state.referral,
  });
};

export const biWidgetLoadAttempt = (initParams: InitParams) => {
  biChatbot.log({
    evid: BI_WIDGET_LOAD_ATTEMPT,
    referral_info: document.location.href,
    init_params: JSON.stringify(initParams),
  });
};

export const biWidgetLoadFailure = ({
  failReason,
  failDetails = '',
  initParams,
}: {
  failReason: WIDGET_LOAD_FAIL_PHASE;
  failDetails: string;
  initParams: InitParams;
}) => {
  biChatbot.log({
    evid: BI_WIDGET_LOAD_FAILURE,
    referral_info: document.location.href,
    fail_reason: failReason,
    fail_details: failDetails,
    init_params: JSON.stringify(initParams),
  });
};

// The user is shown a tooltip near the chatbot widget
export const biTooltipLoad = (
  state: IState,
  tooltip: DealerOfferPayloadTooltip,
) => {
  biChatbot.log({
    evid: BI_TOOLTIP_LOAD,
    conversation_id: state.conversation_id,
    current_page_name: document.title,
    lang: state.lang,
    orig_page_name: state.orig_page_name,
    orig_platform: state.orig_platform,
    referral_info: state.referral,
    tooltip_name: tooltip.tooltipTitle,
    tooltip_text: tooltip.tooltipContent,
    widget_state: state.expanded ? 'open' : 'closed',
  });
};

// The chatbot widget is opened after the user clicks on a tooltip
export const biTooltipClick = (
  state: IState,
  tooltip: DealerOfferPayloadTooltip,
) => {
  biChatbot.log({
    evid: BI_TOOLTIP_CLICK,
    conversation_id: state.conversation_id,
    current_page_name: document.title,
    lang: state.lang,
    orig_page_name: state.orig_page_name,
    orig_platform: state.orig_platform,
    referral_info: state.referral,
    tooltip_name: tooltip.tooltipTitle,
    tooltip_text: tooltip.tooltipContent,
    widget_state: state.expanded ? 'open' : 'closed',
  });
};

// The user closes a chatbot tooltip
export const biTooltipClose = (
  state: IState,
  tooltip: DealerOfferPayloadTooltip,
) => {
  biChatbot.log({
    evid: BI_TOOLTIP_CLOSE,
    conversation_id: state.conversation_id,
    current_page_name: document.title,
    lang: state.lang,
    orig_page_name: state.orig_page_name,
    orig_platform: state.orig_platform,
    referral_info: state.referral,
    tooltip_name: tooltip.tooltipTitle,
    tooltip_text: tooltip.tooltipContent,
    widget_state: state.expanded ? 'open' : 'closed',
  });
};
