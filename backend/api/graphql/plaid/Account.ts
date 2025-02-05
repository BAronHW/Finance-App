import { extendType, floatArg, intArg, list, nonNull, objectType, stringArg } from "nexus";
import { plaidClient } from "../../config/PlaidConfiguration";

export const Account = objectType({
  name: "Account",
  definition(t) {
    t.nonNull.int("id");
    t.string("mask");
    t.nonNull.string("name");
    t.string("officialName");
    t.string("subtype");
    t.string("type");
    t.list.nonNull.field("Transactions", {
      type: "Transaction",
    });
    t.int("userId");
    t.field("User", {
      type: "User"
    });
    t.string("plaidId");
    t.float("available");
    t.float("current");
    t.string("isoCurrencyCode");
    t.string("unofficialCurrencyCode");
    t.float("limit");
  },
});

export const AccountQueries = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("getAccountsByUserId", {
      type: "Account",
      args: {
        userId: nonNull(intArg()),
      },
      resolve: async (_root, args, ctx) => {
        const accounts = await ctx.db.account.findMany({
          where: {
            userId: args.userId,
          },
          include: {
            User: true,
            Transactions: true,
          }
        })
        if (!accounts) {
          throw new Error(`Error: unable find accounts associated with user with id ${args.userId}.`)
        }
        return accounts;
      }
    })
    t.nonNull.list.nonNull.field("getAllAccounts", {
      type: "Account",
      resolve: async (_root, _args, ctx) => {
        const accounts = await ctx.db.account.findMany({
          include: {
            User: true,
            Transactions: true,
          }
        });
        if (!accounts) {
          throw new Error("Error whilst fetching all accounts")
        }
        return accounts;
      }
    })
  },
})

export const AccountMutations = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createAccount", {
      type: "Account",
      args: {
        userId: nonNull(intArg()),
        mask: stringArg(),
        name: nonNull(stringArg()),
        officialName: stringArg(),
        type: nonNull(stringArg()),
        subtype: stringArg(),
        plaidId: nonNull(stringArg()),
        available: nonNull(floatArg()),
        current: nonNull(floatArg()),
        isoCurrencyCode: stringArg(),
        unofficialCurrencyCode: stringArg(),
        limit: floatArg(),
      },
      resolve: async (_root, args, ctx) => {
        const accountIfExists = await ctx.db.account.findFirst({
          where: {
            plaidId: args.plaidId,
          }
        })
        if (accountIfExists) {
          throw new Error("Error creating account: Account with this Plaid account_id already exists.");
        }
        const account = await ctx.db.account.create({
          data: {
            User: {
              connect: {
                id: args.userId,
              }
            },
            mask: args.mask,
            name: args.name,
            officialName: args.officialName,
            subtype: args.subtype,
            type: args.type,
            plaidId: args.plaidId,
            available: args.available,
            current: args.current,
            isoCurrencyCode: args.isoCurrencyCode,
            unofficialCurrencyCode: args.unofficialCurrencyCode,
            limit: args.limit,
          },
          include: {
            User: true,
          }
        });
        if (!account) {
          throw new Error("Error while creating account");
        };
        return account;
      },
    });
    t.nonNull.list.nonNull.field("upsertAccountsFromPlaid", {
      type: "Account",
      args: {
        userId: nonNull(intArg()),
        accessToken: nonNull(stringArg()),
      },
      resolve: async (_root, args, ctx) => {
        const plaidRequestObject = {
          access_token: args.accessToken,
        };
        const plaidResponse = await plaidClient.accountsBalanceGet(
          plaidRequestObject
        );
        const accounts = plaidResponse.data.accounts;

        if (!accounts) {
          throw new Error("Error: Unable to fetch account data from Plaid")
        }

        const newAccounts = await Promise.all(accounts.map((account) => {
          return ctx.db.account.upsert({
            where: {
              plaidId: account.account_id,
            },
            update: {
              mask: account.mask,
              name: account.name,
              officialName: account.official_name,
              type: account.type,
              subtype: account.subtype,
              User: {
                connect: {
                  id: args.userId,
                }
              },
              available: account.balances.available,
              current: account.balances.current,
              isoCurrencyCode: account.balances.iso_currency_code,
              unofficialCurrencyCode: account.balances.unofficial_currency_code,
              limit: account.balances.limit,
            },
            create: {
              plaidId: account.account_id,
              mask: account.mask,
              name: account.name,
              officialName: account.official_name,
              type: account.type,
              subtype: account.subtype,
              User: {
                connect: {
                  id: args.userId,
                }
              },
              available: account.balances.available,
              current: account.balances.current,
              isoCurrencyCode: account.balances.iso_currency_code,
              unofficialCurrencyCode: account.balances.unofficial_currency_code,
              limit: account.balances.limit,
            }
          })
        }))
        if (!newAccounts) {
          throw new Error("Error whilst upserting account");
        }

        return newAccounts;
      }
    });
    t.nonNull.field("deleteAccount", {
      type: "Account",
      args: {
        id: nonNull(intArg()),
      },
      resolve: async (_root, args, ctx) => {
        const account = await ctx.db.account.delete({
          where: {
            id: args.id,
          }
        })
        if (!account) {
          throw new Error("Account deleted.")
        }
        return account;
      }
    });
  }});
