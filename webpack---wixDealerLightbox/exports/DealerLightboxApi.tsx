import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {LightboxResolver} from '../services/LightboxResolver';
import {LightboxStorage} from '../services/LightboxStorage';
import {LazyLightbox} from '../lazy/LazyLightbox';

import {BannerData, OnClickParams} from '@wix/dealer-common/dist/src/interfaces';

import {BANNER_INIT} from '@wix/dealer-common/dist/src/services/BiLogger/bi-events';
import {BiLogger} from '@wix/dealer-common/dist/src/services/BiLogger';
import {ReportOfferEventsParams} from '@wix/dealer-client-api/dist/src/types';
import {ServerApi} from '@wix/dealer-client-api/dist/src/ServerApi';
import {reportSentryError} from '@wix/dealer-common/dist/src/services/SentryReporter/SentryReporter';
import {shouldDisableLB, shouldIgnoreViewLimits} from './petriChecks';

export interface DealerLightboxApiProps {
  translationsUrl: string;
  dealerOptions?: any;
  locale?: string;
  onView?: Function;
  onClick?: Function;
  onClose?: Function;
  location: string;
  metasiteGuid?: string;
  signedInstance?: string;
  viewerUrl: string;
}

export class DealerLightboxApi {
  async initLightbox(props: DealerLightboxApiProps) {
    const {location, metasiteGuid, signedInstance, locale} = props;

    try {
      new BiLogger().log(BANNER_INIT, true, {}, locale, metasiteGuid, null, location);

      const lightboxStorage = new LightboxStorage(location);
      const lightboxResolver = new LightboxResolver(lightboxStorage);

      const excludeList = lightboxStorage.isEssentialRealEstate()
        ? await lightboxResolver.calculateExcludedLightboxesWithoutAnyLb()
        : [];

      const {experiments, banners} = await ServerApi.getDealerDataNew({
        bannerPositions: [location],
        excludeLightboxes: excludeList,
        metasiteGuid,
        signedInstance,
        limit: 50,
      });

      const bannerAssets = banners.map(b => b.asset);

      const lightboxes = shouldIgnoreViewLimits(experiments)
        ? bannerAssets
        : await lightboxResolver.filterAnyLb(bannerAssets);

      const lightbox = lightboxes[0];

      const getOfferEventsParams = (
        type: 'VIEW' | 'MAIN_CTA_CLICK' | 'CLOSE',
      ): ReportOfferEventsParams => ({
        signedInstance,
        request: {
          event: {
            offerId: lightbox?.lightboxGuid,
            assetId: lightbox?.bannerId,
            realEstateId: location,
            type,
          },
        },
      });

      const onView = async () => {
        props.onView?.({offerId: lightbox.lightboxGuid});
        await ServerApi.reportOfferEvent(getOfferEventsParams('VIEW'));
      };

      const onClick = async (params: OnClickParams) => {
        props.onClick?.({params});
        const reportParams = getOfferEventsParams('MAIN_CTA_CLICK');
        reportParams.request.event.mainCtaClick = {
          targetUrl: params.additionalLogParams?.targetUrl,
        };
        await ServerApi.reportOfferEvent(reportParams);
      };

      const onClose = async () => {
        props.onClose?.();
        const reportParams = getOfferEventsParams('CLOSE');
        await ServerApi.reportOfferEvent(reportParams);
      };

      if (lightbox && !shouldDisableLB(experiments)) {
        this.renderLightbox({...props, onView, onClick, onClose}, lightbox, lightboxStorage);
      }
    } catch (e) {
      reportSentryError(e, {
        reportingClass: 'DealerLightboxApi',
        msId: metasiteGuid,
        realEstateId: location,
      });
    }
  }

  private readonly renderLightbox = (
    props: DealerLightboxApiProps,
    lightbox: BannerData,
    lightboxStorage: LightboxStorage,
  ) => {
    ReactDOM.render(
      <LazyLightbox
        bannerPosition={props.location}
        locale={props.locale}
        metasiteGuid={props.metasiteGuid || ''}
        translationsUrl={props.translationsUrl}
        dealerOptions={props.dealerOptions}
        signedInstance={props.signedInstance}
        onView={props.onView}
        onClose={props.onClose}
        onClick={props.onClick}
        lightbox={lightbox}
        viewerUrl={props.viewerUrl}
        lightboxStorage={lightboxStorage}
      />,
      DealerLightboxApi.createLightboxContainerOnBody(),
    );
  };

  static createLightboxContainerOnBody() {
    const styles = {
      position: 'absolute',
      'z-index': '99999999',
    };
    const dealerDiv = document.createElement('div');
    dealerDiv.setAttribute('id', 'react-lightbox');
    Object.assign(dealerDiv.style, styles);
    const body = document.querySelector('body');
    body.appendChild(dealerDiv);
    return dealerDiv;
  }
}
