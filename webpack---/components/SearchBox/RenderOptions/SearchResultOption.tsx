import * as React from 'react';
import * as s from '../SearchBox.scss';
import ExternalLinkSmall from 'wix-ui-icons-common/ExternalLinkSmall';
import { Text } from 'wix-style-react';
import { DataType } from '../../../types/index';
import { TFunction } from '@wix/wix-i18n-config';

// todo: remove as many data attributes as possible

export type SearchResultOptionProps = {
  id: string;
  value: string;
  type: DataType;
  index: number;
  indexInSection: number;
  openInNewTab: boolean;
  isInstalled: boolean;
  t: TFunction;
  snippet: string;
  Icon: React.ReactElement;
};

export const SearchResultOption = ({ id, value, type, index, indexInSection, openInNewTab, isInstalled, t, snippet = null, Icon = null }: SearchResultOptionProps) => (
  <span className={s.searchOption}
        data-id={id}
        data-type={type}
        data-index={index}
        data-index-in-section={indexInSection}
        data-hook="search-everything-option">
    <span className={s.optionIcon}>
      {Icon}
    </span>
    <span className={s.optionValue}>
      <span className={s.resultTitle}>
        <Text dataHook="search-everything-result-title" className={s.singleTextLine} size="small" dark="true">{value}</Text>
        {openInNewTab &&
        <span className={s.externalLink} data-hook="search-everything-external-link">
            <span className={s.externalLinkIcon}><ExternalLinkSmall/></span>
            <span className={s.externalLinkDesc}>
              <Text size="small"><a href="#">{t('searchbox.open-in-new-tab')}</a></Text>
            </span>
          </span>}
        {isInstalled && <span className={s.appMarketInstalledIcon}/>}
      </span>
      {snippet &&
      <Text dataHook="search-everything-result-snippet" size="small" weight="thin" light secondary className={s.resultSnippet}>{snippet}</Text>}
    </span>
  </span>
);
