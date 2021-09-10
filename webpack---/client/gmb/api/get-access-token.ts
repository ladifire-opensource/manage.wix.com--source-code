import { ERROR_CODES, GmbApiError } from '../gmb-api';
import { Google } from '../services/google-async';

export const getGMBAccessToken = async (selector: string): Promise<string> => {
  let google: Google;
  try {
    google = new Google(selector);
    await google.initGapi();
  } catch (_) {
    throw new GmbApiError(
      ERROR_CODES.SERVICE_INITIALIZATION_FAILED,
      'failed initializing gapi',
    );
  }
  const accessToken = await google.getUserAccessToken();
  if (!accessToken) {
    throw new GmbApiError(
      ERROR_CODES.USER_NOT_LOGGED_IN,
      'failed to authenticate google user',
    );
  }

  return accessToken;
};
