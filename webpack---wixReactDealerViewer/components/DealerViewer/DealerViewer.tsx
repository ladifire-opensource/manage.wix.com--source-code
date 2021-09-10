import * as React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';
import { Root } from '../Root/Root';
import { i18n as i18nType } from 'i18next';
import * as uuid from 'uuid/v4';
import * as css from './DealerViewer.scss';
import { create as fedopsLoggerFactory } from '@wix/fedops-logger';
import {
  DealerViewerProps,
  viewerDefaultProps,
  viewerPropTypes,
} from '../../interfaces';
import { CmsDataStore } from '@wix/dealer-store/dist/src';
import { BiLogger } from '@wix/dealer-common/dist/src/services/BiLogger';
import { reportSentryError } from '@wix/dealer-common/dist/src/services/SentryReporter/SentryReporter';
import { CmsError } from '@wix/dealer-core/dist/src/components/CmsElement/index';
import { ServerApi } from '@wix/dealer-client-api/dist/src/ServerApi';
import { ReportOfferEventsParams } from '@wix/dealer-client-api/dist/src/types';
import * as _get from 'lodash/get';
import {
  BANNER_INIT,
  BANNER_RENDERED,
  VIEW_EVENT,
} from '@wix/dealer-common/dist/src/services/BiLogger/bi-events';
import {
  calculateHeight,
  calculateWidth,
} from '@wix/dealer-common/dist/src/services/DimensionCalculator';
import {
  CmsStoreInitData,
  OnClickParams,
  OnViewParams,
} from '@wix/dealer-common/dist/src/interfaces';

export interface DealerViewerState {
  loaded: boolean;
  empty: boolean;
}

const { viewerUrl, ...propTypes } = viewerPropTypes;

export class DealerViewerComp extends React.Component<
  DealerViewerProps,
  DealerViewerState
> {
  static propTypes = { ...propTypes };
  static defaultProps = { ...viewerDefaultProps };
  static i18n: i18nType;

  private readonly requestGuid: string;

  private readonly cmsDataStore: CmsDataStore;
  private readonly biLogger: BiLogger;
  private hasError = false;

  constructor(props: DealerViewerProps) {
    super(props);
    this.state = {
      loaded: false,
      empty: false,
    };
    const fedopsLogger = fedopsLoggerFactory('react-dealer-viewer');
    this.biLogger = new BiLogger(props.additionalBiParams);
    const data: CmsStoreInitData = {
      bannerPosition: this.props.bannerPosition,
      locale: this.props.locale,
      metasiteGuid: this.getMetasiteGuid(this.props),
      signedInstance: this.props.signedInstance,
      onDisplay: this.props.onDisplay,
      onEmpty: this.props.onEmpty,
      onError: this.props.onError,
      translationsUrl: this.props.translationsUrl,
      fedopsLogger,
      banners: this.props.banner,
      biLogger: this.biLogger,
    };
    this.cmsDataStore = new CmsDataStore(data);
    this.requestGuid = uuid();
    this.log(
      BANNER_INIT,
      { requestGuid: this.requestGuid },
      { newEventStyle: true },
    );
  }

  private readonly getMetasiteGuid = (props: DealerViewerProps): string => {
    const metaSiteId = _get(
      props,
      'dealerOptions.metaSiteId',
      props.metaSiteId,
    );
    const metasiteGuid = _get(
      props,
      'dealerOptions.metasiteGuid',
      props.metasiteGuid,
    );
    return metaSiteId || metasiteGuid;
  };

  log = (
    eventId: number,
    additionalParams: { [key: string]: any } = {},
    { newEventStyle = true } = {},
  ) => {
    return this.biLogger.log(
      eventId,
      newEventStyle,
      additionalParams,
      this.cmsDataStore.getLocale(),
      this.cmsDataStore.getMetaSiteId(),
      this.cmsDataStore.getBannerRoot(),
      this.cmsDataStore.getBannerPosition(),
    );
  };

  async componentDidMount() {
    try {
      const { isEmpty } = await this.cmsDataStore.load();
      this.setState({ empty: isEmpty });
    } catch (e) {
      this.setState({ loaded: false });
      this.hasError = true;
      this.forceUpdate();

      if (e.message !== 'dealer-failed-to-load') {
        reportSentryError(e, {
          realEstateId: this.props.bannerPosition,
          msId: this.props.metaSiteId || this.props.metasiteGuid,
          locale: this.props.locale,
          dealerApiType: 'listOffers',
          reportingClass: 'DealerViewerComp.componentDidMount',
        });
        this.props.onError({
          error: e,
          bannerLocationOnPage: this.props.bannerPosition,
        });
      }

      return;
    }

    this.setState({ loaded: true }, () => {
      if (!this.hasError) {
        this.log(
          BANNER_RENDERED,
          { requestGuid: this.requestGuid },
          { newEventStyle: true },
        );

        this.props.onDisplay?.({
          isDisplayed: this.cmsDataStore.shouldShowBanner(),
          bannerLocationOnPage: this.cmsDataStore.getBannerLocation(),
          width: calculateWidth(
            this.cmsDataStore.pageSettings,
            this.cmsDataStore.getContext(),
          ),
          height: calculateHeight(
            this.cmsDataStore.pageSettings,
            this.cmsDataStore.getContext(),
          ),
        });
      }
    });
  }

  onDealerError = (errorObj: CmsError = {}) => {
    this.hasError = true;
    this.forceUpdate();
    this.props.onError?.(errorObj);
  };

  onDealerWarning = (errorObj: CmsError = {}) => {
    this.props.onWarning?.(errorObj);
  };

  getOfferEventsParams = (
    eventType: 'CLOSE' | 'VIEW' | 'MAIN_CTA_CLICK',
  ): ReportOfferEventsParams => {
    const banner = this.cmsDataStore.getBannerRoot();
    const offerId = banner && banner.lightboxGuid;
    const assetId = banner && banner.bannerId;
    const realEstateId = banner && banner.bannerPosition;

    return {
      signedInstance: this.props.signedInstance,
      request: {
        event: {
          offerId,
          assetId,
          realEstateId,
          type: eventType,
        },
      },
    };
  };

  createOnDealerView = (onView?: Function) => async (aboveTheFold: boolean) => {
    this.logBiView(aboveTheFold);
    const requestParams = this.getOfferEventsParams('VIEW');
    onView?.({ offerId: requestParams.request.event.offerId } as OnViewParams);

    await ServerApi.reportOfferEvent(requestParams);
  };

  createOnDealerClick = (onClick?: Function) => async (
    params: OnClickParams,
  ) => {
    const requestParams = this.getOfferEventsParams('MAIN_CTA_CLICK');
    requestParams.request.event.mainCtaClick = {
      targetUrl:
        params.additionalLogParams && params.additionalLogParams.targetUrl,
    };

    onClick?.({
      ...params,
      offerId: requestParams.request.event.offerId,
    } as OnClickParams);

    await ServerApi.reportOfferEvent(requestParams);
  };

  logBiView = (aboveTheFold: boolean) =>
    this.log(VIEW_EVENT, { aboveTheFold }, { newEventStyle: false });

  render() {
    const onDealerView = this.createOnDealerView(this.props.onView);
    const onDealerClick = this.createOnDealerClick(this.props.onClick);

    return (
      <span className={css.dealerViewer}>
        {!this.hasError && !this.state.empty ? (
          <Root
            dealerOptions={this.props.dealerOptions}
            cmsDataStore={this.cmsDataStore}
            loaded={this.state.loaded}
            onView={onDealerView}
            onClick={onDealerClick}
            onError={this.onDealerError}
            onWarning={this.onDealerWarning}
          />
        ) : (
          <span className={css.failedContainer} />
        )}
      </span>
    );
  }
}

export class DealerViewer extends React.Component<DealerViewerProps> {
  private static i18n: i18nType;

  static getI18n(locale: string, translationsUrl: string) {
    if (DealerViewer.i18n === undefined) {
      DealerViewer.i18n = i18n({ locale, baseUrl: translationsUrl });
    }

    return DealerViewer.i18n;
  }

  render() {
    return (
      <I18nextProvider
        i18n={DealerViewer.getI18n(
          this.props.locale,
          this.props.translationsUrl,
        )}
      >
        <DealerViewerComp {...this.props} />
      </I18nextProvider>
    );
  }
}
