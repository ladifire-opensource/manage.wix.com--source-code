import {
  CHATBOT_WIDGET_BUTTON_CONTAINER,
  CHATBOT_WIDGET_TOOLTIP_CLOSE_ICON,
  CHATBOT_WIDGET_TOOLTIP_CONTAINER,
  CHATBOT_WIDGET_TOOLTIP_CONTENT,
} from '../../constants';
import { DealerOfferDetails } from '../../dealer/types';
import { h, moveTo } from '../../util';
import { bind, dispatch, connect, getState } from '../../store';
import { getTooltipFromOffer, isClosedTooltip } from '../../store/tooltip';
import { createTooltipTitle } from './TooltipTitle';
import { InitParams } from '../../types';
import { biTooltipClick, biTooltipClose, biTooltipLoad } from '../../bi';
import { IState } from '../../store/widget';

export type CreateTooltipParams = {
  params: InitParams;
  dealerOffer?: DealerOfferDetails;
};

export type UIState = {
  timeout: number | null;
};

const uiState: UIState = {
  timeout: null,
};

const PADDING = 15;

const stateUnsubscribers: (() => void)[] = [];
const clearSubscribers = () => {
  stateUnsubscribers.forEach((sub) => sub());
  stateUnsubscribers.length = 0;
};

export const updateTooltip = ({
  dealerOffer,
  params,
}: CreateTooltipParams): void => {
  const newTooltipNode = createTooltip({ dealerOffer, params });
  const oldTooltipNode = document.getElementsByClassName(
    CHATBOT_WIDGET_TOOLTIP_CONTAINER,
  )[0];
  const nextSibling =
    document.getElementsByClassName(CHATBOT_WIDGET_BUTTON_CONTAINER)[0] ||
    document.body.lastChild;

  if (oldTooltipNode) {
    oldTooltipNode.parentNode!.removeChild(oldTooltipNode);
  }

  if (newTooltipNode) {
    nextSibling.parentNode!.insertBefore(newTooltipNode, nextSibling);
  }
};

export const createTooltip = ({
  dealerOffer,
  params,
}: CreateTooltipParams): HTMLElement | undefined => {
  const dealerOfferPayloadTooltip = getTooltipFromOffer(dealerOffer);

  if (!dealerOfferPayloadTooltip) {
    return undefined;
  }

  const canShowTooltip = (state: IState = getState()): boolean => {
    const { expanded, tooltip, isActiveSession } = state;
    return (
      !isActiveSession &&
      !isClosedTooltip(
        params.tooltipCloseTimeout,
        tooltip,
        dealerOffer?.guid,
      ) &&
      !expanded
    );
  };

  const setTooltipTimeout = (ms: number): void => {
    uiState.timeout = window.setTimeout(() => {
      if (canShowTooltip()) {
        dispatch('widget/tooltip/open');
      }
    }, ms);
  };

  const clearTooltipTimeout = (): void => {
    if (uiState.timeout) {
      window.clearTimeout(uiState.timeout);
      uiState.timeout = null;
    }
  };

  clearSubscribers();
  clearTooltipTimeout();

  const {
    tooltipAppearanceAfterXSeconds,
    tooltipContent,
    tooltipTitle,
    tooltipCta,
  } = dealerOfferPayloadTooltip;

  const container = h('div', {
    class: CHATBOT_WIDGET_TOOLTIP_CONTAINER,
    'data-hook': 'chatbot-widget-tooltip-container',
  });

  const toggleTooltip = (isVisible: boolean): void => {
    const anchor = document.getElementsByClassName(
      CHATBOT_WIDGET_BUTTON_CONTAINER,
    )[0];
    const rect = anchor.getBoundingClientRect();
    moveTo({
      padding: PADDING,
      source: container,
      bottom: rect.bottom - 70,
      right: rect.right,
    });

    h(container, {
      style: { display: isVisible ? 'flex' : 'none' },
      'aria-hidden': isVisible,
    });
  };

  [
    createTooltipTitle({ tooltipTitle }),
    tooltipContent &&
      h('div', {
        class: CHATBOT_WIDGET_TOOLTIP_CONTENT,
        innerHTML: tooltipContent,
      }),
    tooltipCta?.value && h('button', { innerHTML: tooltipCta.key }),
  ]
    .filter(Boolean)
    .forEach((node) => container.appendChild(node as HTMLElement));

  setTooltipTimeout(Number(tooltipAppearanceAfterXSeconds) * 1000);

  stateUnsubscribers.push(
    bind('expanded', ({ expanded }) => {
      if (expanded) {
        toggleTooltip(false);
      }
    }),
  );

  stateUnsubscribers.push(
    connect('tooltip', (state) => {
      const isVisible = canShowTooltip(state);

      if (isVisible) {
        biTooltipLoad(state, dealerOfferPayloadTooltip);
      }

      toggleTooltip(isVisible);
    }),
  );

  stateUnsubscribers.push(
    connect('navigation', () => {
      clearTooltipTimeout();
      clearSubscribers();
      toggleTooltip(false);
    }),
  );

  container.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const state = getState();
    if (target.className === CHATBOT_WIDGET_TOOLTIP_CLOSE_ICON) {
      dispatch('widget/tooltip/close-all-pages');
      biTooltipClose(state, dealerOfferPayloadTooltip);
    } else {
      dispatch('widget/tooltip/close-per-offer', dealerOffer);
      dispatch('widget/toggle');
      biTooltipClick(state, dealerOfferPayloadTooltip);
    }
  });

  return container;
};
