import { IBMModuleParams } from 'yoshi-flow-bm-runtime';
import { Messages } from '@wix/wix-i18n-config';
import { DashboardWidgetData } from '@wix/dashboard-setup-common';
import { fetchTranslations } from '@src/i18n/fetch-translations';
import { fetchDashboardWidgetData } from '../dashboard-widget-data';
import { IViewMode } from '@wix/business-manager-api';
import { BrowserClient } from '@sentry/browser';
import { AxiosError } from 'axios';
import {
  FailedToFetchWidgetDataError,
  FailedToFetchTranslationsError,
} from '@src/errors/errors';
import { captureException } from '../sentry';

export interface InitialData {
  messages: Messages;
  widgetData: DashboardWidgetData | null;
}

let messagesCachedPromise: Promise<Messages>;
let widgetDataCachedPromise: Promise<DashboardWidgetData | null> | null;

export const fetchInitialData = async (
  moduleParams: IBMModuleParams,
  sentry: BrowserClient,
): Promise<InitialData> => {
  try {
    const [messages, widgetData] = await Promise.all([
      fetchMessages(moduleParams),
      fetchWidgetData(moduleParams, sentry),
    ]);

    return {
      messages,
      widgetData,
    };
  } catch (error) {
    captureException(sentry, error, moduleParams);
    throw error;
  }
};

export const clearWidgetDataCache = () => {
  widgetDataCachedPromise = null;
};

const fetchMessages = ({ config, accountLanguage }: IBMModuleParams) => {
  if (messagesCachedPromise) {
    return messagesCachedPromise;
  }

  messagesCachedPromise = fetchTranslations(
    config.topology.dashboardSetupTranslations,
    accountLanguage,
  ).catch((error) => {
    throw new FailedToFetchTranslationsError(error);
  });

  return messagesCachedPromise;
};

const fetchWidgetData = (
  moduleParams: IBMModuleParams,
  sentry: BrowserClient,
) => {
  if (widgetDataCachedPromise) {
    return widgetDataCachedPromise;
  }

  widgetDataCachedPromise = fetchDashboardWidgetData(
    moduleParams.viewMode as IViewMode,
  ).catch((error: AxiosError) => {
    clearWidgetDataCache();
    captureException(
      sentry,
      new FailedToFetchWidgetDataError(error),
      moduleParams,
    );

    return null;
  });

  return widgetDataCachedPromise;
};
