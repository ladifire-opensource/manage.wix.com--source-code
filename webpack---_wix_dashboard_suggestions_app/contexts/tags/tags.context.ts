import { createContext, useContext } from 'react';

export interface TagsContext {
  tags: string[];
  selectedTag: string;
  setSelectedTag: (tag: string) => void;
  removeTag: (tag: string) => void;
}

export const TagsContext = createContext({} as TagsContext);

export const useTags = () => useContext(TagsContext);
