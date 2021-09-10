import { PaymentProvider } from './PaymentProvider';
import { PayoutFrequency } from '@wix/wix-payments-server';

export enum WixPaymentsStatus {
  PENDING = 'Pending',
  ACCEPTING_PAYMENTS = 'AcceptingPayments',
  ACTIVE = 'Active',
  SUSPENDED = 'Suspended',
  DENIED = 'Denied',
  NOT_ACTIVE = 'NotActive',
  UNDER_REVIEW = 'UnderReview',
  BLOCKED = 'Blocked',
}

export const FailedWixPaymentsStatuses = [
  WixPaymentsStatus.SUSPENDED,
  WixPaymentsStatus.DENIED,
  WixPaymentsStatus.NOT_ACTIVE,
  WixPaymentsStatus.UNDER_REVIEW,
  WixPaymentsStatus.BLOCKED,
];

export const WixPaymentsProviders: PaymentProvider[] = [PaymentProvider.WixPayBR, PaymentProvider.WixPayUS];

export type Schedule = {
  type: PayoutFrequency;
  frequency?: number;
};
