import {
  objectType,
  extendType,
  stringArg,
  nonNull,
  intArg,
  enumType,
  floatArg,
} from "nexus";
import TransactionData from "../../sample-data/dummy-transactions.json";
import { plaidClient } from "../config/PlaidConfiguration";
import dayjs from "dayjs";
import { TransactionsGetRequest } from "plaid";

export const Transaction = objectType({
  name: "Transaction",
  definition(t) {
    t.nonNull.int("id");
    t.int("userId");
    t.field("User", { type: "User" });
    t.int("accountId");
    t.field("Account", {
      type: "Account",
    });
    t.field("io", {
      type: "InOrOutEnum",
      resolve(root, _args, _ctx) {
        if (root.amount >= 0) {
          return "IN";
        } else {
          return "OUT";
        }
      },
    });
    t.string("name");
    t.nonNull.string("merchantName");
    t.nonNull.float("amount");
    t.nonNull.int("date");
    t.string("category");
    t.nonNull.string("plaidId");
  },
});

export const TransactionQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("allTransactions", {
      type: "Transaction",
      async resolve(_root, _args, ctx) {
        const transactions = await ctx.db.transaction.findMany();
        if (!transactions) {
          throw new Error("Error whilst fetching transactions.");
        }
        return transactions;
      },
    });
    t.nonNull.list.nonNull.field("getTransactionsByUserId", {
      type: "Transaction",
      args: {
        userId: nonNull(intArg()),
      },
      resolve: async (_root, args, ctx) => {
        const transactions = await ctx.db.transaction.findMany({
          where: {
            userId: args.userId,
          },
          include: {
            Account: {
              select: {
                id: true,
                name: true,
              }
            }
          }
        });
        if (!transactions) {
          throw new Error("Error while fetching transactions.");
        }
        return transactions;
      },
    });
    t.nonNull.field("getTransactionById", {
      type: "Transaction",
      args: {
        id: nonNull(intArg()),
      },
      async resolve(_root, args, ctx) {
        const transaction = await ctx.db.transaction.findUnique({
          where: { id: args.id },
        });
        if (!transaction) {
          throw new Error(`No transaction with id ${args.id} found.`);
        }
        return transaction;
      },
    });
  },
});

export const TransactionMutations = extendType({
  type: "Mutation",
  definition(t) {
    // t.nonNull.field("seedDummyTransactions", {
    //   type: "Boolean",
    //   args: {
    //     userId: nonNull(intArg()),
    //   },
    //   async resolve(_root, args, ctx) {
    //     try {
    //       TransactionData.transactions.forEach(async (transaction) => {
    //         await ctx.db.transaction.create({
    //           data: {
    //             ...transaction,
    //             User: {
    //               connect: {
    //                 id: args.userId,
    //               },
    //             },
    //             Account: {
    //               connect: {
    //                 id: args.accountId,
    //               }
    //             }
    //           },
    //         });
    //       });
    //       return true;
    //     } catch (error) {
    //       console.error("Error while seeding transactions: ", error);
    //       return false;
    //     }
    //   },
    // });
    /**
     * @param access_token This is the access you get affter exchanging the public token
     * @param start_date Start date of transactions you want to fetch
     * @param end_date To what date you want to fetch to this should be Date.now() but for now this is okay
     * @returns transactions[] this is an array of transcations basically a bunch of objects that you can refer back to the plaid api if you want more details
     */
    t.nonNull.list.nonNull.field("upsertTransactionsFromPlaid", {
      type: "Transaction",
      args: {
        userId: intArg(),
        accountId: intArg(),
        accessToken: nonNull(stringArg()),
        startDate: nonNull(stringArg()),
        endDate: nonNull(stringArg()),
      },
      async resolve(_root, args, ctx) {
        if (!args.userId && !args.accountId) {
          throw new Error(
            "Transaction need to be associated with an user or an account"
          );
        }
        const transactionsRequest = {
          access_token: args.accessToken,
          start_date: args.startDate,
          end_date: args.endDate,
        };

        const plaidResponse = await plaidClient.transactionsGet(
          transactionsRequest
        );

        const totalTransactionCount = plaidResponse.data.total_transactions;
        let plaidTransactions = plaidResponse.data.transactions;
        while (plaidTransactions.length < totalTransactionCount) {
          const paginatedRequest: TransactionsGetRequest = {
            access_token: args.accessToken,
            start_date: args.startDate,
            end_date: args.endDate,
            options: {
              offset: plaidTransactions.length,
            },
          };
          const paginatedResponse = await plaidClient.transactionsGet(
            paginatedRequest
          );
          plaidTransactions = plaidTransactions.concat(
            paginatedResponse.data.transactions
          );
        }

        if (!plaidTransactions) {
          throw new Error("Error whilst fetching transactions from Plaid");
        }
        const transactions = plaidTransactions.map((transaction) => ({
          merchantName: transaction.merchant_name ?? transaction.name,
          amount: transaction.amount,
          date: dayjs(transaction.date).unix(),
          plaidId: transaction.transaction_id,
        }));

        if (args.userId) {
          await ctx.db.user.findFirstOrThrow({
            where: {
              id: args.userId,
            },
          });
        }

        if (args.accountId) {
          await ctx.db.account.findFirstOrThrow({
            where: {
              id: args.accountId,
            },
          });
        }

        const createdTransactions = await Promise.all(
          transactions.map((transaction) =>
            ctx.db.transaction.upsert({
              where: {
                plaidId: transaction.plaidId,
              },
              update: {
                ...transaction,
                ...(args.userId && {
                  User: {
                    connect: {
                      id: args.userId,
                    },
                  },
                }),
                ...(args.accountId && {
                  Account: {
                    connect: {
                      id: args.accountId,
                    },
                  },
                }),
              },
              create: {
                ...transaction,
                ...(args.userId && {
                  User: {
                    connect: {
                      id: args.userId,
                    },
                  },
                }),
                ...(args.accountId && {
                  Account: {
                    connect: {
                      id: args.accountId,
                    },
                  },
                }),
              },
            })
          )
        );

        if (!createdTransactions) {
          throw new Error("Error whilst creating transactions in the database");
        }
        return createdTransactions;
      },
    });
    t.nonNull.field("createTransaction", {
      type: "Transaction",
      args: {
        userId: nonNull(intArg()),
        accountId: intArg(),
        name: stringArg(),
        merchantName: nonNull(stringArg()),
        amount: nonNull(floatArg()),
        date: nonNull(intArg()),
        category: stringArg(),
        plaidId: nonNull(stringArg()),
      },
      resolve: async (_root, args, ctx) => {
        const transaction = await ctx.db.transaction.create({
          data: {
            User: {
              connect: {
                id: args.userId,
              },
            },
            ...(args.accountId && {
              Account: {
                connect: {
                  id: args.accountId,
                },
              },
            }),
            name: args.name,
            merchantName: args.merchantName,
            amount: args.amount,
            date: args.date,
            category: args.category,
            plaidId: args.plaidId,
          },
        });
        if (!transaction) {
          throw new Error("Error when creating transaction");
        }
        return transaction;
      },
    });
    t.field("deleteTransaction", {
      type: "Transaction",
      args: {
        id: nonNull(intArg()),
      },
      async resolve(_root, args, ctx) {
        return await ctx.db.transaction.delete({
          where: {
            id: args.id,
          },
        });
      },
    });
  },
});

export const InOrOutEnum = enumType({
  name: "InOrOutEnum",
  members: {
    IN: "IN",
    OUT: "OUT",
  },
});
