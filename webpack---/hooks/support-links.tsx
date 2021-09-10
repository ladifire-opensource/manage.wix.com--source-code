import { useCallback } from 'react';
import { useModuleParams } from 'yoshi-flow-bm-runtime';

const DOMAIN = 'https://support.wix.com';

export enum Article {
  RolesAndPermissions = 'roles-permissions-overview',
}

interface Props {
  article: Article;
  referralInfo: string;
}

export const useSupportLinks = () => {
  const { accountLanguage } = useModuleParams();

  const openArticle = useCallback(
    ({ article, referralInfo }: Props) => {
      const articleLink: URL = new URL(`${DOMAIN}/${accountLanguage}/article/${article}`);
      articleLink.searchParams.set('referralInfo', referralInfo);

      return window.open(decodeURI(articleLink.toString()), '_blank');
    },
    [accountLanguage],
  );

  return { openArticle };
};
