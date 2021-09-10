import { DataCapsule, LocalStorageStrategy } from 'data-capsule';

let dataCapsule: DataCapsule;

export const getDashboardDataCapsule = (): DataCapsule => {
  if (!dataCapsule) {
    dataCapsule = new DataCapsule({
      strategy: new LocalStorageStrategy(),
      namespace: 'business-dashboard',
    });
  }

  return dataCapsule;
};
