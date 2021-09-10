import { BrowserClient, Scope } from '@sentry/browser';
import { AxiosError } from 'axios';

export interface SentryMetaData {
  userId: string;
  metaSiteId: string;
}

export interface SentryFailedRequestMetadata {
  xSeenBy: string;
  requestId: string;
  status: string;
  message: string;
}

export function failedToLoadLayoutFromDealer(
  sentryClient: BrowserClient,
  axiosError: AxiosError,
  sentryMetaData: SentryMetaData,
) {
  const requestMetadata: SentryFailedRequestMetadata = {
    xSeenBy: axiosError.response?.headers?.['x-seen-by'] || '',
    requestId: axiosError.response?.headers?.['x-wix-request-id'] || '',
    status: axiosError.response?.status?.toString() || '',
    message: axiosError.message,
  };

  const statusMessage = requestMetadata.status
    ? `STATUS - ${requestMetadata.status} - ${requestMetadata.message}`
    : 'no response from server';
  const errorMessage = `Fetch widgets layout from dealer failed: ${statusMessage}, ${axiosError.message}`;

  logSentry(sentryClient, errorMessage, sentryMetaData, requestMetadata);
}

export function failedToLoadLayoutFromCache(
  sentryClient: BrowserClient,
  cacheError: Error,
  sentryMetaData: SentryMetaData,
) {
  logSentry(
    sentryClient,
    `Fetch widgets layout from cache failed: ERROR - ${cacheError}`,
    sentryMetaData,
  );
}

export function widgetMissingFromDefinitions(
  sentryClient: BrowserClient,
  sentryMetaData: SentryMetaData,
  widgetId: string,
) {
  logSentry(sentryClient, `Missing definition for ${widgetId}`, sentryMetaData);
}

const logSentry = (
  sentryClient: BrowserClient,
  message: string,
  sentryMetaData: SentryMetaData,
  requestMetadata?: SentryFailedRequestMetadata,
) => {
  sentryClient.captureException(
    message,
    undefined,
    createSentryScope(sentryMetaData, requestMetadata),
  );
};

export const createSentryScope = (
  sentryMetaData: SentryMetaData,
  requestMetadata?: SentryFailedRequestMetadata,
): Scope => new Scope().setTags({ ...sentryMetaData, ...requestMetadata });
