import * as React from 'react';
import { FontUpgrade, TextButton, EmptyState } from 'wix-style-react';
import { withTranslation, WithTranslation } from '@wix/wix-i18n-config';
import * as styles from './style.scss';
import { getSupportForContributorsUrl } from '../../utils/getSupportForContributorsUrl';
import { openInANewTab } from '../../services/navigationServices';
import { IViewMode } from '@wix/business-manager-api';
import { sendBusinessManagerBI } from '../../services/BIService';
import { BIEvents } from '../../../common/consts/bi';

const sitesListUrl = 'https://www.wix.com/account/sites';
export const setHref = (url) => window.location.href = url;

export type NoPermissionsPageBiParams = {
  msid: string;
  hosting: IViewMode;
};

type Props = WithTranslation & {
  locale: string;
  biParams: NoPermissionsPageBiParams;
};

class NoPermissionsPageComp extends React.PureComponent<Props> {

  componentDidMount(): void {
    this.firePermissionsPageBi({
      evid: BIEvents.ErrorPageLoad,
      error_location: 'business-manager-no-permission'
    });
  }

  firePermissionsPageBi = (extraParams) => {
    const { msid, hosting } = this.props.biParams;
    sendBusinessManagerBI({
      msid,
      hosting,
      error_name: 'permission',
      ...extraParams
    });
  }

  onLearnMoreClick = () => {
    this.firePermissionsPageBi({
      evid: BIEvents.ErrorPageClick,
      error_location: 'business-manager-no-permission-learn-more'
    });

    openInANewTab(getSupportForContributorsUrl(this.props.locale));
  }

  onSeeSitesClick = () => {
    this.firePermissionsPageBi({
      evid: BIEvents.ErrorPageClick,
      error_location: 'business-manager-no-permission-go-to-mysites'
    });

    setHref(sitesListUrl);
  }

  render() {
    const { t } = this.props;
    return (
      <div className={styles.noPermissionsPageWrapper}>
        <FontUpgrade>
          <EmptyState
            theme="page-no-border"
            image={<div className={styles.noPermissionsImage}/>}
            subtitle={
              <div>
                <span className={styles.noPermissionsSubtitle}>{t('no-permissions-to-work-on-site')}</span>
                <TextButton
                  dataHook="learn-more-button"
                  underline="always"
                  onClick={this.onLearnMoreClick}>{t('no-permissions-learn-more-message')}
                </TextButton>
              </div>
            }
          >
            <TextButton
              dataHook="see-sites-button"
              onClick={this.onSeeSitesClick}
            >
              {t('see-all-sites-cta')}
            </TextButton>
          </EmptyState>
        </FontUpgrade>
      </div>
    );
  }
}

export const NoPermissionsPage = withTranslation()(NoPermissionsPageComp);
