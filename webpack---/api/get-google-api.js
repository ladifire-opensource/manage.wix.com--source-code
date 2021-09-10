import GApiLoader from '@wix/gapi-loader';
import Experiments from '@wix/wix-experiments';

const experiments = new Experiments();
export const getGoogleApi = (selector) =>
  experiments
    .conduct('specs.promote-seo-tools.getGoogleApi', 'false')
    .then((specResult) =>
      specResult === 'true' ? GApiLoader.loadClient(selector) : window.gapi,
    )
    .catch(() => window.gapi);
