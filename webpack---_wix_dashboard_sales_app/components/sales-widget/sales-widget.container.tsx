import { DASHBOARD_DEALER_TOP_RIGHT_REAL_ESTATE_ID, FEDOPS_DEALER_FETCH_AND_SHOW } from '@consts';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useFedops, useModuleParams, useSentry } from '@wix/yoshi-flow-bm';
import { SalesWidgetComponent, DealerViewerError } from './sales-widget.component';
import { scopedSentry } from '@src/utils';

interface SalesWidgetProps {
  onLoaded?(): void;
}

export const getFailureError = (errorType: string = 'unknown') =>
  `Failed to present sales offers due to ${errorType} dealer-viewer error.`;

export const SalesWidget: FC<SalesWidgetProps> = ({ onLoaded }) => {
  const {
    config: { topology },
    metaSiteId,
    userId,
  } = useModuleParams();
  const [shouldRenderViewer, updateShouldRenderViewer] = useState(true);
  const sentry = useSentry();
  const fedops = useFedops();

  useEffect(() => {
    fedops.interactionStarted(FEDOPS_DEALER_FETCH_AND_SHOW);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderNothingAndSucceed = useCallback(() => {
    updateShouldRenderViewer(false);
    fedops.interactionEnded(FEDOPS_DEALER_FETCH_AND_SHOW);
    // eslint-disable-next-line no-unused-expressions
    onLoaded?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onLoaded]);

  const renderOfferAndSucceed = useCallback(() => {
    fedops.interactionEnded(FEDOPS_DEALER_FETCH_AND_SHOW);
    // eslint-disable-next-line no-unused-expressions
    onLoaded?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onLoaded]);

  const renderNothingAndFail = useCallback(
    (dealerError?: DealerViewerError) => {
      updateShouldRenderViewer(false);
      const exception = new Error(getFailureError(dealerError?.errorType));
      scopedSentry({ metaSiteId, userId, sentry }).captureException(exception);
      throw exception;
    },
    [sentry, metaSiteId, userId],
  );

  return (
    <SalesWidgetComponent
      onLoaded={renderOfferAndSucceed}
      onNoMatchingOffers={renderNothingAndSucceed}
      onError={renderNothingAndFail}
      shouldRenderViewer={shouldRenderViewer}
      translationsUrl={topology.dealerTranslationsStaticsUrl}
      dealerRealEstateId={DASHBOARD_DEALER_TOP_RIGHT_REAL_ESTATE_ID}
    />
  );
};
