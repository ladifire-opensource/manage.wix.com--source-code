import { xhrPost } from './xhr-driver';
import {
  getCurrentPolicy,
  getConsentPolicyHeader,
  removeCookie,
} from './cookie-parser';
import {
  ConsentPolicy,
  ConsentPolicyManagerConfig,
  ConsentPolicyManagerInterface,
  ConsentDetails,
  PolicySuccessCallback,
  PolicyErrorCallback,
  PolicyDetails,
} from '..';
import { EVENT_NAMES, publishEvent } from './events';
import { DEFAULT_POLICY } from '../default-policies';
import { getAPIBase } from './api-utils';
import { isWix } from './utils';

const trimTrailingSlash = (str: string): string =>
  str.endsWith('/') ? str.slice(0, -1) : str;

const dispatchPolicyChangedEvent = (policy: any) => {
  publishEvent(EVENT_NAMES.CONSENT_POLICY_CHANGED, document, policy);
};

export class ConsentPolicyManager implements ConsentPolicyManagerInterface {
  private config: ConsentPolicyManagerConfig = {
    baseUrl: '',
  };
  //undocumented override of hostname for testing
  hostname = window.location.hostname;
  private initRan = false;

  private readonly getValidPolicy = (newPolicy: any): ConsentPolicy => {
    const resultPolicy: any = {};
    const { policy } = this.getCurrentConsentPolicy();
    if (typeof newPolicy === 'object') {
      Object.keys(DEFAULT_POLICY).forEach((policyKey) => {
        if (typeof newPolicy[policyKey] === 'boolean') {
          resultPolicy[policyKey] = newPolicy[policyKey];
        }
      });
    }
    return { ...policy, ...resultPolicy };
  };

  private readonly shouldTriggerConsentPolicyChanged = (
    config: ConsentPolicyManagerConfig,
  ) => {
    return (
      config.consentPolicy &&
      this.initRan &&
      this.getCurrentConsentPolicy().defaultPolicy &&
      JSON.stringify(config.consentPolicy) !==
        JSON.stringify(this.getCurrentConsentPolicy().policy)
    );
  };

  init = (options: ConsentPolicyManagerConfig | string) => {
    const config =
      typeof options === 'string'
        ? { baseUrl: options }
        : {
            baseUrl: options.baseUrl,
            consentPolicy: options.consentPolicy,
          } || {};

    if (config.consentPolicy) {
      config.consentPolicy = this.getValidPolicy(config.consentPolicy);
    }
    if (this.shouldTriggerConsentPolicyChanged(config)) {
      dispatchPolicyChangedEvent({
        defaultPolicy: true,
        policy: config.consentPolicy,
      });
    }
    this.initRan = true;
    this.config = { ...this.config, ...config };
    this.config.baseUrl = trimTrailingSlash(this.config.baseUrl || '');
  };

  setConsentPolicy = (
    policy: ConsentPolicy,
    successCallback?: PolicySuccessCallback,
    errorCallback?: PolicyErrorCallback,
  ) => {
    if (policy === void 0) {
      const err = 'setConsentPolicy: no policy sent as parameter';
      errorCallback && errorCallback(err);
      console.error(err);
    }
    const successCB = (data: string) => {
      try {
        const response: { consent: ConsentDetails } = JSON.parse(data);
        const updatedPolicyDetails: PolicyDetails = {
          defaultPolicy: false,
          policy: response.consent.policy,
        };
        const ts = response.consent.timestamp;
        if (ts) {
          updatedPolicyDetails.createdDate = new Date(ts);
        }
        dispatchPolicyChangedEvent(updatedPolicyDetails);
        successCallback && successCallback(updatedPolicyDetails);
      } catch (e) {
        errCB(e);
      }
    };

    const errCB = (details: any) => {
      errorCallback &&
        errorCallback(`Failed setting policy. details: ${details}`);
    };

    const policyString = JSON.stringify({
      policy: { ...this.getValidPolicy(policy), essential: true },
      location: location.href,
      ...(this.config.baseUrl ? { baseUrl: this.config.baseUrl } : {}),
    });

    const embedsAPI = (window as any).wixEmbedsAPI;
    const authorization =
      !isWix() &&
      embedsAPI &&
      embedsAPI.getAppToken &&
      embedsAPI.getAppToken('22bef345-3c5b-4c18-b782-74d4085112ff');

    xhrPost(
      getAPIBase(this.config.baseUrl),
      successCB,
      errCB,
      policyString,
      authorization,
    );
  };

  getCurrentConsentPolicy = () =>
    getCurrentPolicy(this.hostname, this.config.consentPolicy);

  resetPolicy() {
    const cookieRemoved = removeCookie(this.config.baseUrl || '');
    if (cookieRemoved) {
      setTimeout(() => {
        //Magic number to allow cookie clearing
        dispatchPolicyChangedEvent(this.getCurrentConsentPolicy());
      }, 5);
    }
    return cookieRemoved;
  }

  _getConsentPolicyHeader = () =>
    getConsentPolicyHeader(this.hostname, this.config.consentPolicy);
}
