import axios from 'axios';
import { calculateApiHostname } from './api.utils';
function getAppDataById(appDefId) {
    return axios
        .get("https://" + calculateApiHostname() + "/_api/marketplace-api/v1/web-solutions/" + appDefId)
        .then(function (_a) {
        var data = _a.data;
        return data;
    });
}
export { getAppDataById };
//# sourceMappingURL=app.js.map