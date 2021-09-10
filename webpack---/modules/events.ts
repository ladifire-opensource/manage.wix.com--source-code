// @ts-ignore
const isIE = !!document.documentMode;
/**
 * Publishes a custom event when there is CPU time
 * @param eventName - the name of the custom event
 * @param publishingNode - on which Dom node to dispatch it (window / document ...)
 * @param eventData - the detail of the event, will be available under detail
 */
function publishEvent(eventName: string, publishingNode: Node, eventData: any) {
  let customEvent: any;
  if (isIE) {
    customEvent = document.createEvent('CustomEvent');
    customEvent.initCustomEvent(eventName, true, true, eventData);
  } else {
    customEvent = new CustomEvent(eventName, { detail: eventData });
  }
  if (publishingNode && publishingNode.dispatchEvent) {
    setTimeout(() => {
      // Don't want to disrupt the standard loading flow
      // @ts-ignore
      publishingNode.dispatchEvent(customEvent);
    }, 0);
  }
}

export const eventNames = {
  TAG_MANAGER_LOADED: 'TagManagerLoaded',
  TAGS_LOADING: 'LoadingTags',
  TAG_LOADED: 'TagLoaded',
  TAG_LOAD_ERROR: 'TagLoadError',
};

export { publishEvent };
