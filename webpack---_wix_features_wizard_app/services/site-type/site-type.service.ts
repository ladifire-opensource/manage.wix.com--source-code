import { SitePropertiesService } from '@wix/ambassador-site-properties-service/http';
import { CategoryData } from 'types';

export const SITE_PROPERTIES_SERVICE_URL = '/_api/site-properties-service';

export const fetchSiteType = async (currentInstance: string) => {
  const result = await SitePropertiesService(SITE_PROPERTIES_SERVICE_URL)
    .SitePropertiesV4()({
      Authorization: currentInstance,
    })
    .read({ fields: { paths: ['categories'] } });

  const categories = result?.properties?.categories?.secondary;
  const category = Array.isArray(categories) ? categories[0] : undefined;

  return category;
};

export const updateSiteType = async (
  currentInstance: string,
  category: CategoryData,
) => {
  SitePropertiesService(SITE_PROPERTIES_SERVICE_URL)
    .SitePropertiesV4()({
      Authorization: currentInstance,
    })
    .update({
      fields: { paths: ['categories'] },
      properties: {
        categories: {
          primary: category.category || undefined,
          secondary: category.subCategory ? [category.subCategory] : undefined,
        },
      },
    });
};
