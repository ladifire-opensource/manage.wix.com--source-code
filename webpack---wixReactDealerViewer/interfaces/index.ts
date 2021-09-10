import * as PropTypes from 'prop-types';
import { BannerData, Offer } from '@wix/dealer-common/dist/src/interfaces';
import { CmsError } from '@wix/dealer-core/dist/src/components/CmsElement/index';

export const viewerPropTypes: {
  [key: string]: any;
} = {
  translationsUrl: PropTypes.string.isRequired,
  viewerUrl: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
  bannerPosition: PropTypes.string.isRequired,
  brotherBannersLocations: PropTypes.arrayOf(PropTypes.string),
  metasiteGuid: PropTypes.string,
  signedInstance: PropTypes.string,
  metaSiteId: PropTypes.string,
  dealerOptions: PropTypes.object,
  onView: PropTypes.func,
  onDisplay: PropTypes.func,
  onClick: PropTypes.func,
  onError: PropTypes.func,
  onWarning: PropTypes.func,
  banners: PropTypes.object,
  debug: PropTypes.bool,
};

export const viewerDefaultProps = {
  debug: false,
  isLightbox: false,
};

export interface DealerViewerProps {
  bannerPosition: string;
  brotherBannersLocations?: string[];
  dealerOptions?: { [s: string]: string };
  metasiteGuid: string;
  metaSiteId?: string;
  signedInstance?: string;
  locale: string;
  translationsUrl: string;
  viewerUrl: string;
  additionalBiParams?: { [key: string]: string };
  banner?: BannerData;
  offer?: Offer;
  onDisplay?: Function;
  onView?: Function;
  onClick?: Function;
  onError?: Function;
  onWarning?(error: CmsError): void;
  onEmpty?: Function;
}
