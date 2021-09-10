import { NavigationData, NavigationService } from '../services/navigation/NavigationService';
import { IResultEntry } from '../components/SearchBox/Entries';

export const navigateToResult = ({ type, payload }: IResultEntry) => {
  return (dispatch, getState) => {
    NavigationService.navigateTo({ type, payload } as NavigationData);
  };
};
