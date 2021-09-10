import { executeMediaGalleryWorkAround } from './mediaManagerWorkaround';
import { executeSdkWorkAround } from './sdkWorkaround';

export function executeWorkarounds() {
  executeMediaGalleryWorkAround();
  executeSdkWorkAround();
}
