import * as React from 'react';
import * as time from '../../actions/time';
import * as s from './SearchBox.scss';
import * as _ from 'lodash';
import { Input } from 'wix-style-react';
import SearchIcon from 'wix-ui-icons-common/Search';
import { ISearchResult } from '../../types';
import { TFunction } from '@wix/wix-i18n-config';
import { IResultEntry } from './Entries';
import { CloseDialogReason, SearchResultsBIParams, ISearchBoxFocusOption } from '../../actions/bi';
import { mapSearchResultsToDropdownOptions } from './RenderOptions/results-to-options';
import { getSectionVisibleOptionsCount } from './bi/get-options-visibility';
import { InputWithOptionsPlusMonitoring } from './InputWithOptionsPlusMonitoring';

import { registerHotkey } from './hotkeys';
import { ISectionsPaging } from '../../types/store';
import { wasShowMoreClicked } from './bi/show-more';
import { ISectionVisibleResults } from '../../services/bi/send-bi-events';

export interface IProps {
  t: TFunction;
  query: string;
  queryThatProvidedResults: string;
  searchResults: ISearchResult[];
  sectionsPaging: ISectionsPaging;
  isDataLoading?: boolean;
  biTimeout?: number;
  dataFetchCompleted?: () => void;
  dataFetchStart?: () => void;
  performSearch: (query: string) => void;
  navigateToResult?: (option: IResultEntry) => void;
  sendBIOptionFocused?: (option: ISearchBoxFocusOption) => Promise<void>;
  sendBIOptionClicked?: (option: IResultEntry) => Promise<void>;
  sendBIDropdownClosed?: (reason: CloseDialogReason, time_in_dialog: number, sectionVisibleResults: ISectionVisibleResults, sectionsPaging: ISectionsPaging) => Promise<void>;
  sendBIDropdownScroll?: () => Promise<void>;
  sendBIOnSearchResults?: (params: SearchResultsBIParams) => Promise<void>;
  redesignSearchEnabled: boolean;
}

interface IState {
  value: string;
  pendingQuery: string;
  dropdownOpened: boolean;
  useLongPlaceholder: boolean;
  containerHeight: number;
}

// TECHDEBT: Update to latest WSR version (will include visual tests update) | SEV: 2 | EFFORT: 3
export class SearchBox extends React.PureComponent<IProps, IState> {

  private _searchBoxContainer: HTMLDivElement = null;
  private _dropdownOpenedTime = null;
  private isDropdownMarkedAsOpened = () => this._dropdownOpenedTime !== null;
  private readonly sendBIOnSearchResults = _.debounce(this.props.sendBIOnSearchResults, this.props.biTimeout || 1000);

  state: IState = {
    value: '',
    pendingQuery: '',
    dropdownOpened: false,
    containerHeight: window.innerHeight,
    useLongPlaceholder: true
  };

  private performSearchWithDelay = _.debounce(query => {
    this.setState({ pendingQuery: this.state.value });
    this.props.performSearch(query);
  }, 300);

  private updateSearchTerm = (value: string) => {
    this.setState({ value });
    this.performSearchWithDelay(value);
  }

  private _getSectionVisibleOptionsCount = () => this._searchBoxContainer && getSectionVisibleOptionsCount(this._searchBoxContainer) || null;

  private handleDropdownClosed = (reason: CloseDialogReason) => {
    if (this.isDropdownMarkedAsOpened()) {
      this._initializeFocusEventIterations();
      const timeInDialog = this._dropdownOpenedTime ? time.getCurrentTime() - this._dropdownOpenedTime : -1;
      this.props.sendBIDropdownClosed(
        reason,
        timeInDialog,
        this._getSectionVisibleOptionsCount(),
        this.props.sectionsPaging
      );
      this._dropdownOpenedTime = null;
    }
  }

  private updateDropdownOpenedTime = () =>
    this._dropdownOpenedTime =
      this.state.value ?
        this._dropdownOpenedTime || time.getCurrentTime() : null

  onChange = event => this.updateSearchTerm(event.target.value);

  private _isFocusEventFirstIteration = true;
  private _initializeFocusEventIterations = () => this._isFocusEventFirstIteration = true;

  onOptionFocused = (option: IResultEntry) => {
    const isSearchContainerLoaded = !!this._searchBoxContainer;

    if (isSearchContainerLoaded && option) {

      const isFirtstHover = this._isFocusEventFirstIteration;
      this._isFocusEventFirstIteration = false;

      return this.props.sendBIOptionFocused({
        ...option,
        sectionVisibleResults: this._getSectionVisibleOptionsCount(),
        sectionsPaging: this.props.sectionsPaging,
        isFirtstHover
      });
    }
  }
  onDropdownOpened = () => this.setState({ dropdownOpened: true });
  onDropdownClosed = () => this.setState({ dropdownOpened: false });

  onCleanAndDropdownClosed = () => {
    this.updateSearchTerm('');
    this.handleDropdownClosed(CloseDialogReason.ClickOnClear);
  }

  onOptionSelected = (option: IResultEntry) => {
    if (option) {
      this.props.sendBIOptionClicked(option);
      this.props.navigateToResult(option);
      this.handleDropdownClosed(CloseDialogReason.ResultClicked);
    }
  }

  onScroll = _.throttle((target, deltaY) => {

    const isScrollElementTheDropdown = target && target.tagName !== 'INPUT';
    const isScrollDirectionDown = deltaY > 0;

    if (isScrollElementTheDropdown && isScrollDirectionDown) {
      this.props.sendBIDropdownScroll();
    }
  }, 300);

  updateContainerHeight = () => this.setState({ containerHeight: window.innerHeight });

  focusOnSearchInput = () => this._searchInputRef.focus();

  componentDidMount() {
    window.addEventListener('resize', this.updateContainerHeight);
    registerHotkey('ctrl+space', this.focusOnSearchInput);
    this.handlePlaceholderSetting();
  }

  handlePlaceholderSetting = () => {
    if (this.props.redesignSearchEnabled) {
      this.setPlaceholder();
      window.addEventListener('resize', this.setPlaceholder);
    }
  }

  setPlaceholder = () => {
    const inputElement = document.getElementsByClassName(s.searchBoxInput)[0];
    const inputWidth = inputElement && inputElement.clientWidth;
    const widthBreakpoint = 350;
    if ((inputWidth < widthBreakpoint) && this.state.useLongPlaceholder) {
      this.setState({ useLongPlaceholder: false });
    } else if ((inputWidth > widthBreakpoint) && !this.state.useLongPlaceholder) {
      this.setState({ useLongPlaceholder: true });
    }
  }

  UNSAFE_componentWillReceiveProps({ query, queryThatProvidedResults }: IProps) {
    if (query !== this.props.query && query !== this.state.value) {
      if (query !== this.state.pendingQuery) {
        this.setState({ value: query });
      }
      this.setState({ pendingQuery: '' });
    }

    const didDisplayedResultsChange = this.props.queryThatProvidedResults && this.props.queryThatProvidedResults !== queryThatProvidedResults;
    if (didDisplayedResultsChange) {
      this._initializeFocusEventIterations();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateContainerHeight);
    window.removeEventListener('resize', this.setPlaceholder);
    this.performSearchWithDelay.cancel();
    this.sendBIOnSearchResults.cancel();
  }

  componentDidUpdate(prevProps: IProps) {
    const isUserSeeingNewResults = !this.props.isDataLoading && prevProps.isDataLoading;
    const showMoreClicked = wasShowMoreClicked(this.props.sectionsPaging, prevProps.sectionsPaging);

    if (isUserSeeingNewResults || showMoreClicked) {
      this.sendBIOnSearchResults({
        isUserSeeingNewResults,
        showMoreClicked,
        sectionVisibleResults: this._getSectionVisibleOptionsCount(),
        sectionsPaging: this.props.sectionsPaging
      });
    }

    const isDropdownShownWithQuery = this.state.dropdownOpened && this.state.value;
    if (!this.isDropdownMarkedAsOpened()) {
      if (isDropdownShownWithQuery) {
        this.updateDropdownOpenedTime();
      }
    } else {
      if (!isDropdownShownWithQuery) {
        this.handleDropdownClosed(CloseDialogReason.ClickOutside);
      }
    }
  }

  private _searchInputRef = null;
  closeOptionsDropdown = () => this._searchInputRef.hideOptions();

  render() {

    const { isDataLoading, searchResults, sectionsPaging, queryThatProvidedResults, redesignSearchEnabled, t } = this.props;

    const { useLongPlaceholder } = this.state;

    const focusOnFirstResultByDefault = searchResults && searchResults.length ? searchResults[0].id : true;
    const inputDesignProperties = {
      className: s.searchBoxInput,
      selectedId: null,
      roundInput: true,
      prefix: <Input.IconAffix><SearchIcon/></Input.IconAffix>,
      placeholder: useLongPlaceholder ? t('searchbox.placeholder') : t('searchbox.short-placeholder'),
      size: 'small',
      menuArrow: false,
      clearButton: true,
      closeOnSelect: true,
      maxHeightPixels: this.state.containerHeight - 50,
      showOptionsIfEmptyInput: false,
      dropdownWidth: '500px',
      highlight: true,
      updateControlledOnClear: true,
      markedOption: focusOnFirstResultByDefault
    };

    const dropdownEvents = {
      onChange: this.onChange,
      onSelect: this.onOptionSelected,
      onOptionMarked: this.onOptionFocused,
      onClear: this.onCleanAndDropdownClosed,
      onShowOptions: this.onDropdownOpened,
      onHideOptions: this.onDropdownClosed
    };

    const iputWrapperClass = redesignSearchEnabled ? s.searchBoxRedesign : s.searchContainer;

    return (
      <div className={iputWrapperClass}
           ref={(el) => this._searchBoxContainer = el}
           onWheel={({ target, deltaY }) => this.onScroll(target, deltaY)}
      >
        <InputWithOptionsPlusMonitoring
          dataHook="search-everything-input"
          value={this.state.value}
          options={mapSearchResultsToDropdownOptions({
            searchResults,
            sectionsPaging,
            query: queryThatProvidedResults,
            hideDropdown: this.closeOptionsDropdown,
            getSectionVisibleOptionsCount: this._getSectionVisibleOptionsCount,
            t
          })}
          status={isDataLoading ? Input.StatusLoading : null}
          ref={ref => this._searchInputRef = ref}

          {...dropdownEvents}
          {...inputDesignProperties}
        />
      </div>
    );
  }
}
