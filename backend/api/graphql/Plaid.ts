import { CountryCode, PlaidApi, PlaidEnvironments, Products } from "plaid";
import { configuration } from "../utils/PlaidConfiguration";
import { extendType, nonNull, objectType, stringArg } from "nexus";

const plaidClient = new PlaidApi(configuration);

export const LinkToken = objectType({
    name: 'LinkToken',
    definition(t) {
        t.string('link_token')
        t.string('expiration')
        t.string('request_id')
    },
});

export const types = [LinkToken];

export const PlaidMutations = extendType({
    type: 'Mutation',
    definition(t) {
      t.field('createLinkToken', {
        type: 'LinkToken',
        args: {
          userId: nonNull(stringArg()), // You might want to get this from context instead
        },
        async resolve(_root, args, ctx) {
          try {
            const plaidRequest = {
                user: {
                  client_user_id: args.userId,  // Use the passed userId
                },
                client_name: 'Plaid Test App',
                products: ['auth'] as Products[],
                language: 'en',
                redirect_uri: 'http://localhost:3000/',
                country_codes: ['GB'] as CountryCode[],
              };
  
            const createTokenResponse = await plaidClient.linkTokenCreate(plaidRequest);
            
            return {
              link_token: createTokenResponse.data.link_token,
              expiration: createTokenResponse.data.expiration,
              request_id: createTokenResponse.data.request_id,
            };
          } catch (error) {
            console.error('Error creating link token:', error);
            throw new Error('Failed to create link token');
          }
        },
      });
    },
  });