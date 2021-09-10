import React from 'react';
import * as bm from '@wix/business-manager-api';
import { ModuleRegistry } from 'react-module-container';

const SeoSidebarComponentHOC = React.lazy(() => import('./bm-app-hoc'));

export default class SeoPanelStandalone extends React.Component {
  constructor(props) {
    super(props);
    const seo = ModuleRegistry.getModule(bm.ModuleId.PromoteSeo);
    this.moduleParams = seo._moduleParams;
  }

  render() {
    return (
      <React.Suspense fallback={this.props.loaderComponent || null}>
        <SeoSidebarComponentHOC {...this.props} {...this.moduleParams} />
      </React.Suspense>
    );
  }
}
