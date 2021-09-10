import { AngularLazyComponent } from 'react-module-container';

const angular = (window as any).angular;

export default class InvoicesAppNgComp extends AngularLazyComponent {
  constructor(props) {
    super(props, {
      files: InvoicesAppNgComp.getFiles(props),
      module: 'quotesApp',
      component: 'invoices-app',
      prepare: () => InvoicesAppNgComp.prepare(props)
    });
  }

  static prepare(props) {
    const {
      routesWhiteList,
      onMainNavigation,
      biOrigin,
      config: { topology },
      debug
    } = props;

    return fetch('/_api/wix-laboratory-server/laboratory/conductAllInScope?scope=my-account')
    .then(r => r.json())
      .then(({ data: experiments }) => {
        angular
          .module('quotesRoute')
          .constant('routesWhiteList', routesWhiteList)
          .constant('invoiceV2BiOrigin', biOrigin)
          .value('onMainNavigation', onMainNavigation)
          .config([
            'experimentManagerProvider',
            experimentManagerProvider => {
              experimentManagerProvider.setExperiments(experiments);
            }
          ]);
        angular
          .module('quotesApp')
          .constant('clientTopology', topology)
          .constant('DEBUG', debug)
          .constant('DONT_PUBLISH_FEDOPS_FROM_INVOICES', true)
          .config([
            'fedopsLoggerProvider',
            fedopsLoggerProvider => {
              fedopsLoggerProvider.setDisableAutoLoadFinish();
              fedopsLoggerProvider.setAppName('invoices');
            }
          ])
          .config([
            '$provide',
            '$locationProvider',
            ($provide, $locationProvider) => {
              const prefix = /invoices|quotes/;
              $locationProvider.html5Mode(true);
              $provide.decorator('$browser', ['$delegate', $delegate => {
                $delegate.baseHref = () =>
                  location.pathname.substring(0, location.pathname.match(prefix).index);
                return $delegate;
              }]);
            }
          ])
          .factory('verticalInfo', () => {});
      });
  }

  static getFiles({
    config: {
      topology: { invoicesStaticsUrl: base }
    },
    locale,
    debug
  }) {
    const debugPath = debug ? 'concat/' : '';
    return [
      [
        `${base + debugPath}scripts/bzm-modules.js`,
        `${base + debugPath}scripts/scripts.js`,
        `${base + debugPath}scripts/migration.js`
      ],
      `${base}scripts/locale/bzm-messages_${locale}.js`,
      `${base}modules/main.css`,
      `${base}bower_components/angular-material/angular-material.css`,
      `${base}bower_components/wix-style/dist/styles/main.css`
    ];
  }
}
