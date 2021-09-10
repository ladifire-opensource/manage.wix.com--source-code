import { ConsentPolicyManager } from './js/consent-policy-manager';
import { publishEvent, EVENT_NAMES } from './js/events';
export * from './js/consent-policy-manager';

if (typeof window !== 'undefined') {
  window.consentPolicyManager = new ConsentPolicyManager();
  publishEvent(
    EVENT_NAMES.CONSENT_POLICY_MANAGER_READY,
    window as any,
    window.consentPolicyManager,
  );
}
