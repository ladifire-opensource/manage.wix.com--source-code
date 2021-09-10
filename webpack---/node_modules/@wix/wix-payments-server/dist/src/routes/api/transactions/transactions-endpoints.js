"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsEndpoints = void 0;
var TransactionsEndpoints;
(function (TransactionsEndpoints) {
    TransactionsEndpoints["API_TRANSACTIONS"] = "api/transactions";
    TransactionsEndpoints["TRANSACTION_BY_ID"] = "api/transactions/byId";
    TransactionsEndpoints["TRANSACTION_REFUND"] = "api/transactions/refund";
    TransactionsEndpoints["INITIATE_TOP_UP_TRANSACTION"] = "api/transactions/topUp";
    TransactionsEndpoints["HAS_FIRST_TRANSACTION"] = "api/transactions/has-first";
    TransactionsEndpoints["LIST_FILTERS"] = "api/transactions/filters";
    // Cashier's transactions
    TransactionsEndpoints["CASHIER_TRANSACTIONS"] = "api/transactions/cashier";
    TransactionsEndpoints["CASHIER_TRANSACTION_BY_ID"] = "api/transactions/cashier/byId";
    TransactionsEndpoints["CASHIER_TRANSACTIONS_OVERVIEW"] = "api/transactions/cashier/overview";
    // TODO remove this from dashboard usage when UTT3 will be released with new translations
    TransactionsEndpoints["NON_DASHBOARD_CASHIER_TRANSACTIONS_EXPORT_TO_CSV"] = "api/transactions/cashier-csv-export/transactions";
    TransactionsEndpoints["CASHIER_TRANSACTIONS_EXPORT_TO_CSV"] = "api/transactions/cashier/export-to-csv";
    // Disputes/Chargebacks
    TransactionsEndpoints["CHARGEBACK_ACCEPT"] = "api/transactions/chargeback/accept";
    TransactionsEndpoints["CHARGEBACK_DISPUTE"] = "api/transactions/chargeback/dispute";
    TransactionsEndpoints["CHARGEBACK_ESTIMATE_FILE_SIZE"] = "api/transactions/chargeback/estimate-file-size";
})(TransactionsEndpoints = exports.TransactionsEndpoints || (exports.TransactionsEndpoints = {}));
//# sourceMappingURL=transactions-endpoints.js.map