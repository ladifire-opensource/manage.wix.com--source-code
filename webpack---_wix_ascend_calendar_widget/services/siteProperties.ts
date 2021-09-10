import {
  PropertiesReadRequest,
  PropertiesReadResponse,
  SitePropertiesService,
} from '@wix/ambassador-site-properties-service/http';

import { HTTP_CLIENT_CONFIG } from '../components/constants';

export const BASE_URL_SITE_PROPERTIES = '/_api/site-properties-service';
import { appDefIds, getCurrentInstance } from '@wix/business-manager-api';
import { WeekStartingDay } from '../internal-types';

const Service = SitePropertiesService(
  BASE_URL_SITE_PROPERTIES,
  HTTP_CLIENT_CONFIG,
);

const getSiteProperties = (
  request: PropertiesReadRequest,
): Promise<PropertiesReadResponse> => {
  const headers = {
    Authorization: getCurrentInstance(appDefIds.promoteHome),
  };

  return Service.SitePropertiesV4()(headers).read(request);
};

export const getweekStartingDay = async (): Promise<WeekStartingDay> => {
  const responce = await getSiteProperties({
    fields: { paths: ['locale'] },
  });

  const startDay = calcualteweekStartingDay(
    `${responce?.properties?.locale?.country}`,
  );

  return startDay;
};

const calcualteweekStartingDay = (country: string) =>
  [
    'DZ',
    'AR',
    'BS',
    'BZ',
    'BT',
    'BR',
    'CA',
    'CL',
    'CN',
    'CO',
    'CR',
    'DO',
    'EC',
    'EG',
    'SV',
    'GT',
    'HN',
    'HK',
    'ID',
    'IQ',
    'IL',
    'JM',
    'JP',
    'JO',
    'KE',
    'KW',
    'LY',
    'MO',
    'MX',
    'NI',
    'OM',
    'PA',
    'PE',
    'PH',
    'PR',
    'QA',
    'SA',
    'ZA',
    'GS',
    'CH',
    'SY',
    'AE',
    'VU',
    'YE',
    'US',
    'ZW',
  ].includes(country)
    ? 'SUN'
    : 'MON';
