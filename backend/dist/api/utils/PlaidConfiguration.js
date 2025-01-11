"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configuration = void 0;
const plaid_1 = require("plaid");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.configuration = new plaid_1.Configuration({
    basePath: plaid_1.PlaidEnvironments.sandbox,
    baseOptions: {
        headers: {
            'PLAID-CLIENT-ID': process.env.PLAIDCLIENTID,
            'PLAID-SECRET': process.env.PLAIDSECRET,
        },
    },
});
//# sourceMappingURL=PlaidConfiguration.js.map