import { a11yFocus, h, isNumber } from '../../util';
import { bind, connect, dispatch } from '../../store';
import { questionMarkSvg } from '../Icons/questionMark';
import { setDraggable } from '../Draggable';
import { counterStyle } from './styles';
import {
  CHATBOT_WIDGET_ANCHOR_CONTAINER,
  CHATBOT_WIDGET_BUTTON_CONTAINER,
} from '../../constants';

import { DealerOfferDetails } from '../../dealer/types';

export type CreateWidgetButtonParams = {
  dealerOffer?: DealerOfferDetails;
};

export const createWidgetButton = ({
  dealerOffer,
}: CreateWidgetButtonParams) => {
  const container = h('div', {
    class: CHATBOT_WIDGET_BUTTON_CONTAINER,
    'data-hook': 'chatbot-widget-button-container',
  });

  const button = h('button', {
    class: CHATBOT_WIDGET_ANCHOR_CONTAINER,
    type: 'button',
    innerHTML: questionMarkSvg,
    'aria-label': 'Need Help?',
    'data-hook': 'chatbot-widget-button',
  });

  const counter = h('div', {
    cssText: counterStyle,
    role: 'progressbar',
  });

  container.appendChild(button);
  container.appendChild(counter);

  const moveSourceTo = setDraggable({
    source: container,
    target: [container],
    dragStart: () => {
      dispatch('widget/tooltip/close-per-offer', dealerOffer);
    },
    dragEnd({ left, top, bottom, right }) {
      dispatch('widget/position', { left, top, bottom, right });
    },
  });

  bind('expanded', ({ expanded, bottom, right }) => {
    h(container, {
      style: { display: expanded ? 'none' : 'flex' },
      'aria-hidden': expanded,
    });

    if (!expanded && isNumber(bottom) && isNumber(right)) {
      moveSourceTo({ bottom, right });
    }
  });

  bind('startUrl', ({ startUrl, isActiveSession, expanded }) => {
    const visible = (startUrl || isActiveSession) && !expanded;

    h(container, {
      style: { display: visible ? 'flex' : 'none' },
      'aria-hidden': !visible,
    });
  });

  bind('unreadCount', ({ unreadCount }) => {
    const isEmpty = unreadCount < 1;
    const count = String(unreadCount);

    h(counter, {
      style: { display: isEmpty ? 'none' : 'flex' },
      textContent: count,
      'aria-valuenow': count,
      'aria-valuetext': `${count} unread messages`,
      'aria-hidden': isEmpty,
    });
  });

  connect('expanded', ({ expanded }) => {
    if (!expanded) {
      a11yFocus(button);
    }
  });

  button.addEventListener('click', () => {
    dispatch('widget/toggle');
    dispatch('widget/tooltip/close-per-offer', dealerOffer);
  });

  return container;
};
