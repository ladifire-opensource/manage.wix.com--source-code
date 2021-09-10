import * as React from 'react';
import * as s from './SearchResultShowMore.scss';
import { TextButton, Text } from 'wix-style-react';
import { getViewAllLinkText } from './view-all-link-text';
import { DataType } from '../../../types/index';
import { withTranslation, TFunction } from '@wix/wix-i18n-config';

export type SearchResultGotoMoreProps = {
  t: TFunction;
  id: string;
  type: DataType;
  index: number;
  indexInSection: number;
  sectionIndex: number;
  clickAction: Function;
  totalResults: number;
  availableResults: number;
  query: string;
};

class SearchResultGotoMoreComponent extends React.PureComponent<SearchResultGotoMoreProps> {

  getDisplayTitle = () => {
    const { t, availableResults, totalResults, type } = this.props;

    return t('searchbox.section.goto-more', {
      AVAILABLE_RESULTS: availableResults,
      TOTAL_RESULTS: totalResults,
      SECTION_SEE_MORE_TITLE: getViewAllLinkText(t, type)
    });
  }

  render() {
    const { id, type, index, indexInSection, clickAction, sectionIndex } = this.props;
    return (
      <span className={s.searchSectionGotoMore}
            data-id={id}
            data-type={type}
            data-index={index}
            data-index-in-section={indexInSection}
            data-hook="search-everything-option">
    <span className={s.showMoreTextContainer}>
      <TextButton
        className={s.showMoreButton}
        dataHook={'show-more-' + type}
        onClick={() => clickAction(type, sectionIndex)}
      >
        <Text className={s.showMoreInnerLink} size="tiny"><a href="#">{this.getDisplayTitle()}</a></Text>
      </TextButton>
    </span>
  </span>
    );
  }
}

export const SearchResultGotoMore = withTranslation()(SearchResultGotoMoreComponent);
