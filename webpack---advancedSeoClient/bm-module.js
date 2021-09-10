import { ModuleRegistry, ReactLazyComponent } from 'react-module-container';
import * as bm from '@wix/business-manager-api';
import SeoSidebarComponentHOC from './bm-app-standalone';

import {
  COMPONENT_LAZY_ID,
  COMPONENT_ID,
  METHOD_SHOW,
  METHOD_HIDE,
  SEO_SIDEBAR_STANDALONE,
} from './constants';

class SeoSidebarLazyComponent extends ReactLazyComponent {
  constructor(props) {
    const seo = ModuleRegistry.getModule(bm.ModuleId.PromoteSeo);
    const {
      debug,
      config: {
        topology: { advancedSeoClientStaticsUrl },
      },
    } = seo._moduleParams;
    super(props, {
      files: [
        `${advancedSeoClientStaticsUrl}bm-entry.bundle${
          debug ? '' : '.min'
        }.js`,
      ],
      component: COMPONENT_ID,
      resolve: () => ({ ...props, locale: props.accountLanguage }),
    });
  }
}

ModuleRegistry.registerComponent(
  COMPONENT_LAZY_ID,
  () => SeoSidebarLazyComponent,
);

ModuleRegistry.registerComponent(
  SEO_SIDEBAR_STANDALONE,
  () => SeoSidebarComponentHOC,
);

ModuleRegistry.registerMethod(METHOD_SHOW, () => (componentProps) => {
  bm.openSidePanel({
    componentName: COMPONENT_LAZY_ID,
    componentProps,
    size: bm.SidePanelSize.LARGE,
    backdrop: true,
  });
});

ModuleRegistry.registerMethod(METHOD_HIDE, () => () => {
  bm.closeSidePanel();
});
