import { PolicyDetails, ConsentPolicy } from '..';
import { DEFAULT_POLICY, WIX_EU_POLICY } from '../default-policies';
import { isWix, isSameDomain, readCookieData } from './utils';
import { BASE_DOMAINS, COOKIE_NAME } from './consts';

declare interface stringMap {
  [name: string]: string;
}

const mappingFromCookie: stringMap = {
  func: 'functional',
  anl: 'analytics',
  adv: 'advertising',
  dt3: 'dataToThirdParty',
  ess: 'essential',
};

export function getCookieHostParts(
  hostname: string,
): { host: string; path: string } {
  let host = '',
    path = '';

  BASE_DOMAINS.forEach((domain) => {
    if (isSameDomain(domain, location.hostname)) {
      host = `.${domain}`;
      path = '/';
    }
  });

  if (!host && !path) {
    host = location.hostname; //Free sites
    const pathParts = hostname.split(location.hostname);
    path = pathParts[1] ? `${pathParts[1]}` : '/';
    if (path === '/') {
      const hostParts = host.split('.'); //Not free sites
      hostParts.shift();
      host = `.${hostParts.join('.')}`;
    }
  }

  return {
    host,
    path,
  };
}

function removeCookie(baseUrl: string): boolean {
  const policy = getPolicyFromCookie();
  if (policy && !policy.defaultPolicy) {
    const { path, host } = getCookieHostParts(baseUrl);
    document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=${host}; path=${path};`;
    return true;
  }
  return false;
}

function getPolicyFromCookie() {
  const cookieData = readCookieData(COOKIE_NAME);
  if (!cookieData || typeof cookieData !== 'string') {
    return false;
  }

  let createdDate;
  const policy: any = {};
  try {
    const cookieJson = JSON.parse(decodeURIComponent(cookieData));
    Object.keys(mappingFromCookie).forEach((cookiePolicyKey) => {
      if (typeof cookieJson[cookiePolicyKey] === 'number') {
        const policyKey = mappingFromCookie[cookiePolicyKey];
        policy[policyKey] = cookieJson[cookiePolicyKey] === 1;
      }
    });

    createdDate = parseTimeStamp(cookieJson.ts);

    return {
      //TODO: REMOVE THIS HACK ONE PRODUCT EXPERIMENT ENDS - this is needed to support policy created by the test in the Tag Manager server
      defaultPolicy: !!cookieJson.temp,
      policy,
      createdDate,
    };
  } catch (e) {
    return false;
  }
}

export function parseTimeStamp(
  ts: string | number | undefined,
): Date | undefined {
  let createdDate;
  if (typeof ts === 'number') {
    createdDate = new Date(ts * 1000 * 60);
  }
  return createdDate;
}

function getCurrentPolicy(
  hostname: string,
  consentPolicy?: ConsentPolicy,
): PolicyDetails {
  const cookiePolicy = getPolicyFromCookie();
  if (cookiePolicy) {
    return cookiePolicy;
  }
  const policy = getDefaultPolicy(hostname, consentPolicy);
  return {
    defaultPolicy: true,
    policy,
  };
}

function getDefaultPolicy(hostname: string, consentPolicy?: ConsentPolicy) {
  return consentPolicy
    ? clone(consentPolicy)
    : clone(isWix(hostname) ? WIX_EU_POLICY : DEFAULT_POLICY);
}

function getConsentPolicyHeader(
  hostname: string,
  consentPolicy?: ConsentPolicy,
) {
  const policy = getCurrentPolicy(hostname, consentPolicy).policy;
  let somethingIsDenied = false;
  const raw = Object.keys(mappingFromCookie).reduce(
    (ret: { [name: string]: number }, key) => {
      const value = mappingFromCookie[key];
      //@ts-ignore
      const policyValue = policy[value];
      ret[key] = policyValue ? 1 : 0;
      if (!policyValue) {
        somethingIsDenied = true;
      }
      return ret;
    },
    {},
  );
  return somethingIsDenied
    ? { [COOKIE_NAME]: encodeURIComponent(JSON.stringify(raw)) }
    : {};
}

function clone(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}

export { getCurrentPolicy, getConsentPolicyHeader, removeCookie };
