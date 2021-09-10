import * as React from 'react';
import { withTranslation, WithTranslation } from '@wix/wix-i18n-config';
import { ErrorPage, ErrorPageThemes } from '@wix/business-manager-common-utils';
import { sendBusinessManagerBI } from '../../services/BIService';
import { BIEvents } from '../../../common/consts/bi';
import { IState } from '../../types/store';
import { connect } from 'react-redux';
import { getMetaSiteId } from '../../selectors/siteMetaDataSelectors';
import { getViewMode } from '../../selectors/viewModeSelector';
import { FontUpgrade } from 'wix-style-react';

interface CommonErrorPageProps extends WithTranslation {
  metaSiteId: string;
  viewMode: string;
  location: string;
  onClick: () => void;
  linkTextKey: string;
  titleKey: string;
  contentKey: string;
  theme: ErrorPageThemes;
}

interface BiParams {
  error_location: string;
  msid: string;
  hosting: string;
}

class BaseErrorPage extends React.Component<CommonErrorPageProps> {

  componentDidMount() {
    this.reportOnLoad();
  }

  getBiParams(): BiParams {
    const { location, metaSiteId, viewMode } = this.props;
    return { error_location: location, msid: metaSiteId, hosting: viewMode };
  }

  reportOnLoad() {
    sendBusinessManagerBI({ ...this.getBiParams(), evid: BIEvents.ErrorPageLoad });
  }

  reportBiOnClick() {
    sendBusinessManagerBI({ ...this.getBiParams(), evid: BIEvents.ErrorPageClick });
  }

  onClick() {
    this.reportBiOnClick();
    this.props.onClick();
  }

  render() {
    const { t, titleKey, contentKey, linkTextKey, theme } = this.props;
    return (
      <FontUpgrade>
        <ErrorPage titleText={t(titleKey)}
                   contentText={t(contentKey)}
                   linkText={t(linkTextKey)}
                   theme={theme}
                   onClick={() => this.onClick()}/>

      </FontUpgrade>);
  }
}

const mapStateToProps = (state: IState) => ({
  metaSiteId: getMetaSiteId(state),
  viewMode: getViewMode(state),
});

export default connect(mapStateToProps)(withTranslation()(BaseErrorPage));
