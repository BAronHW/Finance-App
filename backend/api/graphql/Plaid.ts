import { CountryCode, PlaidApi, PlaidEnvironments, Products } from "plaid";
import { configuration } from "../utils/PlaidConfiguration";
import { extendType, intArg, nonNull, objectType, scalarType, stringArg } from "nexus";
import { Any } from '../utils/Scalar'

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


/**
 * @param userId : an Integer that is the id of the user you wish to get access token for
 * The idea of this query is to decrease the number of queries that you would need to make to the plaidAPI
 */

export const PlaidQueries = extendType({
  type: 'Query',
  definition(t) {
    t.field('fetchAccessTokenFromDB', {
      type: 'AccessToken',
      args: {
        userId: nonNull(intArg())
      },
      async resolve(_root, args, ctx) {
        try{
          const user = await ctx.db.user.findUnique({
            where: {
              id: args.userId
            }
          })
          console.log(user)
          return{
            accessToken: user?.AccessToken
          }
        }catch(err){
          console.log(err)
        }
      }
    })
  }

});


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
                products: ['auth', 'transactions'] as Products[],
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
       * @param access_token This is the access you get affter exchanging the public token
       * @param start_date Start date of transactions you want to fetch
       * @param end_date To what date you want to fetch to this should be Date.now() but for now this is okay
       * @returns transactions[] this is an array of transcations basically a bunch of objects that you can refer back to the plaid api if you want more details
       */
      t.field('get_transaction_data', {
        type: 'Any', // this is terrible 
        args: {
          access_token: nonNull(stringArg()),
          start_date: nonNull(stringArg()),
          end_date: nonNull(stringArg()),
        },
        async resolve(_root, args, ctx){
          try{
            // const acccess_token = args.access_token;
            // const start_date = args.start_date;
            // const end_date = args.end_date;

            const transactionsRequest = {
              access_token: args.access_token,
              start_date: args.start_date || '2018-01-01',
              end_date: args.end_date || '2020-02-01',
            }

            // fuck functional programming hahahahahah just joking. I need to change this later but for now this works
            let allTransactions: any = [];
            let hasMore = true;

            while (hasMore) {
              const plaidResponse = await plaidClient.transactionsGet(transactionsRequest);
              const newTransactions = plaidResponse.data.transactions;
              allTransactions = allTransactions.concat(newTransactions);
              
              hasMore = allTransactions.length < plaidResponse.data.total_transactions;
            }

            //we may want to filter some of the items before returning

            return{
              transactions: allTransactions
            }
            
          }catch(err){
            console.log(err)
          }
        }
        
      })
      t.field('get_balance', {
        type: 'Any', //terrible once again fix later
        args:{
          access_token: nonNull(stringArg())
        },
        resolve: async (_root, args, ctx) => {
          const plaidReqObj = {
            access_token: args.access_token
          }
          try{
            const plaidResponse = await plaidClient.accountsBalanceGet(plaidReqObj);
            const accounts = plaidResponse.data.accounts;

            return{
              accounts_arr: accounts
            }
          }catch(err){
            console.log(err);
          }
        }
      })
    },
  });

// need to implement mutation called public token exchange
//*
// public_token_exchange takes public token from client applicaiton (front-end) then exchanges it for a access token 
//  */ 