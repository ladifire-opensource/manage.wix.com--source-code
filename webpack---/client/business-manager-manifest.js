import axios from 'axios';
import { ReactLazyComponent } from 'react-module-container';
import _ from 'lodash';
import Experiments from '@wix/wix-experiments';
import { getCurrentInstance, appDefIds } from '@wix/business-manager-api';

const files = ({ config, topology, locale, accountLanguage }) => {
  const promoteSeoStaticsUrl = (config.topology || topology)
    .promoteSeoStaticsUrl;

  const scripts = [
    'https://static.parastorage.com/unpkg/moment@2.13.0/min/moment.min.js',
    `${promoteSeoStaticsUrl}business-manager-component.bundle.min.js`,
    `${promoteSeoStaticsUrl}business-manager-component.min.css`,
  ];

  locale = locale || accountLanguage;
  if (locale && locale !== 'en') {
    scripts.push(
      'https://static.parastorage.com/unpkg/moment@2.13.0/min/moment-with-locales.min.js',
    );
  }

  return [scripts];
};

export default class PromoteSeoLazyComponent extends ReactLazyComponent {
  static prefetch(params) {
    return files(params);
  }

  constructor(props) {
    const manifest = {
      files: files(props),
      resolve: async () => {
        // PROM-877: We need to log event `56` as early as possible when we detect
        // that our application needs to be served.
        logSeoApplicationIsBeingServed(props.userId, props.metaSiteId);
        const propsWithExperiments = await fetchExperimentsData({
          ...props,
          locale: props.accountLanguage || 'en',
          instance: getCurrentInstance(appDefIds.promoteSeo),
        });

        const r = await fetchBiSiteProfile(props);
        const shouldShowFbAdsEP = showFbAdsEP(r);

        const isCoBranding = !!_.get(
          props,
          'coBranding.loggedInAccountBranding',
          false,
        );
        const shouldRemoveArenaEpForCoBranding =
          propsWithExperiments.experiments['specs.experts.ArenaEntryPoint'] ===
          'true';

        const isImpersonation = await fetchImpersonation();
        return {
          ...propsWithExperiments,
          shouldShowFbAdsEP,
          isImpersonation,
          isCoBranding,
          shouldRemoveArenaEpForCoBranding,
        };
      },
      component: 'PromoteSeo',
    };

    super(props, manifest);
  }
}

function logSeoApplicationIsBeingServed(userId, metaSiteId) {
  try {
    new Image().src = `//frog.wix.com/wix-promote?src=76&evid=56&uuid=${userId}&msid=${metaSiteId}&_=`;
  } catch (error) {}
}

const fetchExperiments = ({ instance = '' }) =>
  axios
    .get('/_api/promote-seo/experiments', {
      headers: { instance, Authrization: instance },
    })
    .then((response) => response.data);

const fetchExperimentsData = (props) =>
  fetchExperiments(props)
    .then((data) => ({
      ...props,
      experiments: data,
    }))
    .catch((error) => {
      console.error('Failed to fetch experiments with error:', error); // eslint-disable-line no-console
      return {
        ...props,
        experiments: {},
      };
    });

const showFbAdsEP = ({
  active_site_groups,
  seo_connect_to_google,
  fb_ads_created_fb_campaign,
} = {}) =>
  _.get(active_site_groups, 'manyValues.values', []).some(
    (curr) => curr.aString === 'ever_store_active',
  ) &&
  seo_connect_to_google &&
  !fb_ads_created_fb_campaign;

const fetchBiSiteProfile = async (props) => {
  const fields = [
    'active_site_groups',
    'seo_connect_to_google',
    'fb_ads_created_fb_campaign',
  ];
  const queryParams = fields.map((field) => `fields=${field}`).join('&');
  try {
    const response = await axios.get(
      `/_api/wix-bi-profile-webapp/v2/site/${props.userId}/${props.metaSiteId}?${queryParams}`,
    );
    return response.data.fields;
  } catch (err) {
    return console.error(err); // eslint-disable-line no-console
  }
};

const fetchImpersonation = async () => {
  const experiments = new Experiments({ scope: 'support-hack' });
  const specs = ['specs.support.LessCapabilitiesForSupportUser'];

  await experiments.ready();
  return specs.every((spec) => experiments.enabled(spec));
};
