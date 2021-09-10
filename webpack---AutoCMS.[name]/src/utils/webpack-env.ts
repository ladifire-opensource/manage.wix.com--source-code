export const isProduction = process.env.NODE_ENV === 'production';
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isMocha = process.env.IS_MOCHA;
export const isJest = process.env.IS_JEST;
export const isTesting = isMocha || isJest;
export const isBO = process.env.IS_BO;
