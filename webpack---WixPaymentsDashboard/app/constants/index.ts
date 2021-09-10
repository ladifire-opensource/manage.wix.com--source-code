const appDefIds = {
  cashier: '14bca956-e09f-f4d6-14d7-466cb3f09103',
  wixPaymentsDashboard: '42b081e6-c404-434f-a958-975864968d52',
};

export {ServerErrors} from './serverErrors';

export const FEDOPS_LOGGER_ID = 'wix-payments-dashboard';
export const CREATE_ACCOUNT_ROUTE = '/complete-setup';

export const KB_MULTIPLIER = 1000;
export const MB_MULTIPLIER = 1000000;

export const MAX_SHAREHOLDERS_WITH_SHARE = 4; // min share - 25%, so 4 shareholders max
export const MIN_SHAREHOLDERS_WITH_POSITION = 1;

export const UNIFIED_CHAT_ORIGIN = 'WixPayments';
export const UNIFIED_CHAT_VERTICAL_OFFSET = 48;

export const APP_DEF_ID = appDefIds.cashier; // TODO use appDefIds.wixPaymentsDashboard when available

export const TRANSACTION_DISPUTE_MAX_DOCUMENTS = 10;
export const TRANSACTION_DISPUTE_EVIDENCE_WARNING_DAYS = 7;

export enum AmbassadorBaseUrls {
  MerchantService = '/_api/merchant-service',
  TransactionService = '/_api/transaction-service',
  AtlasService = '/wix-atlas-service-web',
}

export enum DocumentsError {
  DOCUMENT_ALREADY_UPLOADED = 'DocumentAlreadyUploaded',
  DUPLICATE_DOCUMENTS = 'DuplicateDocuments',
}

export enum OnboardingType {
  NEW = 'new',
  OLD = 'old',
}

export enum ActionType {
  CLICK = 'click',
  SHOW = 'show',
}

export enum ContactCustomerCareReferral {
  WP_ACCOUNT_SETTINGS = 'WP_ACCOUNT_SETTINGS',
  WP_ACCOUNT_CLOSED_MODAL = 'WP_ACCOUNT_CLOSED_MODAL',
  WP_ACCOUNT_SUSPEND_MODAL = 'WP_ACCOUNT_SUSPEND_MODAL',
  WP_KYC_VERIFICATION_MODAL = 'WP_KYC_VERIFICATION_MODAL',
  WP_PROCESS_VERIFICATION_MODAL = 'WP_PROCESS_VERIFICATION_MODAL',
  WP_KYC = 'WP_KYC',
  WP_CHARGEBACK = 'WP_CHARGEBACK',
  WP_KYC_SAVE_AS_DRAFT_FAILED = 'WP_KYC_SAVE_AS_DRAFT_FAILED',
  WP_UPLOAD_DOCUMENT_FAILED = 'WP_UPLOAD_DOCUMENT_FAILED',
}
