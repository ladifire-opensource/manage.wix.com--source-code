import axios from 'axios';
export var buildServerApi = function (_a) {
    var dataBaseUrl = _a.dataBaseUrl;
    var GET_PREMIUM_STATE_URL = '/_api/premium-store/plans/premiumStatus';
    var axiosInstance = axios.create();
    var fetchEntries = function (dataPath) {
        var sidebarItemsUrl = "" + dataBaseUrl + dataPath;
        return axiosInstance.get(sidebarItemsUrl).then(function (res) { return res.data; });
    };
    var fetchPremiumState = function (metaSiteId) {
        var params = { metaSiteId: metaSiteId };
        return axiosInstance.get(GET_PREMIUM_STATE_URL, { params: params }).then(function (res) { return res.data.payload.premiumState; });
    };
    return {
        fetchEntries: fetchEntries,
        fetchPremiumState: fetchPremiumState
    };
};
//# sourceMappingURL=server-api.js.map