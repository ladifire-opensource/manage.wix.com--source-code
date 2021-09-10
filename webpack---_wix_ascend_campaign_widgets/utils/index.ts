export * from './navigation';

export const getReferralInfo = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('referralInfo') ?? '';
};
