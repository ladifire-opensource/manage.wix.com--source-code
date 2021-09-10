import * as mediaManager from '@wix/media-manager';
import * as _ from 'lodash';

export function executeMediaGalleryWorkAround() {
  const fakeWix: any = {
    Settings: {
      openMediaDialog: mediaManager.openMediaDialog,
      MediaType: mediaManager.MEDIA_TYPES
    },
    SuperApps: {
      Dashboard: {
        openMediaDialog: mediaManager.openMediaDialog
      }
    },
    Utils: {
      Media: {
        getImageUrl: mediaManager.getImageUrl,
        getResizedImageUrl: mediaManager.getResizedImageUrl,
        setDialogi18nCode: mediaManager.setDialogi18nCode
      }
    }
  };

  window['Wix'] = _.merge(fakeWix, window['Wix'] || {});
}
