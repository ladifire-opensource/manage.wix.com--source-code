import { Module } from 'storeon';
import { biDragWidget, biCloseWidget, biOpenWidget } from '../bi';
import { CHATBOT_WIDGET_NOSCROLL } from '../constants';
import { DealerOfferDetails } from '../dealer/types';
import { ITooltipState } from './tooltip';
import { insertItem } from './util';

export type IPosition = {
  left: number;
  top: number;
  bottom: number;
  right: number;
};

export type NavigationState = {
  lastEvent: number;
};

export type IState = {
  lastUpdated: number;
  expanded: boolean;
  startUrl: string;
  unreadCount: number;
  isActiveSession: boolean;
  left?: number;
  top?: number;
  bottom?: number;
  right?: number;
  conversation_id?: string;
  node_id?: string;
  orig_page_name?: string;
  orig_platform?: string;
  lang?: string;
  referral: string | null;
  tooltip?: ITooltipState;
  navigation?: NavigationState;
};

export interface WidgetPayload {
  count: number;
  conversation_id?: string;
  node_id?: string;
  lang?: string;
}

export interface IEvents {
  'widget/ready': Omit<IState, 'lastUpdated' | 'unreadCount'>;
  'widget/toggle': never;
  'widget/position': IPosition;
  'widget/new': WidgetPayload;
  'widget/startUrl': IState['startUrl'];
  'widget/tooltip/open': never;
  'widget/tooltip/close-all-pages': never;
  'widget/tooltip/close-per-offer': DealerOfferDetails;
  'widget/tooltip/update': ITooltipState;
  'page/navigate': never;
}

export const widgetModule: Module<IState, IEvents> = ({ on }) => {
  on('@init', () => {
    return {
      lastUpdated: 0,
      expanded: false,
      chatBotUrl: '',
      unreadCount: 0,
      isActiveSession: false,
      node_id: '',
      conversation_id: '',
      lang: '',
      tooltip: {},
    };
  });

  on('widget/ready', (_, newState) => newState);

  on('widget/toggle', (oldState) => {
    const { expanded } = oldState;

    if (expanded) {
      document.body.classList.remove(CHATBOT_WIDGET_NOSCROLL);
      biCloseWidget(oldState);
    } else {
      document.body.classList.add(CHATBOT_WIDGET_NOSCROLL);
      biOpenWidget(oldState);
    }

    return {
      lastUpdated: Date.now(),
      expanded: !expanded,
      unreadCount: 0,
    };
  });

  on('widget/startUrl', (_, startUrl) => {
    return {
      lastUpdated: Date.now(),
      startUrl,
    };
  });

  on('widget/position', (oldState, position) => {
    biDragWidget(oldState, position);

    return {
      lastUpdated: Date.now(),
      left: position.left,
      top: position.top,
      right: position.right,
      bottom: position.bottom,
    };
  });

  on('widget/new', ({ unreadCount }, payload: WidgetPayload) => {
    const { count, conversation_id, node_id, lang } = payload;

    return {
      lastUpdated: Date.now(),
      unreadCount: unreadCount + count,
      isActiveSession: true,
      conversation_id,
      node_id,
      lang,
    };
  });

  on('widget/tooltip/open', (oldState) => {
    return {
      lastUpdated: Date.now(),
      tooltip: {
        ...oldState.tooltip,
        lastOpenAt: Date.now(),
      },
    };
  });

  on('widget/tooltip/close-all-pages', (oldState) => {
    return {
      lastUpdated: Date.now(),
      tooltip: {
        ...oldState.tooltip,
        closedAt: Date.now(),
      },
    };
  });

  on('widget/tooltip/close-per-offer', (oldState, offer) => {
    const perOffer = oldState.tooltip?.perOffer || [];
    const item = { closedAt: Date.now(), offerGuid: offer.guid };
    const perOfferIndex = perOffer.findIndex(
      ({ offerGuid }) => offer.guid === offerGuid,
    );

    // wait until closed-per-offer state expires
    if (perOfferIndex !== -1) {
      return {};
    }

    return {
      lastUpdated: Date.now(),
      tooltip: {
        ...oldState.tooltip,
        perOffer: insertItem(perOffer, { index: perOffer.length, item }),
      },
    };
  });

  on('widget/tooltip/update', (_, tooltip) => {
    return {
      lastUpdated: Date.now(),
      tooltip: { ...tooltip },
    };
  });

  on('page/navigate', (_) => ({
    navigation: {
      lastEvent: Date.now(),
    },
  }));
};
