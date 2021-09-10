import { LAZY_COMPONENT_LOADING_ERROR_NAME } from './constants';

const getLastWord = (sentence: string) => {
  const words = sentence.split(' ');
  return words.length ? words[words.length - 1] : null;
};

const isComponentError = (error: Error, componentName: string) =>
  getLastWord(error.message) === componentName;

const isLoadingError = (error: Error) => error.name === LAZY_COMPONENT_LOADING_ERROR_NAME;

export const isComponentLoadingError = (error: Error, componentName: string): boolean =>
  isLoadingError(error) && isComponentError(error, componentName);
