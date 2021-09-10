import { __spreadArrays } from "tslib";
import axios from 'axios';
export var getCollectionUrl = function (collection) {
    return window.location.origin + "/_api/app-market-api/categories/" + collection + "/apps";
};
export var reviewsUrl = 'https://www.wix.com/_api/reviews-server/v1/products';
export var getAllCountries = function (locale) {
    return axios
        .get(window.location.origin + "/_api/cashier-metadata/v2/locales/countries?locale=" + (locale || 'us'))
        .then(function (_a) {
        var data = _a.data;
        return data.countries;
    });
};
export var getFinanceCountriesKeys = function () {
    return axios
        .get(window.location.origin + "/_api/marketplace-api/v1/web-solutions/tags/financial-integrations?limit=200")
        .then(function (_a) {
        var data = _a.data;
        var includeCountries = data.webSolutions.reduce(function (acc, currentValue) {
            var countriesToAdd = currentValue.includeCountries.filter(function (country) { return !acc.includes(country); });
            return __spreadArrays(acc, countriesToAdd);
        }, []);
        return includeCountries;
    });
};
//# sourceMappingURL=API.js.map