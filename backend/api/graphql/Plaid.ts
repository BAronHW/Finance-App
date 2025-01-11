import { CountryCode, PlaidApi, PlaidEnvironments, Products } from "plaid";
import { configuration } from "../utils/PlaidConfiguration";
import { extendType, intArg, nonNull, objectType, stringArg } from "nexus";

const plaidClient = new PlaidApi(configuration);

export const LinkToken = objectType({
    name: 'LinkToken',
    definition(t) {
        t.string('link_token')
        t.string('expiration')
        t.string('request_id')
    },
});

export const AccessToken = objectType({
  name: 'AccessToken',
  definition(t) {
    t.string('accessToken')
    t.string("item_id")
    t.string("request_id")
  }
})

export const PlaidMutations = extendType({
    type: 'Mutation',
    definition(t) {
      t.field('createLinkToken', {
        type: 'LinkToken',
        args: {
          userId: nonNull(stringArg()),
        },
        async resolve(_root, args, ctx) {
          try {
            const user = await ctx.db.user.findUnique({
                where: {
                    id: parseInt(args.userId)
                },
            })
            if(!user){
                throw new Error("No User with this id found")
            }

            const plaidRequest = {
                user: {
                  client_user_id: args.userId,
                },
                client_name: 'Plaid Test App',
                products: ['auth'] as Products[],
                language: 'en',
                redirect_uri: 'http://localhost:4000/', //make sure this is localhost 3000 for the frontend 
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
      t.field('exchangePublicToken', {
        type: 'AccessToken',
        args: {
          userId: nonNull(intArg()),
          public_token: nonNull(stringArg()),
        },
        async resolve(_root, args, ctx) {
          const publicToken = args.public_token;
          try {
            /**
             * Get the access token object from the plaid api.
             */

              const plaidResponse = await plaidClient.itemPublicTokenExchange({
                public_token: publicToken,
              });
  
              const accessToken = plaidResponse.data.access_token;
              const itemID = plaidResponse.data.item_id;

              // store the accesstoken in the db
              await ctx.db.user.findUnique({
                where: {
                  id: args.userId
                },
              })
  
              return {
                accessToken: accessToken
              };
          } catch(err) {
              console.log(err);
              throw new Error('Failed to exchange public token: ' + err);
          }
        }
      });
    },
  });

// need to implement mutation called public token exchange
//*
// public_token_exchange takes public token from client applicaiton (front-end) then exchanges it for a access token 
//  */ 