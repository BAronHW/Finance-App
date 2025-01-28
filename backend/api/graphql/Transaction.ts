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
import { Account } from "aws-sdk";
import { connectAuthEmulator } from "firebase/auth";

export const Transaction = objectType({
  name: "Transaction",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.int("userId");
    t.nonNull.field("User", { type: "User" });
    t.int("accountId");
    t.field("Account", { type: "Account" });
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
        const transactions = await ctx.db.transaction.findMany({
          include: {
            User: true,
          },
        });
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
            User: true,
          },
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
          include: {
            User: true,
          },
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
    t.nonNull.list.nonNull.field("upsertTransactions", {
      type: "Transaction",
      args: {
        userId: nonNull(intArg()),
        accountId: intArg(),
        access_token: nonNull(stringArg()),
        start_date: nonNull(stringArg()),
        end_date: nonNull(stringArg()),
      },
      async resolve(_root, args, ctx) {
        // const acccess_token = args.access_token;
        // const start_date = args.start_date;
        // const end_date = args.end_date;

        const transactionsRequest = {
          access_token: args.access_token,
          start_date: args.start_date || "2018-01-01",
          end_date: args.end_date || "2020-02-01",
        };

        // // fuck functional programming hahahahahah just joking. I need to change this later but for now this works
        // let allTransactions: any = [];
        // let hasMore = true;

        // while (hasMore) {
        //   const plaidResponse = await plaidClient.transactionsGet(
        //     transactionsRequest
        //   );
        //   const newTransactions = plaidResponse.data.transactions;
        //   allTransactions = allTransactions.concat(newTransactions);

        //   hasMore =
        //     allTransactions.length < plaidResponse.data.total_transactions;
        // }

        //we may want to filter some of the items before returning
        const plaidResponse = await plaidClient.transactionsGet(
          transactionsRequest
        );

        if (!plaidResponse.data.transactions) {
          throw new Error("Error whilst fetching transactions from Plaid");
        }
        const transactions = plaidResponse.data.transactions.map(
          (transaction) => ({
            merchantName: transaction.merchant_name ?? transaction.name,
            amount: transaction.amount,
            date: dayjs(transaction.date).unix(),
            plaidId: transaction.transaction_id,
          })
        );

        console.log(transactions.length);

        const createdTransactions = await Promise.all(
          transactions.map((transaction) =>
            ctx.db.transaction.create({
              data: {
                ...transaction,
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
        accountId: nonNull(intArg()),
        name: stringArg(),
        merchantName: nonNull(stringArg()),
        amount: nonNull(floatArg()),
        date: nonNull(intArg()),
        category: stringArg(),
      },
      resolve: async (_root, args, ctx) => {
        const transaction = await ctx.db.transaction.create({
          data: {
            userId: args.userId,
            User: {
              connect: {
                id: args.userId,
              },
            },
            accountId: args.accountId,
            Account: {
              connect: {
                id: args.accountId,
              },
            },
            name: args.name,
            merchantName: args.merchantName,
            amount: args.amount,
            date: args.date,
            category: args.category,
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
