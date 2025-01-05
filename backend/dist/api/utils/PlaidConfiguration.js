"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configuration = void 0;
const plaid_1 = require("plaid");
// Initialize Plaid client
exports.configuration = new plaid_1.Configuration({
    basePath: plaid_1.PlaidEnvironments.sandbox,
    baseOptions: {
        headers: {
            'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
            'PLAID-SECRET': process.env.PLAID_SECRET,
        },
    },
});
//# sourceMappingURL=PlaidConfiguration.js.map