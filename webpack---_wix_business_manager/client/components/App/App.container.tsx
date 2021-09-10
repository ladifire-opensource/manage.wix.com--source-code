import { connect } from 'react-redux';
import { App } from './App';
import { IState } from '../../types/store';
import { getIsInDashboard, getViewMode } from '../../selectors/viewModeSelector';
import { withGetInstanceId } from './withGetInstanceId';
import { getMetaSiteId, getSiteOwnerId, getSiteRolesString } from '../../selectors/siteMetaDataSelectors';
import { FullPageErrorPage } from '../ErrorPages/ErrorPages';
import { withErrorBoundary } from '@wix/business-manager-common-utils';
import { withFullPageRequests } from './withFullPageRequests';
import { getCurrentUserLanguage } from '../../selectors/currentUserSelectors';
import { selectOverlay } from '../../selectors/overlaySelectors';
import { experimentsSelectors } from '../../services/essentials';

const mapStateToProps = (state: IState) => ({
  siteId: getMetaSiteId(state),
  ownerId: getSiteOwnerId(state),
  rolesString: getSiteRolesString(state),
  viewMode: getViewMode(state),
  locale: getCurrentUserLanguage(state),
  showChatWidget: getIsInDashboard(state),
  showOverlay: selectOverlay(state),
  useOverlayComponent: experimentsSelectors(state).enabled('specs.wosbm.useNewOverlayComponent'),
  shouldAddGetBsiToLogger: experimentsSelectors(state).enabled('specs.wosbm.AddBsiManagerToLoggerDefaults')
});

const ComponentWithRedux = connect(mapStateToProps)(withGetInstanceId(App));
export default withErrorBoundary(FullPageErrorPage)(withFullPageRequests(ComponentWithRedux));
