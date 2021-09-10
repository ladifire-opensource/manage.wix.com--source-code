import * as React from 'react';
import * as s from '../SearchBox.scss';
import { Text } from 'wix-style-react';
import { connect } from 'react-redux';
import { sendBISeeAllClicked } from '../../../actions/bi';
import { TFunction } from '@wix/wix-i18n-config';
import { getViewAllLinkText } from './view-all-link-text';
import { ISectionVisibleResults } from '../../../services/bi/send-bi-events';
import { ISectionsPaging, IStoreState } from '../../../types/store';
import { GotoActionMethod } from '../Entries/goto-actions';

export interface IProps {
  id: string;
  value: string;
  type: string;
  index: number;
  locale: string;
  indexInSection: number;
  sectionIndex: number;
  sectionsPaging: ISectionsPaging;
  getSectionVisibleOptionsCount: () => ISectionVisibleResults;
  showMoreAction: GotoActionMethod;
  sendBISeeAllClicked: (section: string, sectionIndex: number, sectionVisibleResults: ISectionVisibleResults, sectionsPaging: ISectionsPaging) => void;
  t: TFunction;
}

class SearchResultTitleComponent extends React.PureComponent<IProps> {

  onSeeAllClicked = () => {
    this.props.sendBISeeAllClicked(this.props.type, this.props.sectionIndex, this.props.getSectionVisibleOptionsCount(), this.props.sectionsPaging);
    this.props.showMoreAction(this.props.locale);
  }

  render() {
    const { id, type, index, indexInSection, value, showMoreAction, t } = this.props;

    return (
      <span data-id={id}
            data-type={type}
            data-index={index}
            data-index-in-section={indexInSection}
            data-hook="search-everything-section-title">
        <span className={s.optionIcon}></span>
        <span className={s.optionValue}>
          <span className={s.resultTitle}>
            <Text secondary={true} size="small" skin="standard" weight="thin">{value}</Text>
          </span>
          {showMoreAction &&
          <span style={{ float: 'right' }}>
            <Text dataHook={'see-more-' + type} onClick={this.onSeeAllClicked} size="tiny"><a href="#">{getViewAllLinkText(t, type)}</a></Text>
          </span>}
        </span>
      </span>
    );
  }
}

const mapStateToProps = (state: IStoreState) => ({
  sectionsPaging: state.searchStore.sections,
  locale: state.locale
});

export const SearchResultTitle = connect(mapStateToProps, { sendBISeeAllClicked })(SearchResultTitleComponent);
