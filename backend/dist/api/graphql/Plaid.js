"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaidMutations = exports.types = exports.LinkToken = void 0;
const plaid_1 = require("plaid");
const PlaidConfiguration_1 = require("../utils/PlaidConfiguration");
const nexus_1 = require("nexus");
const plaidClient = new plaid_1.PlaidApi(PlaidConfiguration_1.configuration);
exports.LinkToken = (0, nexus_1.objectType)({
    name: 'LinkToken',
    definition(t) {
        t.string('link_token');
        t.string('expiration');
        t.string('request_id');
    },
});
exports.types = [exports.LinkToken];
exports.PlaidMutations = (0, nexus_1.extendType)({
    type: 'Mutation',
    definition(t) {
        t.field('createLinkToken', {
            type: 'LinkToken',
            args: {
                userId: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()), // You might want to get this from context instead
            },
            async resolve(_root, args, ctx) {
                try {
                    const plaidRequest = {
                        user: {
                            client_user_id: args.userId, // Use the passed userId
                        },
                        client_name: 'Plaid Test App',
                        products: ['auth'],
                        language: 'en',
                        redirect_uri: 'http://localhost:3000/',
                        country_codes: ['GB'],
                    };
                    const createTokenResponse = await plaidClient.linkTokenCreate(plaidRequest);
                    return {
                        link_token: createTokenResponse.data.link_token,
                        expiration: createTokenResponse.data.expiration,
                        request_id: createTokenResponse.data.request_id,
                    };
                }
                catch (error) {
                    console.error('Error creating link token:', error);
                    throw new Error('Failed to create link token');
                }
            },
        });
    },
});
//# sourceMappingURL=Plaid.js.map