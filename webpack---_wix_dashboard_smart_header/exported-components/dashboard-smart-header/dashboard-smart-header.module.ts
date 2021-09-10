import { ResolveFn } from '@wix/yoshi-flow-bm';
import { fetchSiteType } from '@src/services/site-type/site-type.service';

export interface ResolveProps {
  category?: string;
}

export const resolve: ResolveFn<ResolveProps> = async ({
  getCurrentInstance,
}): Promise<ResolveProps> => {
  const category = await fetchSiteType(getCurrentInstance());

  return {
    category,
  };
};
