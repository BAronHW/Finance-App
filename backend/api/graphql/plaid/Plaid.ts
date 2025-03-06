import { CountryCode, PlaidApi, PlaidEnvironments, Products } from "plaid";
import { configuration } from "../../config/PlaidConfiguration";
import {
  extendType,
  intArg,
  nonNull,
  objectType,
  scalarType,
  stringArg,
} from "nexus";

const plaidClient = new PlaidApi(configuration);

export const LinkToken = objectType({
  name: "LinkToken",
  definition(t) {
    t.string("link_token");
    t.string("expiration");
    t.string("request_id");
  },
});

export const AccessToken = objectType({
  name: "AccessToken",
  definition(t) {
    t.string("accessToken");
    t.string("item_id");
    t.string("request_id");
  },
});

export const Item = objectType({
  name: "Item",
  definition(t) {
    t.list.string("available_products");
    t.list.string("billed_products");
    t.nullable.string("consent_expiration_time");
    t.nullable.string("error");
    t.string("institution_id");
    t.string("institution_name");
    t.string("item_id");
    t.string("update_type");
    t.string("webhook");
    t.string("auth_method");
  },
});

export const PersonalFinanceCategory = objectType({
  name: "PersonalFinanceCategory",
  definition(t) {
    t.string("primary");
    t.string("detailed");
    t.string("confidence_level");
  },
});

export const PaymentMeta = objectType({
  name: "PaymentMeta",
  definition(t) {
    t.nullable.string("by_order_of");
    t.nullable.string("payee");
    t.nullable.string("payer");
    t.nullable.string("payment_method");
    t.nullable.string("payment_processor");
    t.nullable.string("ppd_id");
    t.nullable.string("reason");
    t.nullable.string("reference_number");
  },
});

export const Location = objectType({
  name: "Location",
  definition(t) {
    t.nullable.string("address");
    t.nullable.string("city");
    t.nullable.string("region");
    t.nullable.string("postal_code");
    t.nullable.string("country");
    t.nullable.float("lat");
    t.nullable.float("lon");
    t.nullable.string("store_number");
  },
});

export const Counterparty = objectType({
  name: "Counterparty",
  definition(t) {
    t.string("name");
    t.string("type");
    t.string("logo_url");
    t.string("website");
    t.string("entity_id");
    t.string("confidence_level");
  },
});

export const TransactionRes = objectType({
  name: "TransactionRes",
  definition(t) {
    t.list.field("accounts", {
      type: "Account",
    });
    t.list.field("transactions", {
      type: "Transaction",
    });
    t.field("item", {
      type: "Item",
    });
    t.int("total_transactions");
    t.string("request_id");
  },
});

// https://plaid.com/docs/api/products/transactions/#transactionsget refer back to this api doc to see the response and request fields required

/**
 * @param userId : an Integer that is the id of the user you wish to get access token for
 *
 * The idea of this query is to decrease the number of queries that you would need to make to the plaidAPI
 */

export const PlaidMutations = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createLinkToken", {
      type: "LinkToken",
      async resolve(_root, args, ctx) {
        try {
          const plaidRequest = {
            user: {
              client_user_id: "26",
            },
            client_name: "Plaid Test App",
            products: ["auth", "transactions"] as Products[],
            language: "en",
            redirect_uri: "http://localhost:3000/", // make sure this is localhost 3000 for the frontend
            country_codes: ["GB"] as CountryCode[],
          };

          const createTokenResponse = await plaidClient.linkTokenCreate(
            plaidRequest
          );

          return {
            link_token: createTokenResponse.data.link_token,
            expiration: createTokenResponse.data.expiration,
            request_id: createTokenResponse.data.request_id,
          };
        } catch (error) {
          console.error("Error creating link token:", error);
          throw new Error("Failed to create link token");
        }
      },
    });
    t.nonNull.string("exchangePublicToken", {
      args: {
        userId: nonNull(intArg()),
        public_token: nonNull(stringArg()),
      },
      async resolve(_root, args, ctx) {
        const publicToken = args.public_token;

        const user = await ctx.db.user.findUnique({
          where: { id: args.userId },
        });

        if (!user) {
          throw new Error("User not found");
        }

        const plaidResponse = await plaidClient.itemPublicTokenExchange({
          public_token: args.public_token,
        });

        const accessToken = plaidResponse.data.access_token;
        const itemId = plaidResponse.data.item_id;
        const requestId = plaidResponse.data.request_id;

        await ctx.db.user.update({
          where: {
            id: args.userId,
          },
          data: {
            AccessToken: accessToken,
          },
        });
        
        return accessToken;
      },
    });
  },
});
