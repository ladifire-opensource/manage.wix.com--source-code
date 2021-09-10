import * as com from '../generated/proto';
import { PaymentProvider } from '../../enums/PaymentProvider';
import { PaymentMethod } from '../../enums/PaymentMethod';

export interface MethodMetadataDTO extends com.wix.payment.api.metadata.public.v1.MethodMetadataDTO {
  id: PaymentMethod;
}
export interface ProviderMethodMetadataDTO extends com.wix.payment.api.metadata.public.v1.ProviderMethodMetadataDTO {
  id: PaymentMethod;
  supportedCountries?: string[];
}
export enum ProviderMetadataRecommendationType {
  UNKNOWN = 'UNKNOWN',
  CBD = 'CBD',
}

export enum ConnectFieldType {
  STRING = 'STRING',
  COUNTRY = 'COUNTRY',
  CHECKBOX = 'CHECKBOX',
  DROPDOWN = 'DROPDOWN',
  RICH_TEXT = 'RICH_TEXT',
}

export interface ProviderMetadataRecommendation {
  recommendationType: ProviderMetadataRecommendationType;
}
export interface ProviderMetadataDTO
  extends Omit<com.wix.payment.api.metadata.public.v1.ProviderMetadataDTO, 'recommendations'> {
  id: PaymentProvider;
  methods?: ProviderMethodMetadataDTO[];
  recommendations?: ProviderMetadataRecommendation[];
}
export interface IconDTO extends com.wix.payment.api.metadata.public.v1.IconDTO {}
export interface OnboardingConnectManualInstallments extends com.wix.payment.api.metadata.public.v1.Installments {}
export interface OnboardingConnectManualField extends com.wix.payment.api.metadata.public.v1.Field {}
export interface ProviderMethodMetadataFees extends com.wix.payment.api.metadata.public.v1.Fees {}
export interface ProviderMethodMetadataFeesPercentAndFixedAmount
  extends com.wix.payment.api.metadata.public.v1.PercentAndFixedAmount {}
export interface ProviderMethodMetadataFeesPercentRange extends com.wix.payment.api.metadata.public.v1.PercentRange {}
export interface CurrencyDTO extends com.wix.payment.api.metadata.public.v1.CurrencyDTO {}
