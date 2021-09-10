import {LightboxStorage} from '../LightboxStorage';
import {LightboxItem, LightboxTriggers} from '../../interfaces';
import {BannerData} from '@wix/dealer-common/dist/src/interfaces';

export class LightboxResolver {
  public triggers: LightboxTriggers;
  public storageInstance: LightboxStorage;

  constructor(lightboxStorage: LightboxStorage) {
    this.triggers = null;
    this.storageInstance = lightboxStorage;
  }

  async calculateExcludedLightboxesWithoutAnyLb() {
    const lightboxes = (await this.storageInstance.getEssentialLightboxesFromStorage()) || [];
    const excludedTTLSameLB = lightboxes.filter(this.filterTTLSameLB);
    return excludedTTLSameLB.map(this.getLightboxId);
  }

  async filterAnyLb(lbs: BannerData[]): Promise<BannerData[] | undefined> {
    const lastSeen = await this.storageInstance.getLastSeen();
    if (!lastSeen) {
      return lbs;
    }

    return lbs.filter(lb => {
      const {ttlSecAnyLB} = JSON.parse(lb.lightboxTriggers);
      return lastSeen + ttlSecAnyLB * 1000 < Date.now();
    });
  }

  private readonly getLightboxId = (item: LightboxItem): string => item.lightboxGuid;

  private readonly filterTTLSameLB = (lightbox: LightboxItem): boolean => {
    if (lightbox.ttlSecSameLB === -1) {
      return true;
    }
    return lightbox.lastSeen + lightbox.ttlSecSameLB * 1000 > Date.now();
  };
}
