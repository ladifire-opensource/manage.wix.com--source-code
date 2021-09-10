import { connect } from 'react-redux';
import { SidePanel } from './SidePanel';
import { IState } from '../../types/store';
import { withSidePanelBi } from './SidePanel.bi';
import { getViewMode } from '../../selectors/viewModeSelector';
import { getMetaSiteId } from '../../selectors/siteMetaDataSelectors';

function mapStateToProps(state: IState) {
  return {
    metaSiteId: getMetaSiteId(state),
    viewMode: getViewMode(state)
  };
}

export default connect(mapStateToProps)(withSidePanelBi(SidePanel));
