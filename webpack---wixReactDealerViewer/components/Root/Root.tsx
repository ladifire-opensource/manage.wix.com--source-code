import * as React from 'react';
import { CmsElements } from '@wix/dealer-core/dist/src/components/CmsElements/CmsElements';
import { CmsError } from '@wix/dealer-core/dist/src/components/CmsElement/index';
import { reportSentryError } from '@wix/dealer-common/dist/src/services/SentryReporter/SentryReporter';
import { CmsElementItem } from '@wix/dealer-common/dist/src/interfaces';
import { reportError, CmsDataStore } from '@wix/dealer-store/dist/src';

export interface DealerRootProps {
  cmsDataStore: CmsDataStore;
  dealerOptions?: { [s: string]: string };
  loaded: boolean;
  onError(error: CmsError): void;
  onWarning?(error: CmsError): void;
  onView: Function;
  onClick: Function;
}

export class Root extends React.Component<DealerRootProps> {
  reportError = (errorObj: CmsError) => {
    reportError(
      {
        errorType: 'JSON',
        ...errorObj,
      },
      this.props.cmsDataStore.getBannerPosition(),
      this.props.onError,
    );
  };

  reportWarning = (errorObj: CmsError) => {
    this.props.onWarning?.({
      errorType: 'JSON',
      bannerLocationOnPage: this.props.cmsDataStore.getBannerPosition(),
      ...errorObj,
    });
  };

  render() {
    const {
      cmsDataStore,
      loaded,
      dealerOptions,
      onError,
      onView,
      onClick,
    } = this.props;
    let cmsElementItems: CmsElementItem[];
    if (loaded) {
      try {
        cmsElementItems = cmsDataStore.cmsElementItems();
      } catch (error) {
        reportSentryError(error, { reportingClass: 'Root.render' });
        if (onError) {
          this.reportError({
            error,
          });
        }
        cmsElementItems = [];
      }
    }

    return loaded ? (
      <CmsElements
        dealerOptions={dealerOptions}
        pageSettings={cmsDataStore.pageSettings}
        cmsElementContext={cmsDataStore.getContext()}
        cmsElementItems={cmsElementItems}
        onView={onView}
        biLogger={cmsDataStore.biLogger}
        locale={cmsDataStore.getLocale()}
        onClick={onClick}
        bannerPosition={cmsDataStore.getBannerPosition()}
        onClose={cmsDataStore.getOnClose()}
        metasiteId={cmsDataStore.getMetaSiteId()}
        signedInstance={cmsDataStore.getSignedInstance()}
        bannerRoot={cmsDataStore.getBannerRoot()}
        onError={this.reportError}
        onWarning={this.reportWarning}
      />
    ) : (
      <div data-hook="dealer-viewer-empty" />
    );
  }
}
