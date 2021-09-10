import { SALES_WIDGET_ROOT } from '@data-hooks';
import React, { FC } from 'react';
import { useInstance, useModuleParams } from '@wix/yoshi-flow-bm';
import css from './sales-widget.component.scss';

export interface DealerViewerError {
  errorType: string;
  bannerLocationOnPage: string;
}

interface SalesWidgetComponentProps {
  onLoaded?(): void;
  onError(error: DealerViewerError): void;
  onNoMatchingOffers(): void;
  shouldRenderViewer: boolean;
  dealerRealEstateId: string;
  translationsUrl: string;
}

export const SalesWidgetComponent: FC<SalesWidgetComponentProps> = ({
  onLoaded,
  onError,
  onNoMatchingOffers,
  translationsUrl,
  shouldRenderViewer,
  dealerRealEstateId,
}) => {
  const { accountLanguage, metaSiteId } = useModuleParams();
  const instance = useInstance();
  const { DealerViewer } = window.wixReactDealerViewer;

  return shouldRenderViewer ? (
    <div data-hook={SALES_WIDGET_ROOT} className={css.root}>
      <DealerViewer
        translationsUrl={translationsUrl}
        locale={accountLanguage}
        signedInstance={instance}
        bannerPosition={dealerRealEstateId}
        metasiteGuid={metaSiteId}
        onDisplay={() => onLoaded?.()}
        onEmpty={onNoMatchingOffers}
        onError={onError}
        viewerUrl="" // typing issue, viewUrl shouldn't be required. dealer team is aware
      />
    </div>
  ) : null;
};
