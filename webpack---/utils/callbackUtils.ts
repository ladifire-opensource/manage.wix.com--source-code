import { publishEvent } from '../modules/events';
import { removeLoadingTag } from '../modules/stateCache';
import { error } from './logger';

function runCallback(callback: Function | any, data?: any, async?: boolean) {
  const callbackOp = () => {
    try {
      if (typeof callback === 'function') {
        return callback(data);
      }
    } catch (e) {
      error(e);
    }
  };
  return async === true ? setTimeout(callbackOp, 0) : callbackOp();
}

/**
 * Creates a function callback to handle loading of a full tag
 * @param eventName
 * @param tagName
 * @param embed
 * @param storageMethod
 */
function createTagCallBack(
  eventName: string,
  tagName: string | any,
  embed: any,
  storageMethod: Function,
) {
  return () => {
    publishEvent(eventName, window as any, {
      tagName,
      embed,
    });
    storageMethod(embed);
    removeLoadingTag(embed.name);
  };
}

export { runCallback, createTagCallBack };
