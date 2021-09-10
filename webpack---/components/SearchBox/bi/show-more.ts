import * as _ from 'lodash';
import { ISectionsPaging } from '../../../types/store';

export function wasShowMoreClicked(newSectionsPaging: ISectionsPaging, prevSectionsPaging: ISectionsPaging) {
  const sectionsKeys = _.keys(newSectionsPaging);
  const didDisplayedResultsChangeInSection = key => newSectionsPaging[key].displayedResults !== prevSectionsPaging[key].displayedResults;

  const showMoreClicked =
      sectionsKeys.length === _.keys(prevSectionsPaging).length &&
      sectionsKeys.some(didDisplayedResultsChangeInSection);

  return showMoreClicked;
}
