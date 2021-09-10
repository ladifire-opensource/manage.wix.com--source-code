import { IState } from '../../types/store';
import { appendLinkElement } from './appendLinkElement';
import { getPrefetchFiles } from './getPrefetchFiles';

const INITIAL_DELAY = 5000;
const PER_PAGE_DELAY = 2000;

export function prefetchApplications(files: any[]) {
  const getAddLinkFunction = (timeout: number) => {
    const addLink = () =>  {
      const file = files.shift();
      appendLinkElement(file, document.head);
      if (files.length) {
        setTimeout(addLink, timeout);
      }
    };
    return addLink;
  };
  setTimeout(getAddLinkFunction(PER_PAGE_DELAY), INITIAL_DELAY);
}

export function prefetchOtherFiles(state: IState) {
  prefetchApplications(getPrefetchFiles(state));
}
