import { DataCapsule, LocalStorageStrategy } from 'data-capsule';

export class PayloadManager {
  private readonly m_dataCapsule;

  constructor(strategy = LocalStorageStrategy) {
    this.m_dataCapsule = new DataCapsule({
      strategy: new strategy(),
      namespace: 'wix-business-manager'
    });
  }

  public savePayload(key: string, payload: any): Promise<any> {
    return this.m_dataCapsule.setItem(key, payload);
  }

  public loadPayload(key: string): Promise<any> {
    return this.m_dataCapsule.getItem(key);
  }
}
