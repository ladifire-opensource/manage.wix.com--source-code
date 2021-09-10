import { isNumber } from './index';
import { dispatch } from '../store';

const type = 'WIDGET_SUPPORT_CHATBOT';

const isBlocked = ({ origin, data }: MessageEvent): boolean => {
  if (process.env.NODE_ENV === 'development') {
    return false;
  }

  return (
    data?.type !== type &&
    (origin !== 'https://www.wix.com' || origin !== location.origin)
  );
};

export const widgetChannel = (ev: MessageEvent): void => {
  if (isBlocked(ev)) {
    return;
  }

  const { event, payload } = ev.data?.data || {};

  if (event === 'new') {
    const count = payload?.count;

    if (isNumber(count)) {
      dispatch('widget/new', {
        count,
        node_id: payload.node_id,
        lang: payload.lang,
        conversation_id: payload.conversation_id,
      });
    }
  }
};
