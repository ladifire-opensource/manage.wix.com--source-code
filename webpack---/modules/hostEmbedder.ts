import { embedScript } from '../dom-manipulation/scriptEmbedder';
import { Tag } from '../types';
import { eventNames, publishEvent } from './events';
import { createTagCallBack } from '../utils/callbackUtils';
import { addLoadedTag, addLoadErrorTag, setLoading } from './stateCache';

function applyHostEmbeds(hostEmbeds: Tag[]) {
  setLoading(hostEmbeds);
  publishEvent(eventNames.TAGS_LOADING, window as any, hostEmbeds);

  hostEmbeds.forEach((embed: Tag) => {
    embedScript(
      embed.sourceUrl,
      createTagCallBack(eventNames.TAG_LOADED, embed.name, embed, addLoadedTag),
      createTagCallBack(
        eventNames.TAG_LOAD_ERROR,
        embed.name,
        embed,
        addLoadErrorTag,
      ),
    );
  });
}

export { applyHostEmbeds };
