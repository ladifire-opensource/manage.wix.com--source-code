import * as angular from 'angular';
import {RegionsList} from './services/regionsListFactory';
import {IMediaItem} from '@wix/wixstores-dashboard-storemanager-common/dist/src/common/definitions/mediaItemDef';
import {DiscountTypeEnum} from '@wix/wixstores-dashboard-storemanager-common/dist/src/common/definitions/discountTypeEnum';
import {ICountry} from '@wix/wixstores-dashboard-storemanager-common/dist/src/common/definitions/countriesDef';
import {ICommand} from '@wix/ecommerce-sf-sm-common/dist/src/typings/commands';

export enum ShippingRuleType {
  FREE_SHIPPING = 'free' as any,
  FLAT_RATE = 'flat' as any,
  WEIGHT_RANGE = 'weight_range' as any,
  PRICE_RANGE = 'price_range' as any,
  NO_SHIPPING = 'no_shipping' as any,
  RTC = 'rtc' as any,
  STORE_PICKUP_ONLY = 'pickup_only' as any,
  RATE_PER_PRODUCT = 'product_group' as any,
  NO_RULE = 'no_rule' as any,
}

export enum ShippingCarrierType {
  FEDEX = 'fedex' as any,
  USPS = 'usps' as any,
  UPS = 'ups' as any,
  CORREIOUS = 'correios' as any,
}

export enum PackageType {
  BOX = 'Box' as any,
  ENVELOP = 'Envelope' as any,
}

export enum TaxRuleType {
  NO_TAX = 'no_rule' as any,
  FLAT_RATE = 'flat' as any,
  BY_LOCATION = 'by_location' as any,
}

export enum ShippingMethodComposerAlignment {
  LEFT = 'left' as any,
  RIGHT = 'right' as any,
}

export interface ICommonRule {
  id: string;
  countries: ICountry[];
}

export interface IShippingRule extends ICommonRule {
  options: IShippingOptionView[];
  ruleType?: ShippingRuleType;
  handlingFee?: IHandlingFee;
  pickupOption?: IStorePickupShippingOptionView;
  carrierPackageInfo?: ICarrierUserPackage;
  mainPackageId?: string;
  carrierType?: ShippingCarrierType;
  fallbackOption?: IFallbackOption;
  shippingFromAddress?: IShippingAddress;
  name?: string;
  enabled?: boolean;
  carrierServices?: string[];
}

export interface IShippingOption {
  id: string | number;
  title: string;
  deliveryTime: string;
}

export interface IFallbackOption extends IShippingOption {
  rate?: number;
}

export interface IRateByShippingGroup {
  rates: {[groupId: string]: number};
}

export interface InstalledShippingApp {
  id: string;
  title: string;
  description: string;
  logo: string;
  openAppLink: string;
}

export interface AppData {
  id: string;
  title: string;
  description: string;
  logo: string;
  openAppLink: string;
  isAssociated: boolean;
}

export interface IShippingOptionView extends IShippingOption {
  ratesByRange?: IRangedRate[];
  ratesPerGroup?: IRateByShippingGroup;
  pickupInfo?: IShippingOptionViewPickupInfo;
  serviceType?: string;
  rateAdjustment?: IShippingOptionRateAdjustment;
  freeShippingAbove?: number;
}

export interface IShippingOptionRateAdjustment {
  delta: number;
  adjustmentType: DiscountTypeEnum;
}

export interface ICarrierUserPackage {
  id: string;
  packageType: string;
  carrierType?: ShippingCarrierType;
  maxItems?: number;
  dimension?: IShippingPackageDimensions;
  name?: string;
}

export interface IDimensionsLimitations {
  heightMax: number;
  heightMin: number;
  widthMax: number;
  widthMin: number;
  lengthMax: number;
  lengthMin: number;
}

export interface IShippingPackageDimensions {
  width: number | string;
  height: number | string;
  length: number | string;
}

export interface IFlatRateShippingCommandOption extends IShippingOption {
  rate: number;
}

export interface IStorePickupShippingOptionView extends IShippingOptionView {
  pickupInfo: IShippingOptionViewPickupInfo;
}

export interface IShippingOptionViewPickupInfo {
  instructions: string;
  pickupAddress?: IShippingDeliveryAddress;
}

export interface IStorePickupDeliveryCommandOption {
  id: string | number;
  title: string;
  instructions: string;
  deliveryTime?: string;
  pickupAddress?: IShippingDeliveryAddress;
}

export interface IPickupShippingMethodView {
  methodTitle: string | number;
  deliveryTime: string;
  instructions: string;
  pickupAddress?: IShippingDeliveryAddress;
  shouldShowDeleteButton?: boolean;
}

export interface IRateByGroup {
  id: string;
  title: string;
  rate: {tooltip?: string};
}

export interface IRateByProductMethodView {
  methodTitle: string | number;
  deliveryTime: string;
  rateSymbol: string;
  ratesByGroups: IRateByGroup[];
}

export interface IShippingAddress {
  addressLine: string;
  city: string;
  country: string;
  subdivision?: string;
  zipCode: string;
}

export type IShippingDeliveryAddress = IShippingAddress;

export interface IRangedRate {
  from: number;
  rate: number;
}

export interface ISelectEntry {
  id: string;
  code: string;
  text: string;
}

export interface IRegionSelectScopeOptions {
  disabled?: boolean;
}

export interface IRegionSelectScope extends angular.IScope {
  regions: RegionsList;
  selection: RegionsList;
  disabled?: RegionsList;
  addRegionDisabled?: boolean;
  isInputFocused?: boolean;
  onChange(params: Object);
  onBlur();
  vm: any;
  opts?: IRegionSelectScopeOptions;
  name?: string;
}

export interface IRegionSelectChoiceScope extends IRegionSelectScope {
  choiceVm: any;
}

export interface IDestination {
  destinationId: string;
  name: string;
  enabled: boolean;
  locations: RegionsList;
  shipping: IShipping;
  numLocalDeliveries?: number;
  isLocalDeliveryOptionsModified?: boolean;
  isLocalPickupOptionModified?: boolean;
  isLocalPickupFormValid?: boolean;
  getPickupCommand?(): ICommand;
  onSaveEventListeners?: Function[];
  pickupOptionInProgress?: IStorePickupShippingOptionView;
}

export interface IShipping {
  rule: IShippingRule;
  availableCarriers?: ICarrier[];
}

export interface ICarrier {
  carrierType: ShippingCarrierType;
  displayName: string;
  logo: IMediaItem;
  services: ICarrierService[];
  packageTypes: ICarrierPackageType[];
  unavailableCountries?: string[];
  learnMoreUrl: string;
  supportDomestic: boolean;
  supportInternational: boolean;
  mandatoryPackageDimensions: boolean;
  rtcLearnMoreData: IRtcLearnMoreData;
  carrierInfo: ICarrierInfo;
}

export interface ICarrierInfo {
  dimensionsRequirementText: string;
  mainPackageExplanation: string;
}

export interface IRtcLearnMoreData {
  kbLearnMoreTitle: string;
  kbLearnMoreDescription: string;
  kbLearnMoreUrl: string;
  kbLearnMoreDisclaimer: string;
  kbLearnMoreUrlText: string;
}

export interface ICarrierService {
  title: string;
  key: string;
  description: string;
  learnMoreUrl?: string;
  isInternational?: boolean;
}

export interface ICarrierPackageType {
  title: string;
  key: string;
  isCustom: boolean;
  image?: IMediaItem;
  description: string;
  dimension?: IShippingPackageDimensions;
  packageType?: PackageType;
  dimensionsLimitations?: IDimensionsLimitations;
  mandatoryPackageDimensions?: boolean;
}

export interface IDestinationData {
  destinations: IDestination[];
  initShippingInfo?: IInitShippingInfo;
  shippingFrom?: IShippingAddress;
  shipmentSettings?: IShipmentSettings;
}

export interface IShippingData {
  rules: IShippingRule[];
  rtc: {
    initShippingInfo?: IInitShippingInfo;
    shippingFrom?: IShippingAddress;
    shipmentSettings?: IShipmentSettings;
  };
}

export interface IShipmentSettings {
  fallbackWeightPerProduct?: number;
  carrierToUserPackages: ICarrierToUserPackages;
}

export interface ICarrierToUserPackages {
  [key: string]: ICarrierUserPackage[];
}

export interface IInitShippingInfo {
  shippingCarriers: ICarrier[];
}

export interface IHandlingFee {
  isActive: boolean;
  rate: number;
}

export interface IShippingMethodComposerSymbolAlignmentPair {
  symbol: string;
  alignment: ShippingMethodComposerAlignment;
}

export interface IShippingMethodComposerRangeConfig extends IShippingMethodComposerSymbolAlignmentPair {
  regexRestrict?: string;
  title: string;
  tooltip?: string;
  startValue?: string;
}

export interface IShippingMethodComposerRateConfig extends IShippingMethodComposerSymbolAlignmentPair {
  readOnly?: boolean;
  tooltip?: string;
}

export interface IShippingMethodComposerShippingGroupsConfig {
  groups: IShippingGroup[];
  shouldDisplayFirstTimeHelper: boolean;
}

export interface IShippingMethodComposerConfigs {
  range?: IShippingMethodComposerRangeConfig;
  rate: IShippingMethodComposerRateConfig;
  shippingGroups?: IShippingMethodComposerShippingGroupsConfig;
}

export interface IShippingGroup {
  id: string;
  name: string;
  isDefault?: boolean;
}

export interface IDefaultShippingGroup extends IShippingGroup {
  id: string;
  name: string | null;
}

export interface IUserShippingGroup extends IShippingGroup {
  id: string;
  name: string;
}

export interface IShippingGroups {
  defaultGroup: IDefaultShippingGroup;
  userDefinedGroups: IUserShippingGroup[];
  rateCalculationSetting: ShippingGroupsRateCalculationSettingType;
}

export interface IShippingGraphqlApiResponse {
  shippingProductGroups: {
    defaultGroup: IDefaultShippingGroup;
    userDefinedGroups: IUserShippingGroup[];
  };
}

export enum ShippingGroupsRateCalculationSettingType {
  APPLY_RATE_TO_EACH_PRODUCT = 'APPLY_RATE_TO_EACH_PRODUCT',
  APPLY_RATE_ONCE_PER_GROUP = 'APPLY_RATE_ONCE_PER_GROUP',
  APPLY_HIGHEST_RATE_ONCE = 'APPLY_HIGHEST_RATE_ONCE',
}
