import { isExternalPageLink } from '@wix/business-manager-api';

export type TNavigate = (link: string, openInNewTab?: boolean) => void;
export const navigateFactory = (router, win: any = window, loc: any = location): TNavigate => (link: string, openInNewTab: boolean = false) => {
  if (!link) {
    throw new Error('Unknown link');
  }
  if (openInNewTab) {
    win.open(link);
  } else if (/(^\/\/)|(^https?:)/.test(link) || isExternalPageLink(link)) {
    loc.href = link;
  } else {
    setTimeout(() => router.push(link), 0);
  }
};
