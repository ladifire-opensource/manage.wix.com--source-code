import { WixBiProfileWebapp } from '@wix/ambassador-wix-bi-profile-webapp/http';
import { ProfileDataResponse } from '@wix/ambassador-wix-bi-profile-webapp/types';
import _ from 'lodash';

export const BiProfileWebappBaseUrl = '/_api/wix-bi-profile-webapp';

interface Bla {
  [key: string]: string[];
}

export const FitnessFieldsToValues: Bla = {
  funnel_site_categories_industry_category: ['Fitness', 'sport_practice'],
  funnel_site_categories_main_type: ['Services', 'type_services'],
};

export const FitnessFields = Object.keys(FitnessFieldsToValues);
export const RestaurantsField = 'restaurants_detected_or_installed';

export interface IIndustryResponse {
  isFitness: boolean;
  isRestaurants: boolean;
}

export const getUserIndustry = async (
  userGuid: string,
  metasiteId: string,
): Promise<IIndustryResponse> => {
  const profileDataService = WixBiProfileWebapp(
    BiProfileWebappBaseUrl,
  ).ProfileDataService();

  const data = await profileDataService().get({
    userGuid,
    metasiteGuid: metasiteId,
    fields: [...FitnessFields, RestaurantsField],
  });

  let isFitness =
    validateFitnessField(FitnessFields[0], data) &&
    validateFitnessField(FitnessFields[1], data);

  const isRestaurants = validateRestaurantsField(data);

  if (isRestaurants && isFitness) {
    isFitness = false;
  }

  return {
    isFitness,
    isRestaurants,
  };
};

const validateFitnessField = (
  field: string,
  data: ProfileDataResponse,
): boolean => {
  const val = _.get(data, `fields.${field}.aSingleValue.aString`);
  return FitnessFieldsToValues[field].includes(val);
};

const validateRestaurantsField = (data: ProfileDataResponse): boolean => {
  const val = _.get(data, `fields.${RestaurantsField}`);
  return !!val;
};
