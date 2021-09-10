import { getPermissions, getUserSiteList } from './serverApi/serverApi';
import _once from 'lodash/once';

class UserSettingsService {
  getPermissions = _once(() => getPermissions());
  isUserWithMultiSites = _once(() =>
    getUserSiteList().then((response) => {
      return response.entries.length > 1;
    }),
  );
}

export default new UserSettingsService();
