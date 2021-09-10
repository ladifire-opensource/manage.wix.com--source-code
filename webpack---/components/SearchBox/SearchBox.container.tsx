import { IStoreState } from '../../types/store';
import { connect } from 'react-redux';
import { dataFetchCompleted, dataFetchStart } from '../../actions/data-ready';
import { navigateToResult } from '../../actions/navigation';
import { withTranslation } from '@wix/wix-i18n-config';
import {
  sendBIOptionFocused,
  sendBIOptionClicked,
  sendBIDropdownClosed,
  sendBIDropdownScroll,
  sendBIOnSearchResults
} from '../../actions/bi';
import { performSearch } from '../../actions/search';

import { SearchBox } from './SearchBox';
import { experimentsSelectors } from '@wix/wix-experiments-redux';

const mapStateToProps = ({ isDataLoading, searchStore, experiments }: IStoreState) => ({
  isDataLoading,
  query: searchStore.query,
  queryThatProvidedResults: searchStore.queryThatProvidedResults,
  searchResults: searchStore.results,
  sectionsPaging: searchStore.sections,
  redesignSearchEnabled: experimentsSelectors({ experiments }).enabled('specs.wos2.redesignSearchVersion1')
});

const mapDispatchToProps = {
  dataFetchStart,
  dataFetchCompleted,
  navigateToResult,
  performSearch,
  sendBIOptionFocused,
  sendBIOptionClicked,
  sendBIDropdownClosed,
  sendBIDropdownScroll,
  sendBIOnSearchResults
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(SearchBox));
