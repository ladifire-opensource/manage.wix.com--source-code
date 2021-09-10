export function publishEvent(
  eventName: string,
  publishingNode: Node,
  eventData: any,
) {
  let customEvent: any;

  // @ts-ignore
  const isIE = !!document.documentMode;
  if (isIE) {
    customEvent = document.createEvent('CustomEvent');
    customEvent.initCustomEvent(eventName, true, false, eventData);
  } else {
    customEvent = new CustomEvent(eventName, {
      detail: eventData,
      bubbles: true,
    });
  }
  if (publishingNode && publishingNode.dispatchEvent) {
    publishingNode.dispatchEvent(customEvent);
  }
}

export const EVENT_NAMES = {
  CONSENT_POLICY_CHANGED: 'consentPolicyChanged',
  CONSENT_POLICY_MANAGER_READY: 'consentPolicyManagerReady',
};
