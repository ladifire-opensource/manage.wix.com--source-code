// @ts-ignore
import { ModuleRegistry } from 'react-module-container';

export const GET_GMB_ACCESS_TOKEN = 'marketing-integration.getGMBAccessToken';

export const ERROR_CODES = {
  SERVICE_INITIALIZATION_FAILED: 'SERVICE_INITIALIZATION_FAILED',
  USER_NOT_LOGGED_IN: 'USER_NOT_LOGGED_IN',
};

export class GmbApiError extends Error {
  // @ts-ignore
  constructor(private code: string, message: string) {
    super(message);
  }
}

export const getGMBAccessToken = (): Promise<string> =>
  ModuleRegistry.invoke(GET_GMB_ACCESS_TOKEN);
