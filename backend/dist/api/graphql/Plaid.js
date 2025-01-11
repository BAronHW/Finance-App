"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaidMutations = exports.AccessToken = exports.LinkToken = void 0;
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
exports.AccessToken = (0, nexus_1.objectType)({
    name: 'AccessToken',
    definition(t) {
        t.string('accessToken');
        t.string("item_id");
        t.string("request_id");
    }
});
exports.PlaidMutations = (0, nexus_1.extendType)({
    type: 'Mutation',
    definition(t) {
        t.field('createLinkToken', {
            type: 'LinkToken',
            args: {
                userId: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
            },
            async resolve(_root, args, ctx) {
                try {
                    const user = await ctx.db.user.findUnique({
                        where: {
                            id: parseInt(args.userId)
                        },
                    });
                    if (!user) {
                        throw new Error("No User with this id found");
                    }
                    await ctx.db.user.update({
                        where: {
                            id: parseInt(args.userId)
                        },
                        data: {}
                    });
                    const plaidRequest = {
                        user: {
                            client_user_id: args.userId,
                        },
                        client_name: 'Plaid Test App',
                        products: ['auth'],
                        language: 'en',
                        redirect_uri: 'http://localhost:4000/', //make sure this is localhost 3000 for the frontend 
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
        t.field('exchangePublicToken', {
            type: "PublicToken",
            args: {}
        });
    },
});
// need to implement mutation called public token exchange
//*
// public_token_exchange takes public token from client applicaiton (front-end) then exchanges it for a access token 
//  */ 
//# sourceMappingURL=Plaid.js.map