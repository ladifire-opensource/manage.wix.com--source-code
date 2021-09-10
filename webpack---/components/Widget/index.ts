import { a11yFocus, h, isNumber } from '../../util';
import { bind, connect, dispatch, getState } from '../../store';
import { setDraggable } from '../Draggable';
import { collapseInnerStyle, collapseOuterStyle, headerStyles } from './styles';
import {
  CHATBOT_WIDGET_IFRAME,
  CHATBOT_WIDGET_IFRAME_CONTAINER,
} from '../../constants';

export const createWidgetIframe = () => {
  const a11yId = 'c5ae986c-8e12-47d6-891a-21a875c731e1';

  const state = getState();

  const container = h('div', {
    'data-hook': 'chatbot-widget-iframe-container',
    class: CHATBOT_WIDGET_IFRAME_CONTAINER,
  });

  const header = h('div', {
    cssText: headerStyles,
  });

  const collapse = h('button', {
    cssText: collapseOuterStyle,
    type: 'button',
    onclick() {
      dispatch('widget/toggle');
    },
    'aria-label': 'collapse widget',
    'aria-controls': a11yId,
    'aria-expanded': 'true',
    'data-hook': 'chatbot-widget-collapse-iframe',
  });

  const buttonInner = h('div', {
    cssText: collapseInnerStyle,
  });

  const iframe = h('iframe', {
    id: a11yId,
    src: state.startUrl,
    frameBorder: '0',
    title: 'Wixbot',
    onload() {
      container.insertBefore(header, iframe);
    },
    'data-hook': 'chatbot-widget-iframe',
    class: CHATBOT_WIDGET_IFRAME,
  });

  collapse.append(buttonInner);
  header.appendChild(collapse);
  container.appendChild(iframe);

  const moveSourceTo = setDraggable({
    source: container,
    target: [container, header],
    dragEnd({ left, top, bottom, right }) {
      dispatch('widget/position', { left, top, bottom, right });
    },
  });

  bind('expanded', ({ expanded, bottom, right }) => {
    h(container, {
      style: { visibility: expanded ? 'visible' : 'hidden' },
      'aria-hidden': !expanded,
    });

    if (expanded && isNumber(bottom) && isNumber(right)) {
      moveSourceTo({ bottom, right });
    }
  });

  bind('startUrl', ({ startUrl, isActiveSession }) => {
    if (!isActiveSession) {
      if (iframe.getAttribute('src') !== startUrl) {
        const parent = iframe.parentElement;
        if (parent) {
          iframe.remove();
          iframe.setAttribute('src', startUrl);
          parent.appendChild(iframe);
        }
      }
    }
  });

  connect('expanded', ({ expanded }) => {
    if (expanded) {
      a11yFocus(collapse);
    }
  });

  return container;
};
