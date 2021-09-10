import {reportSentryError} from '@wix/dealer-common/dist/src/services/SentryReporter/SentryReporter';

// qa in wix need way to exclude lightboxes - this is the best solution
export function shouldDisableLB(experiments: any): boolean {
  if (experiments?.['specs.dealerClient.ExcludeDealerLightbox'] === 'true') {
    return true;
  }

  try {
    const automationCookieValue = getCookieValue('automation');
    return !!automationCookieValue;
  } catch (e) {
    reportSentryError(e, {reportingClass: 'shouldDisableLB'});
    return false;
  }
}

export function shouldIgnoreViewLimits(experiments: any): boolean {
  return experiments?.['specs.dealerClient.IgnoreLightboxLimits'] === 'true';
}

function getCookieValue(cookieName: string) {
  const match = document.cookie.match('(^|;)\\s*' + cookieName + '\\s*=\\s*([^;]+)');
  return match ? match.pop() : '';
}
