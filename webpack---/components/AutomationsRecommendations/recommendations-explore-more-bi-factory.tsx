export const recommendationsExploreMoreClickBIFactory = () => async ({
  referralInfo = '',
  displayedRecipesCount = 0,
  origin = '',
  realEstateId = '',
} = {
  referralInfo: '',
  displayedRecipesCount: 0,
  origin: '',
  realEstateId: '',
}) => {
  const { exploreMoreClickBI } = await import(
    /* webpackChunkName: "exporeMoreClickBI" */ './explore-more-click-bi'
  );
  return exploreMoreClickBI({
    referralInfo,
    displayedRecipesCount,
    origin,
    realEstateId,
  });
}
