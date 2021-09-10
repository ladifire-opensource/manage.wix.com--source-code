import { ModuleRegistry } from 'react-module-container';
import ClientConfig = gapi.auth2.ClientConfig;

const CLIENT_ID =
'404299234025-nv17vjsp5si3cecrrfj9l90qr0qm25jb.apps.googleusercontent.com';
const GAPI_AUTH2_INIT_WAIT_TIME = 5000;
const SCOPE: ClientConfig['client_id'] =
  'https://www.googleapis.com/auth/business.manage';
const GET_GAPI_METHOD = 'promote-seo-tools.getGoogleApi';

export class Google {
  constructor(private selector: string){}

  public async initGapi(): Promise<void> {
    const wixGapi = await this.getWixGapi();
    if (!wixGapi) {
      throw Google.GapiInitError('gapi missing: init');
    }
    const self = this;
    return Promise.race([
      this.loadClientAndAuth2().then(this.initAuth2.bind(self)),
      new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          reject(Google.GapiInitError('timeout on loading gapi.init auth2'));
        }, GAPI_AUTH2_INIT_WAIT_TIME + 1000);
      }),
    ]);
  }

  public async getUserAccessToken() {
    const wixGapi = await this.getWixGapi();
    if (!wixGapi) {
      throw new Error('gapi missing: getUserAccessToken');
    }
    const token =
      await this.getGoogleUser() &&
      wixGapi.client.getToken();
    return token && token.access_token;
  }

  private async getWixGapi() {
    return ModuleRegistry.invoke(GET_GAPI_METHOD, this.selector) || window.gapi;
  }

  private async initAuth2(): Promise<void> {
    const wixGapi = await this.getWixGapi();
    return new Promise<void>((resolve, reject) => {
      wixGapi.auth2.init({ client_id: CLIENT_ID }).then(
        () => {
          resolve();
        },
        ({ error, details }) =>
          reject(Google.GapiInitError(`${error}: ${details}`)),
      );
    });
  }
  private async loadClientAndAuth2(): Promise<void> {
    const wixGapi = await this.getWixGapi();
    return new Promise<void>(async (resolve, reject) => {
      wixGapi.load('client:auth2', {
        callback: async () => {
          wixGapi.auth2
            ? resolve()
            : reject(Google.GapiInitError('missing gapi.auth2 after load'));
        },
        onerror: (error: any) =>
          reject(Google.GapiInitError(`gapi load: ${JSON.stringify(error)}`)),
        timeout: GAPI_AUTH2_INIT_WAIT_TIME,
        ontimeout: () =>
          reject(Google.GapiInitError('timeout on loading gapi.load auth2')),
      });
    });
  }
  
  private async getGoogleUser() {
    const instance = await this.getAuthInstance();
    const currentUser = instance?.currentUser.get();
    return (
      instance?.isSignedIn.get() &&
      currentUser?.getGrantedScopes().includes(SCOPE!) &&
      currentUser
    );
  }

  private async getAuthInstance() {
    const wixGapi = await this.getWixGapi();
    if (!wixGapi) {
      throw new Error('gapi missing: getAuthInstance');
    }
    return wixGapi.auth2.getAuthInstance();
  }

  private static GapiInitError(msg: string) {
    const error = new Error(msg);
    // @ts-ignore
    error.type = 'GapiInitError';
    return error;
  }
}