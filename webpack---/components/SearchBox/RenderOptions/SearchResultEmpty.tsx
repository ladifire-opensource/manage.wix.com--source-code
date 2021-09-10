import * as React from 'react';
import * as s from '../SearchBox.scss';
import { EmptyState } from 'wix-style-react';

export const SearchResultEmpty = ({ id, value, index, indexInSection, snippet, t }) => (
  <span className={s.searchSectionEmpty}
        data-id={id}
        data-type="empty"
        data-index={index}
        data-index-in-section={indexInSection}
        data-hook="search-everything-option">
    <EmptyState
      image={<div className={s.emptyStateImage} />}
      theme="section"
      title={value}
      subtitle={snippet}
      classNames={{
        imageContainer: s.emptyImageContainer
      }}
    />
  </span>
);
