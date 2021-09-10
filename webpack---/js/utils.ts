import { BASE_DOMAINS } from './consts';

export function isSameDomain(
  candidate: string = '',
  hostname: string = '',
): boolean {
  return (
    hostname === candidate ||
    hostname.indexOf(`.${candidate}`) ===
      hostname.replace(`.${candidate}`, '').length
  );
}

export function isSameDomainBulk(domainsArray: string[], hostName: string) {
  return domainsArray.some((domain: string) => isSameDomain(domain, hostName));
}

export function isWix(hostname?: string) {
  return isSameDomainBulk(BASE_DOMAINS, hostname || location.hostname);
}

export function readCookieData(cookeName: string) {
  const regex = `[;\\s ]?${cookeName}=([\\S]+(?:;?))`;
  const cookieData = document.cookie.match(regex);
  return cookieData?.pop()?.replace(';', '') || void 0;
}