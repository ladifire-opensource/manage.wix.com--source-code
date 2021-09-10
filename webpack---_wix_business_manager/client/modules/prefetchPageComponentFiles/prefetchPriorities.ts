import { ModuleId } from '@wix/business-manager-api';

export const modulePriorities: ModuleId[] = [
  /// OS IMPORTANT
  ModuleId.Home,
  ModuleId.SiteSettings,
  ModuleId.Settings, //business-settings

  /// VERTICALS
  ModuleId.Stores,
  ModuleId.Bookings,
  ModuleId.MusicManager,
  ModuleId.PhotoAlbums,
  ModuleId.ArtStore,
  ModuleId.Video,
  ModuleId.Events,
  ModuleId.SocialBlog,
  ModuleId.Restaurants,

  // HORIZONTALS
  ModuleId.Engage,
  ModuleId.PromoteHome,
  ModuleId.AppMarket,
  ModuleId.WixCodeDatabase
];
