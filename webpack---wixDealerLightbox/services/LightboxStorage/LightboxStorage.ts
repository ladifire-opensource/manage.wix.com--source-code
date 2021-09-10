import {reportSentryError} from '@wix/dealer-common/dist/src/services/SentryReporter/SentryReporter';
import {DataCapsule, LocalStorageStrategy, WixStorageStrategy, NOT_FOUND} from 'data-capsule';
import {LightboxItem} from '../../interfaces';

const essentialRealEstateWhiteList = ['TEMPLATE_VIEWER', 'a43db780-1624-4ff1-a0a2-c4627c12c5e4'];
export class LightboxStorage {
  public capsule?: any;
  public lightboxRemoteCapsule?: any;
  private readonly location?: string;
  private readonly item?: string;
  private readonly lastSeenItem?: string;

  constructor(location: string) {
    this.capsule = new DataCapsule({
      strategy: new LocalStorageStrategy(),
      namespace: 'wixLightboxStorage',
    });

    this.lightboxRemoteCapsule = new DataCapsule({
      strategy: new WixStorageStrategy(),
      namespace: 'wixLightboxStorage',
    });

    this.location = location;
    this.item = `lightboxes|${this.location}`;
    this.lastSeenItem = `lastSeen|${this.location}`;
  }

  public isEssentialRealEstate(): boolean {
    return essentialRealEstateWhiteList.indexOf(this.location) > -1;
  }

  private async setLocalLightboxItem(values: LightboxItem[]): Promise<void> {
    await this.capsule.setItem(this.item, values, {category: 'essential'}).catch((e: Error) =>
      reportSentryError(e, {
        realEstateId: this.location,
        reportingClass: 'LightboxStorage.setLocalLightboxItem',
      }),
    );
  }

  private async setLocalLastSeenItem(): Promise<void> {
    this.capsule.setItem(this.lastSeenItem, Date.now(), {category: 'essential'}).catch((e: Error) =>
      reportSentryError(e, {
        realEstateId: this.location,
        reportingClass: 'LightboxStorage.setLocalLastSeenItem',
      }),
    );
  }

  private async setRemoteLastSeenItem(): Promise<void> {
    this.lightboxRemoteCapsule.setItem(this.lastSeenItem, Date.now()).catch((e: Error) =>
      reportSentryError(e, {
        realEstateId: this.location,
        reportingClass: 'LightboxStorage.setRemoteLastSeenItem',
      }),
    );
  }

  async getLastSeen(): Promise<number | undefined> {
    if (this.isEssentialRealEstate()) {
      return this.capsule.getItem(this.lastSeenItem).catch((e: Error) => {
        if (e !== NOT_FOUND) {
          reportSentryError(e, {
            realEstateId: this.location,
            reportingClass: 'LightboxStorage.getLastSeen',
          });
        }
      });
    }

    return this.lightboxRemoteCapsule.getItem(this.lastSeenItem).catch((e: Error) => {
      if (e !== NOT_FOUND) {
        reportSentryError(e, {
          realEstateId: this.location,
          reportingClass: 'LightboxStorage.getLastSeen',
        });
      }
    });
  }

  async getEssentialLightboxesFromStorage(): Promise<LightboxItem[] | void> {
    if (this.isEssentialRealEstate()) {
      try {
        return (await this.capsule.getItem(this.item)) || [];
      } catch {
        await this.setLocalLightboxItem([]);

        return [];
      }
    }
  }

  async saveLightbox(lightbox: LightboxItem) {
    if (this.isEssentialRealEstate()) {
      const lightboxes = await this.getEssentialLightboxesFromStorage();
      const updatedLightboxes =
        lightboxes &&
        lightboxes.filter((lb: LightboxItem) => lb.lightboxGuid !== lightbox.lightboxGuid);
      return Promise.all([
        this.setLocalLastSeenItem(),
        this.setLocalLightboxItem([...updatedLightboxes, lightbox]),
      ]);
    }
    return this.setRemoteLastSeenItem();
  }
}
