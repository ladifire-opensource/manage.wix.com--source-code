import { connect } from 'react-redux';
import { IState } from '../../types/store';
import { getViewMode } from '../../selectors/viewModeSelector';
import { getMetaSiteId } from '../../selectors/siteMetaDataSelectors';
import { getCurrentUserLanguage } from '../../selectors/currentUserSelectors';
import { NoPermissionsPage } from './NoPermissionsPage';

const mapStateToProps = (state: IState) => {
  return {
    locale: getCurrentUserLanguage(state),
    biParams: {
      msid: getMetaSiteId(state),
      hosting: getViewMode(state)
    },
  };
};

export default connect(mapStateToProps)(NoPermissionsPage);
