import * as uuid from 'uuid/v4';
import * as format from 'string-template';

const parseStringIfNeeded = (maybeString) => typeof maybeString === 'string' ? JSON.parse(maybeString) : maybeString;
const isAppMarketInEditorLink = (tipRecievedData) => !tipRecievedData.startsWith || tipRecievedData.startsWith('{');
const getAppMarketLink = ({ editorSiteId, msid, esi, appDefId }) => `https://editor.wix.com/html/editor/web/renderer/edit/${editorSiteId}?metaSiteId=${msid}&editorSessionId=${esi}&openpanel=market:appDefId:${appDefId}`;

export const getTipExternlLink = (editorSiteId, msid, tipRecievedData) => {
  if (isAppMarketInEditorLink(tipRecievedData)) {
    const { appDefId } = parseStringIfNeeded(tipRecievedData);
    return getAppMarketLink({ editorSiteId, msid, esi: uuid(), appDefId });
  }
  return format(tipRecievedData, { editorSiteId, msid, esi: uuid() });
};
