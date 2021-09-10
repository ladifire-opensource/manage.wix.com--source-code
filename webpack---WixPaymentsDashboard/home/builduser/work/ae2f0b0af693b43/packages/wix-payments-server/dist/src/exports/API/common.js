"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Endpoints = void 0;
const static_endpoints_1 = require("../../routes/static/static-endpoints");
const accounts_endpoints_1 = require("../../routes/api/accounts/accounts-endpoints");
const balance_endpoints_1 = require("../../routes/api/balance/balance-endpoints");
const payouts_endpoints_1 = require("../../routes/api/payouts/payouts-endpoints");
const profile_endpoints_1 = require("../../routes/api/profile/profile-endpoints");
const payables_endpoints_1 = require("../../routes/api/payables/payables-endpoints");
const media_platform_endpoints_1 = require("../../routes/api/media-platform/media-platform-endpoints");
const site_endpoints_1 = require("../../routes/api/site/site-endpoints");
const meta_endpoints_1 = require("../../routes/api/meta/meta-endpoints");
const transactions_endpoints_1 = require("../../routes/api/transactions/transactions-endpoints");
var update_profile_payout_settings_handler_constants_1 = require("../../routes/api/accounts/update-profile-payout-settings/update-profile-payout-settings-handler.constants");
Object.defineProperty(exports, "UpdateProfilePayoutSettingsHttpResponse", { enumerable: true, get: function () { return update_profile_payout_settings_handler_constants_1.UpdateProfilePayoutSettingsHttpResponse; } });
exports.Endpoints = {
    Static: {
        Index: static_endpoints_1.StaticEndpoints.DASHBOARD_INDEX,
    },
    Account: {
        GetAccounts: accounts_endpoints_1.AccountsEndpoints.API_ACCOUNT,
        GetAccountProfileDetails: accounts_endpoints_1.AccountsEndpoints.API_ACCOUNT,
        GetActivationStatus: accounts_endpoints_1.AccountsEndpoints.GET_ACTIVATION_STATUS,
        AddProfileDocuments: accounts_endpoints_1.AccountsEndpoints.ADD_PROFILE_DOCUMENTS,
        UpdateSoftDescriptor: accounts_endpoints_1.AccountsEndpoints.UPDATE_SOFT_DESCRIPTOR,
        DeleteShareholder: accounts_endpoints_1.AccountsEndpoints.DELETE_SHAREHOLDER,
        GetPayoutSettings: accounts_endpoints_1.AccountsEndpoints.GET_PAYOUTS_SETTINGS,
        UpdatePayoutSettings: accounts_endpoints_1.AccountsEndpoints.UPDATE_PAYOUTS_SETTINGS,
    },
    Balance: {
        GetBalance: balance_endpoints_1.BalanceEndpoints.API_BALANCE,
    },
    Payouts: {
        GetPayouts: payouts_endpoints_1.PayoutsEndpoints.API_PAYOUT,
        GetPayoutById: payouts_endpoints_1.PayoutsEndpoints.PAYOUT_BY_ID,
    },
    User: {
        GetProfileImage: profile_endpoints_1.ProfileEndpoints.GET_PROFILE_IMAGE,
        GetUserData: profile_endpoints_1.ProfileEndpoints.GET_USER_DATA,
    },
    Meta: {
        GetInitialData: meta_endpoints_1.MetaEndpoints.INITIAL_DATA,
        GetBalanceInitialData: meta_endpoints_1.MetaEndpoints.BALANCE_INITIAL_DATA,
        ValidatePhoneNumber: meta_endpoints_1.MetaEndpoints.VALIDATE_PHONE_NUMBER,
        CountryTranslations: meta_endpoints_1.MetaEndpoints.COUNTRY_TRANSLATIONS,
    },
    Payables: {
        GetPayables: payables_endpoints_1.PayablesEndpoints.API_PAYABLE,
        GetPayablesToCsv: payables_endpoints_1.PayablesEndpoints.EXPORT_TO_CSV,
    },
    Media: {
        getAuthHeader: media_platform_endpoints_1.MediaPlatformEndpoints.AUTH_HEADER,
    },
    Site: {
        GetSiteInfo: site_endpoints_1.SiteEndpoints.API_SITE_INFO,
    },
    Transactions: {
        GetFilters: transactions_endpoints_1.TransactionsEndpoints.LIST_FILTERS,
    },
};
//# sourceMappingURL=common.js.map