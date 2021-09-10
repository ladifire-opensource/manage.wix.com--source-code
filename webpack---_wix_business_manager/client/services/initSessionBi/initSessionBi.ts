import { MasterBsiManager } from '@wix/bsi-manager/dist/src/manager-master';
import { v4 as uuidv4 } from 'uuid';
import { getSentry } from '../essentials';

export let bsiManagerInstance: MasterBsiManager;

export const initSessionBi = () => {
    if (!bsiManagerInstance){
        try {
            bsiManagerInstance = new MasterBsiManager().init({
                genGuid: () => uuidv4(),
                getCommonConfig: () => window['commonConfig'],
                getConsentPolicy: () => window['consentPolicyManager'].getCurrentConsentPolicy()
            });
        } catch (e) {
            getSentry().captureException(e);
        }
    };
};
