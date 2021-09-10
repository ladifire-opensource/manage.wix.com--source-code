export type DecodedMetaSiteToken = {
  metaSiteId?: string;
  uid?: string;
};

export const decodeMetaSiteToken = (token: string): DecodedMetaSiteToken => {
  const b64 = token ? token.split('.')[1] : null;
  const decoded = b64 ? atob(b64) : '{}';
  try {
    return JSON.parse(decoded);
  } catch (e) {
    return {};
  }
};
