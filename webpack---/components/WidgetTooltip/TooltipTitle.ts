import {
  CHATBOT_WIDGET_TOOLTIP_BOT_ICON,
  CHATBOT_WIDGET_TOOLTIP_CLOSE_ICON,
  CHATBOT_WIDGET_TOOLTIP_TITLE,
  CHATBOT_WIDGET_TOOLTIP_TITLE_TEXT,
} from '../../constants';
import { h } from '../../util';

export type TooltipTitleProps = {
  tooltipTitle?: string;
};

export const createTooltipTitle = ({
  tooltipTitle,
}: TooltipTitleProps): HTMLElement | null => {
  if (!tooltipTitle) {
    return null;
  }

  const container = h('div', {
    class: CHATBOT_WIDGET_TOOLTIP_TITLE,
    'data-hook': 'chatbot-widget-tooltip-title',
  });

  [
    h('div', { class: CHATBOT_WIDGET_TOOLTIP_BOT_ICON }),
    h('div', {
      class: CHATBOT_WIDGET_TOOLTIP_TITLE_TEXT,
      innerHTML: tooltipTitle,
    }),
    h('div', {
      class: CHATBOT_WIDGET_TOOLTIP_CLOSE_ICON,
      'data-hook': 'chatbot-widget-tooltip-close-button',
    }),
  ].forEach((node) => container.appendChild(node));

  return container;
};
