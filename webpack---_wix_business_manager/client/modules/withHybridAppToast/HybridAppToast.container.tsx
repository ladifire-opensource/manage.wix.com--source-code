import { connect } from 'react-redux';
import { fetchApps } from '../../actions/appsActions';
import { IState } from '../../types/store';
import { shouldShowToast } from '../../selectors/hybridAppToastSelectors';
import HybridAppToast from './HybridAppToast';
import * as URI from 'urijs';
import { showToast, removeToast } from '../../actions/toastActions';
import { getMetaSiteId } from '../../selectors/siteMetaDataSelectors';
import { getEditorType, getLiveSiteEditUrl, getEditorSiteId } from '../../selectors/liveSiteSelectors';

const getEditUrl = (editUrl, appDefId) =>
  URI(editUrl)
  .addSearch('etpa', appDefId)
  .toString();

export default function WithHybridAppToastContainer(wrappedComponent, appDefId) {

  function mapStateToProps(state: IState) {
    const editLinkProps = {
      metaSiteId: getMetaSiteId(state),
      editorSiteId: getEditorSiteId(state),
      editUrl: getEditUrl(getLiveSiteEditUrl(state), appDefId),
      origin: 'hybrid toast',
      place: 'add app button',
      editorType: getEditorType(state)
    };
    return {
      shouldShowToast: shouldShowToast(state, appDefId),
      wrappedComponent,
      ...editLinkProps
    };
  }

  return connect(mapStateToProps, {
    showToast,
    removeToast,
    fetchApplications: fetchApps
  })(HybridAppToast);
}
