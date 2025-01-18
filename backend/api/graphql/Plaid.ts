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

export const Account = objectType({
  name: 'Account',
  definition(t) {
    t.string('account_id')
    t.field('balances', { type: 'Balances' })
    t.string('mask')
    t.string('name')
    t.string('official_name')
    t.string('subtype')
    t.string('type')
  }
})

export const Balances = objectType({
  name: 'Balances',
  definition(t) {
    t.float('available')
    t.float('current')
    t.string('iso_currency_code')
    t.nullable.float('limit')
    t.nullable.string('unofficial_currency_code')
  }
})

export const Item = objectType({
  name: 'Item',
  definition(t) {
    t.list.string('available_products')
    t.list.string('billed_products')
    t.nullable.string('consent_expiration_time')
    t.nullable.string('error')
    t.string('institution_id')
    t.string('institution_name')
    t.string('item_id')
    t.string('update_type')
    t.string('webhook')
    t.string('auth_method')
  },
})

export const PersonalFinanceCategory = objectType({
  name: 'PersonalFinanceCategory',
  definition(t) {
    t.string('primary')
    t.string('detailed')
    t.string('confidence_level')
  },
})

export const PaymentMeta = objectType({
  name: 'PaymentMeta',
  definition(t) {
    t.nullable.string('by_order_of')
    t.nullable.string('payee')
    t.nullable.string('payer')
    t.nullable.string('payment_method')
    t.nullable.string('payment_processor')
    t.nullable.string('ppd_id')
    t.nullable.string('reason')
    t.nullable.string('reference_number')
  },
})

export const Location = objectType({
  name: 'Location',
  definition(t) {
    t.nullable.string('address')
    t.nullable.string('city')
    t.nullable.string('region')
    t.nullable.string('postal_code')
    t.nullable.string('country')
    t.nullable.float('lat')
    t.nullable.float('lon')
    t.nullable.string('store_number')
  },
})

export const Counterparty = objectType({
  name: 'Counterparty',
  definition(t) {
    t.string('name')
    t.string('type')
    t.string('logo_url')
    t.string('website')
    t.string('entity_id')
    t.string('confidence_level')
  },
})

export const TransactionRes = objectType({
  name: 'TransactionRes',
  definition(t) {
    t.list.field('accounts', {
      type: 'Account'
    })
    t.list.field('transactions', {
      type: 'Transaction'
    })
    t.field('item', {
      type: 'Item'
    })
    t.int('total_transactions')
    t.string('request_id')
  }
})

// https://plaid.com/docs/api/products/transactions/#transactionsget refer back to this api doc to see the response and request fields required



export const PlaidMutations = extendType({
    type: 'Mutation',
    definition(t) {
      t.field('createLinkToken', {
        type: 'LinkToken',
        // args: {
        //   userId: nonNull(stringArg()),
        // },
        async resolve(_root, args, ctx) {
          try {
            // const user = await ctx.db.user.findUnique({
            //     where: {
            //         id: parseInt(args.userId)
            //     },
            // })
            // if(!user){
            //     throw new Error("No User with this id found")
            // }

            const plaidRequest = {
                user: {
                  client_user_id: "1",
                },
                client_name: 'Plaid Test App',
                products: ['auth'] as Products[],
                language: 'en',
                redirect_uri: 'http://localhost:3000/', //make sure this is localhost 3000 for the frontend 
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
          userId: nonNull(stringArg()),
          public_token: nonNull(stringArg()),
        },
        async resolve(_root, args, ctx) {
          const publicToken = args.public_token;
          try {
            /**
             * Get the access token object from the plaid api.
             */
            
              const user = await ctx.db.user.findUnique({
                where: { id: parseInt(args.userId) }
              });

              if (!user) {
                throw new Error('User not found');
              }

              const plaidResponse = await plaidClient.itemPublicTokenExchange({
                public_token: args.public_token,
              });
  
              const accessToken = plaidResponse.data.access_token;
              const itemId = plaidResponse.data.item_id;
              const requestId = plaidResponse.data.request_id;

              // console.log(accessToken);

              // store the accesstoken in the db
              await ctx.db.user.update({
                where: {
                  id: parseInt(args.userId)
                },
                data:{
                  AccessToken: accessToken
                }
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
      /**
       * Finish the get_transaction_data mutation
       */
      // t.field('get_transaction_data', {
        
      // })
    },
  });

// need to implement mutation called public token exchange
//*
// public_token_exchange takes public token from client applicaiton (front-end) then exchanges it for a access token 
//  */ 