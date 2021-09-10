import { biWidgetLoaded } from '../bi';
import { createWidgetButton } from '../components/WidgetButton';
import { createTooltip, updateTooltip } from '../components/WidgetTooltip';
import { DealerOfferDetails } from '../dealer/types';
import { dispatch } from '../store';
import { IState } from '../store/widget';
import { InitParams } from '../types';
import { addGlobalStyles } from '../util/add-global-styles';
import { widgetChannel } from '../util/widgetChannel';
import { mount } from './mount';

let rendered = false;

export type RenderWidgetState = Omit<IState, 'unreadCount'>;

export const renderWidget = (
  state: RenderWidgetState,
  params: InitParams,
  dealerOffer?: DealerOfferDetails,
): void => {
  biWidgetLoaded({
    state,
    initParams: params,
    dealerOfferId: dealerOffer?.guid,
  });

  // widget is already running
  if (rendered) {
    // TODO: we should update the state instead,
    // and tooltip component should subscribe and re-render
    updateTooltip({ dealerOffer, params });
    return;
  }

  dispatch('widget/ready', state);
  window.addEventListener('message', widgetChannel);
  mount([
    createTooltip({ dealerOffer, params }),
    createWidgetButton({ dealerOffer }),
  ]);
  addGlobalStyles();
  rendered = true;
};
