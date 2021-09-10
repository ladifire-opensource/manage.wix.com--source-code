export type DecodedSiteMediaToken = {
  metasiteId?: string;
  userId?: string;
};

export const decodeSiteMediaToken = (token: string): DecodedSiteMediaToken => {
  const b64 = token ? token.split('.')[2] : null;
  const decoded = b64 ? atob(b64) : '{}';
  try {
    const json = JSON.parse(decoded);
    return JSON.parse(json.data);
  } catch (e) {
    return {};
  }
};
