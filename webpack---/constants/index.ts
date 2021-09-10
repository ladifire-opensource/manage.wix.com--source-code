export enum Selection {
  Single = 'single',
  Multiple = 'multiple',
}

export enum MainSource {
  SiteFiles = 'private',
  FreeFromWix = 'public',
  Trash = 'trash',
  Favorites = 'favorites',
  VisitorsUploads = 'visitorsUploads',
  Recommended = 'custom',
  Shutterstock = 'photoStock',
  Search = 'search',

  Empty = 'empty',
}

export enum ExternalSource {
  PX500 = '500px',
  Facebook = 'facebook',
  Dribbble = 'dribbble',
  GoogleDrive = 'googleDrive',
  Dropbox = 'dropbox',
  Instagram = 'instagram',
  Flickr = 'flickr',
  DeviantArt = 'deviantArt',
  GooglePhotos = 'googlePhotos',
  WixSite = 'wixSite',
  Link = 'link',
}

export type Source = MainSource | ExternalSource;

export enum Sort {
  LastModified = 'lastModified',
  OldestFirst = 'oldestFirst',
  AZ = 'az',
  ZA = 'za',
}

export enum Layout {
  Gallery = 'gallery',
  GalleryWithPanel = 'galleryWithPanel',
  List = 'list',
  ListWithPanel = 'listWithPanel',
}

export enum MediaType {
  Picture = 'picture',
  Music = 'music',
  Document = 'document',
  Video = 'video',
  Zip = 'archive',
  VectorArt = 'shape',
  SWF = 'swf',
  UFont = 'ufont',
  Watermark = 'watermark',
  SiteIcon = 'site_icon',
  SecurePicture = 'secure_picture',
  SecureMusic = 'secure_music',
  SecureDocument = 'secure_document',
  SecureVideo = 'secure_video',
  SecureZip = 'secure_archive',
}
