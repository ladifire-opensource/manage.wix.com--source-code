import * as API_COMMON from '@wix/wix-payments-server/dist/src/exports/API/common';
import {ModuleRegistry} from 'react-module-container';
import {SupportedCountries} from '@wix/wix-payments-server/dist/src/constants/countries';
import {PaymentMethodStatus} from '@wix/cashier-common/dist/src/enums/payments/PaymentMethodStatus';
import {PaymentMethod} from '@wix/cashier-common/dist/src/enums/payments/PaymentMethod';
import {AxiosResponse} from 'axios';
import {getCurrentInstance} from '@wix/business-manager-api';
import {APP_DEF_ID} from '../app/constants';

const nonEssentialPaymentMethods = [PaymentMethod.Cash, PaymentMethod.InPerson];

const countryIso2ToIso3: {[key in SupportedCountries]: string} = {
  [SupportedCountries.US]: 'USA',
  [SupportedCountries.CH]: 'CHE',
  [SupportedCountries.BR]: '', // Brzail will load brazilian translations which won't be good
  [SupportedCountries.AT]: 'AUT',
  [SupportedCountries.BE]: 'BEL',
  [SupportedCountries.DE]: 'DEU',
  [SupportedCountries.ES]: 'ESP',
  [SupportedCountries.FI]: 'FIN',
  [SupportedCountries.FR]: 'FRA',
  [SupportedCountries.GB]: 'GBR',
  [SupportedCountries.IE]: 'IRL',
  [SupportedCountries.IT]: 'ITA',
  [SupportedCountries.LT]: 'LTU',
  [SupportedCountries.NL]: 'NLD',
  [SupportedCountries.PT]: 'PRT',
  [SupportedCountries.CA]: 'CAN',
};

const countryIso3ToIso2 = Object.entries(countryIso2ToIso3)
  .filter(([_iso2, iso3]) => !!iso3)
  .reduce((acc, [iso2, iso3]) => ({...acc, [iso3]: iso2}), {});

export type DealerOfferResponse = {
  offers: {
    offerGuid: string;
    offerName: string;
    asset: {
      id: string;
      payloadJson: string;
    };
  }[];
};

export type DealerOfferResponseTransformed = {
  offers: {
    offerGuid: string;
    offerName: string;
    asset: {
      id: string;
      payloadJson: string;
      payload: {
        value?: 'true' | 'false';
      };
    };
  }[];
};
const getDealerOffers = '/_api/dealer-offers-serving-service/v1/dealer/serving/offers';

const parseResponse = (response: AxiosResponse) => response.data;
const EXCLUSION_OFFERS_REAL_ESTATE_ID = 'bc2d4965-7e40-4147-8927-9e71d88da271';
const getUpgradeToPremuimExclusionOffers = (): Promise<DealerOfferResponseTransformed> =>
  window.axios
    .get(getDealerOffers, {
      params: {realEstateId: EXCLUSION_OFFERS_REAL_ESTATE_ID},
      headers: {
        Authorization: getCurrentInstance(APP_DEF_ID),
      },
    })
    .then(parseResponse)
    .then((data: DealerOfferResponse) => {
      const offers = (data.offers || []).map((offer) => {
        let payload = {};
        try {
          payload = JSON.parse(offer.asset.payloadJson);
        } catch {}
        return {
          ...offer,
          asset: {
            ...offer.asset,
            payload,
          },
        };
      });
      return {offers};
    })
    .catch((): any => ({offers: []}));

/**
 * Get initial data from a wix-payments-server to render
 * wix-payments-dashboard in BM
 */
export const getInitialData = async () => {
  try {
    const [wpCountry, {country: fallbackCountry}, methodsList, upgradeExclusionOffersResponse] = await Promise.all([
      ModuleRegistry.invoke('cashier.getWixPaymentsCountry'),
      ModuleRegistry.invoke('cashier.getMerchantInfo'), // FIXME - Cashier TRX hack PAY-3129
      ModuleRegistry.invoke('cashier.getPaymentMethods'),
      getUpgradeToPremuimExclusionOffers(),
    ]);

    const merchantCountry = countryIso3ToIso2[fallbackCountry];
    const isWpCountry = !!countryIso3ToIso2[fallbackCountry];
    const country = wpCountry && wpCountry.toLowerCase() !== SupportedCountries.BR ? wpCountry : merchantCountry;
    const lowerCaseCountry = (country || 'us').toLowerCase();

    const connectedMethods = methodsList.filter(
      (method: {id: PaymentMethod; status: PaymentMethodStatus}) =>
        !nonEssentialPaymentMethods.includes(method.id) && method.status === PaymentMethodStatus.CONNECTED,
    );

    const shouldUpgradeToPremium = !upgradeExclusionOffersResponse.offers.some(
      (offer) => offer.asset.payload.value === 'false',
    );

    // AQ is used for testing stuff and should be treated as US, therefore - this crutch
    // Contact @kyryloi/whomever is testing for more details
    const {data} = await window.axios.get(
      `/_api/wix-payments-server/${lowerCaseCountry}/${API_COMMON.Endpoints.Meta.GetInitialData}`,
    );
    return {
      ...data,
      connectedMethods,
      shouldUpgradeToPremium,
      isWpCountry,
    };
  } catch (e) {
    console.error('Error occured while initializing:', e);
  }
};
