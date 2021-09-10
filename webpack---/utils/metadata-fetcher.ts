import { formatString } from './format';
import { authorizationHeaderKey, providersMetadataEndpoint } from './api-constants';
import { MethodsMetadataMap, ProvidersMetadataMap, MetadataMap } from '../data/modules/metaData.module';
import { AxiosResponse } from 'axios';
import { appDefIds, getCurrentInstance } from '@wix/business-manager-api';
import { Experiment } from '../enums/Experiment';
import { ProviderMetadataDTO, MethodMetadataDTO } from '../types/api/metadata-v1';

interface FetchMetadataParams {
  axios: any;
  locale: string;
  country: string;
  experiments?: Experiment[];
}

interface MetadataEndpointResponse extends AxiosResponse {
  data: {
    providers: ProviderMetadataDTO[];
    methods: MethodMetadataDTO[];
  };
}

export const createProvidersMap = (metadataProviders: ProviderMetadataDTO[]): ProvidersMetadataMap =>
  metadataProviders.reduce(
    (providers, provider: ProviderMetadataDTO) => ({
      ...providers,
      [provider.id]: provider,
    }),
    {},
  );

export const createMethodsMap = (metadataMethods: MethodMetadataDTO[] = []): MethodsMetadataMap =>
  metadataMethods.reduce(
    (acc, method: MethodMetadataDTO) => ({
      ...acc,
      [method.id]: method,
    }),
    {} as MethodsMetadataMap,
  );

export const doFetchMetadata = async ({
  locale,
  country,
  axios,
}: FetchMetadataParams): Promise<{ data: MetadataMap }> => {
  const signedInstance = getCurrentInstance(appDefIds.cashier);
  const endpoint = formatString(providersMetadataEndpoint, { country, locale });
  // Real data
  return axios
    .get(endpoint, {
      headers: {
        [authorizationHeaderKey]: signedInstance,
      },
    })
    .then((response: MetadataEndpointResponse) => ({
      ...response,
      data: {
        providers: createProvidersMap(response.data.providers),
        methods: createMethodsMap(response.data.methods),
      },
    }));
};
