import {attachEnableDebugHandler} from './Logger';
import {MediaFrame} from './MediaFrame';
import {MediaManagerVersion} from './MediaFrame/MediaFrame.types';
import {EventHandler} from './WindowMessenger/WindowMessenger.types';
import {Selection} from './constants';
import {EDITORX, WIXCOM} from './constants/domains';

attachEnableDebugHandler();

export function createMediaFrame(): MediaFrame {
  const domain = location.hostname.indexOf('editorx.com') !== -1 ? EDITORX : WIXCOM;

  return new MediaFrame({
    version: MediaManagerVersion.G5,
    versionDefaults: {
      [MediaManagerVersion.G5]: {
        mediaGalleryBaseHost: `https://${domain}/media-manager/g5/`,
      },
      [MediaManagerVersion.G6]: {
        mediaGalleryBaseHost: `https://${domain}/media-manager/g6/`,
      },
    },
  });
}

export {MediaFrame, EventHandler, Selection};
