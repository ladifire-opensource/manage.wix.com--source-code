import Experiments from '@wix/wix-experiments';
import { ReactLazyComponent } from 'react-module-container';
import { IBMModuleParams } from './config';
import { sentryClient } from './services/sentryClient';
import { getAppInstance } from './utils/getAppInstance';
import { getMediaToken } from './utils/getMediaToken';
import {
  getUserIndustry,
  IIndustryResponse,
} from './services/biProfileService';
import { ExperimentNames } from './constants/ExperimentNames';

const experiments = new Experiments();
const minified = (debug: boolean) => (debug ? '' : '.min');

const files = ({ config, debug }: IBMModuleParams) => {
  const staticsUrl = config.topology.staticsUrl;
  return [
    `${staticsUrl}video-maker-home-app.bundle${minified(debug)}.js`,
    `${staticsUrl}video-maker-home-app${minified(debug)}.css`,
  ];
};

const _getUserIndustry = (
  userId: string,
  metaSiteId: string,
): Promise<IIndustryResponse> =>
  getUserIndustry(userId, metaSiteId).catch((e) => {
    sentryClient.captureException(e);
    return {
      isFitness: false,
      isRestaurants: false,
    };
  });

export default class VideoMakerHomeLazyComponent extends ReactLazyComponent<IBMModuleParams> {
  constructor(props: IBMModuleParams) {
    super(props, {
      files: files(props),
      component: 'video-maker-home-app',
      resolve: async () => {
        const {
          accountLanguage: locale,
          metaSiteId,
          config,
          userId,
        } = this.props;

        __webpack_public_path__ = config.topology.staticsUrl;

        const { translations, mediaToken, isFitness, isRestaurants } =
          await Promise.all([
            import(`./assets/locale/messages_en.json`),
            locale === 'en'
              ? undefined
              : import(`./assets/locale/messages_${locale}.json`),
            getMediaToken(getAppInstance()),
            experiments.load('video-maker-home'),
            experiments.conduct(ExperimentNames.NewThemesAndFonts, 'false'),
            _getUserIndustry(userId, metaSiteId),
          ]).then(
            ([
              enTranslation,
              currentTranslation,
              mediaTokenResponse,
              _,
              __,
              industryResponse,
            ]) => ({
              translations: {
                ...enTranslation,
                ...currentTranslation,
              },
              mediaToken: mediaTokenResponse,
              ...industryResponse,
            }),
          );

        return {
          ...this.props,
          mediaToken,
          metaSiteId,
          translations,
          experiments: experiments.all(),
          isFitness,
          isRestaurants,
        };
      },
    });
  }

  static prefetch(params: IBMModuleParams) {
    return files(params);
  }
}
