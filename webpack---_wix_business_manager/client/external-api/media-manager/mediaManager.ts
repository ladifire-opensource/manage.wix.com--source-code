declare const MediaManagerApi: any;
declare const window: any;

/**
 * Creation of singleton mediaManager facade for use with Media iFrame
 * This is the integration of media frame, WOW facade for it
 * API Reference is here:
 * https://github.com/wix-private/santa-core/tree/master/media-manager-api#business-manager-integration
 *
 * The binding of this code into module registry is done through this script:
 * https://static.parastorage.com/unpkg/media-manager-api@1.94.0/dist/business-manager-integration.js
 * @param {string} mediaToken
 * @param {string} userLanguage
 * @returns {any}
 */
export const configureMediaManager = (mediaToken: string, userLanguage: string) => {
  if (!window['MediaManagerApi']) {
    return;
  }

  window.mediaManager = MediaManagerApi.create({
    version: 'G6',
    languageCode: userLanguage,
    siteMediaToken: mediaToken,
    origin: MediaManagerApi.origins.BUSINESS_MANAGER
  });
};
