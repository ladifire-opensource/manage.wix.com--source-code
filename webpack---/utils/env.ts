const getEnvName = () => process.env.NODE_ENV || '';
export const isProduction = () => {
  const envName = getEnvName();
  return !['development', 'test'].includes(envName);
};
