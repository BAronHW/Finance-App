import {
  objectType,
  extendType,
  stringArg,
  nonNull,
  intArg,
  enumType,
  floatArg,
  list,
  booleanArg,
} from "nexus";
import { plaidClient } from "../config/PlaidConfiguration";
import dayjs from "dayjs";
import {
  TransactionsGetRequest,
  TransactionsRuleField,
  TransferDocumentPurpose,
} from "plaid";
import { categoriseTransactions } from "../services/autoCategorisation";
import { Category } from "./Category";

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
        if (root.amount && root.amount >= 0) {
          return "OUT";
        } else {
          return "IN";
        }
      },
    });
    t.string("name");
    t.string("merchantName");
    t.float("amount");
    t.int("date");
    t.int("categoryId");
    t.field("Category", {
      type: "Category",
    });
    t.string("plaidId");
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
              },
            },
            Category: {
              select: {
                id: true,
                name: true,
                colour: true,
              },
            },
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
    /**
     * @param accessToken This is the access you get affter exchanging the public token
     * @param startDate Start date of transactions you want to fetch
     * @param endDate To what date you want to fetch to this should be Date.now() but for now this is okay
     * @returns Transactions[] this is an array of transcations basically a bunch of objects that you can refer back to the plaid api if you want more details
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
            plaidId: args.plaidId,
          },
        });
        if (!transaction) {
          throw new Error("Error when creating transaction");
        }
        return transaction;
      },
    });
    t.field("updateTransaction", {
      type: "Transaction",
      args: {
        id: nonNull(intArg()),
        name: stringArg(),
        merchantName: stringArg(),
        categoryId: intArg(),
      },
      resolve: async (_root, args, ctx) => {
        return await ctx.db.transaction.update({
          where: {
            id: args.id,
          },
          data: {
            ...(args.name && {
              name: args.name,
            }),
            ...(args.merchantName && {
              merchantName: args.merchantName,
            }),
            ...(args.categoryId && {
              Category: {
                connect: {
                  id: args.categoryId,
                },
              },
            }),
            ...(!args.categoryId &&
              !args.merchantName &&
              !args.name && {
                Category: {
                  disconnect: true,
                },
              }),
          },
          include: {
            Category: true,
          },
        });
      },
    });
    t.nonNull.list.nonNull.field("updateTransactions", {
      // Currently only supports categories
      type: "Transaction",
      args: {
        ids: nonNull(list(nonNull(intArg()))),
        categoryId: intArg(),
      },
      resolve: async (_root, args, ctx) => {
        const transactions = await ctx.db.transaction.findMany({
          where: {
            id: {
              in: args.ids,
            },
          },
        });
        const updatedTransactions = await Promise.all(
          transactions.map((transaction) =>
            ctx.db.transaction.update({
              where: {
                id: transaction.id,
              },
              data: {
                ...(args.categoryId
                  ? {
                      Category: {
                        connect: {
                          id: args.categoryId,
                        },
                      },
                    }
                  : {
                      categoryId: null,
                    }),
              },
              include: {
                Category: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            })
          )
        );
        if (!updatedTransactions) {
          throw new Error(
            "Error: Unable to update selected transactions at once."
          );
        }
        return updatedTransactions;
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
    t.nonNull.list.field("categoriseTransactionsWithAi", {
      type: "Transaction",
      args: {
        ids: nonNull(list(nonNull(intArg()))),
        overwrite: booleanArg(),
      },
      resolve: async (root, args, ctx) => {
        const transactions = await ctx.db.transaction.findMany({
          where: {
            id: {
              in: args.ids,
            },
          },
          select: {
            id: true,
            merchantName: true,
            amount: true,
            categoryId: true,
          },
        });
        const categories = await ctx.db.category.findMany({
          select: {
            id: true,
            name: true,
            description: true,
          },
        });

        const transactionCategoryIdPairs = await categoriseTransactions(
          transactions.filter((transaction) =>
            args.overwrite && !!transaction.categoryId ? false : true
          ),
          10,
          categories
        );
        console.log(
          transactionCategoryIdPairs.forEach((pair) => console.log({ pair }))
        );
        return await Promise.all(
          transactionCategoryIdPairs.map(({ transactionId, categoryId }) =>
            ctx.db.transaction.update({
              where: {
                id: transactionId,
              },
              data: {
                Category: {
                  connect: {
                    id: categoryId,
                  },
                },
              },
            })
          )
        );
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
