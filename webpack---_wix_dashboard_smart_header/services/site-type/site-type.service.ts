import { SitePropertiesService } from '@wix/ambassador-site-properties-service/http';

export const fetchSiteType = async (currentInstance: string) => {
  const baseUrl = '/_api/site-properties-service';

  const result = await SitePropertiesService(baseUrl)
    .SitePropertiesV4()({
      Authorization: currentInstance,
    })
    .read({ fields: { paths: ['categories'] } });

  const categories = result?.properties?.categories?.secondary;
  const category = Array.isArray(categories) ? categories[0] : undefined;

  return category;
};
