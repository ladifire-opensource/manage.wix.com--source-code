import * as React from 'react';
import * as s from './SearchResultShowMore.scss';
import { Text, TextButton } from 'wix-style-react';
import More from 'wix-ui-icons-common/MoreSmall';
import { connect } from 'react-redux';
import { extendSectionResults } from '../../../actions/search';
import { IStoreState, ISectionsPaging } from '../../../types/store';
import { ISectionVisibleResults } from '../../../services/bi/send-bi-events';
import { sendBIShowMoreClicked } from '../../../actions/bi';
import { withTranslation, TFunction } from '@wix/wix-i18n-config';

interface IProps {
  t: TFunction;
  id: string;
  type: string;
  query: string;
  index: number;
  indexInSection: number;
  sectionIndex: number;
  sectionsPaging: ISectionsPaging;
  getSectionVisibleOptionsCount: () => ISectionVisibleResults;
  sendBIShowMoreClicked?: (section: string, section_index: number, sectionVisibleResults: ISectionVisibleResults, sectionsPaging: ISectionsPaging) => Promise<void>;
  extendSectionResults?: (section: string) => void;
  displayedResults: number;
  availableResults: number;
}

class SearchResultShowMoreComponent extends React.PureComponent<IProps> {

  showMoreClicked = () => {
    const { type, sectionIndex, getSectionVisibleOptionsCount, sectionsPaging } = this.props;
    this.props.sendBIShowMoreClicked(type, sectionIndex, getSectionVisibleOptionsCount(), sectionsPaging);
    this.props.extendSectionResults(type);
  }

  getDisplayTitle = (xMoreResults) => {
    const { t, query } = this.props;

    const xMoreLabel = xMoreResults === 1 ? 'searchbox.section.show-1-more' : 'searchbox.section.show-x-more';

    return t(xMoreLabel, {
      ADDITIONAL_RESULTS: xMoreResults,
      QUERY_STRING: query
    });
  }

  render() {
    const { id, type, index, indexInSection, availableResults, displayedResults } = this.props;

    const xMoreResults = availableResults - displayedResults;

    return (
      <span data-id={id}
            data-type={type}
            data-index={index}
            data-index-in-section={indexInSection}
            data-count={xMoreResults}
            data-hook="search-everything-show-more">
        <span className={s.showMoreTextContainer}>
          <TextButton
            className={s.showMoreButton}
            dataHook={'show-more-' + type}
            onClick={this.showMoreClicked}
          >
            <More className={s.showMoreIcon} size="18px" />
            <Text className={s.showMoreInnerLink} size="small">
              <a href="#">{this.getDisplayTitle(xMoreResults)}</a>
            </Text>
          </TextButton>
        </span>
      </span>
    );
  }
}

const mapStateToProps = ({ searchStore }: IStoreState) => ({
  sectionsPaging: searchStore.sections
});

export const SearchResultShowMore = connect(mapStateToProps, { extendSectionResults, sendBIShowMoreClicked })(withTranslation()(SearchResultShowMoreComponent));
