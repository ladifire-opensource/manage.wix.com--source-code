import { tryParse } from '../utils/tryParse';
import { SiteTag, SiteEmbededTag, Category } from '../types';

let loadingTags: any[] = [];
const loadedTags: any[] = [];
const errorTags: any[] = [];
const embedTags: SiteEmbededTag[] = [];
let categories: Category[] = [];
let config = {};

export function addTagEmbeds(tagsToAdd: SiteTag[]) {
  tagsToAdd.forEach((tag) => {
    embedTags.push({
      tag,
      embeddedNodes: null,
    });
  });
}

export function getSiteEmbedTags(): SiteEmbededTag[] {
  // Return the reference since it has DOM references
  return embedTags;
}

export function setConfig(conf: any) {
  if (typeof conf === 'object' && !Array.isArray(conf)) {
    config = { ...config, ...conf };
  }
}

export function getConfig() {
  return dumbClone(config);
}

export function updateConsentCategories(policy: { [key: string]: boolean }) {
  if (policy && typeof policy === 'object') {
    categories = [...categories, ...calculateNewCategories(policy)];
  }
}

export function calculateNewCategories(policy: { [key: string]: boolean }) {
  return (Object.keys(policy) as Category[]).filter(
    (key) => !!policy[key] && categories.indexOf(key) === -1,
  );
}

export function getConsentCategories(): Category[] {
  return categories;
}

export function setLoading(_loadingTags: any[]) {
  loadingTags = _loadingTags;
}

export function removeLoadingTag(tagName: string) {
  loadingTags = loadingTags.filter((tag) => tag.name !== tagName);
}

export function getLoadingTags() {
  return dumbClone(loadingTags);
}

export function addLoadedTag(_loadedTag: any) {
  loadedTags.push(_loadedTag);
}

export function getLoadedTags() {
  return dumbClone(loadedTags);
}

export function addLoadErrorTag(_loadErrorTag: any) {
  errorTags.push(_loadErrorTag);
}

export function getLoadErrorTags() {
  return dumbClone(errorTags);
}

function dumbClone(obj: any) {
  return tryParse(JSON.stringify(obj));
}
