const minute = 60 * 1000;
const hour = 60 * minute;

export const REFRESH_SECURITY_MARGIN_MS = 30 * minute;
export const FALLBACK_INSTANCES_EXPIRATION_MARGIN_MS = 4 * hour - REFRESH_SECURITY_MARGIN_MS;
export const MINIMUM_REFRESH_TIMEOUT = 15 * minute;
