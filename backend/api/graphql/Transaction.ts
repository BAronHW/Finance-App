import {
  objectType,
  extendType,
  stringArg,
  nonNull,
  intArg,
  enumType,
} from "nexus";
import TransactionData from "../../sample-data/dummy-transactions.json";
import { InOrOut } from "@prisma/client";

export const Transaction = objectType({
  name: "Transaction",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.int("userId");
    t.nonNull.string("accountName");
    t.nonNull.field("io", { type: InOrOutEnum });
    t.nonNull.string("name");
    t.nonNull.string("senderOrRecipientName");
    t.nonNull.float("amount");
    t.string("reference");
    t.string("category");
  },
});

export const TransactionQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("allTransactions", {
      type: "Transaction",
      async resolve(_root, _args, ctx) {
        const transactions = await ctx.db.transaction.findMany();
        return transactions;
      },
    });
    t.nonNull.list.field("transactionsByUserId", {
      type: "Transaction",
      args: {
        userId: nonNull(intArg()),
      },
      resolve: async (_root, args, ctx) => {
        const transactions = ctx.db.transaction.findMany({
          where: {
            userId: args.userId,
          },
          include: {
            user: true,
          },
        });
        return transactions;
      },
    });
    t.nonNull.field("transactionById", {
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

export const TransactionMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("seedTransactions", {
      type: "Boolean",
      args: {
        userId: nonNull(intArg()),
      },
      async resolve(_root, args, ctx) {
        try {
          TransactionData.transactions.forEach(async (transaction) => {
            await ctx.db.transaction.create({
              data: {
                ...transaction,
                io: transaction.io as InOrOut,
                user: {
                  connect: {
                    id: args.userId,
                  },
                },
              },
            });
          });
          return true;
        } catch (error) {
          console.error("Error while seeding transactions: ", error);
          return false;
        }
      },
    });
  },
});

const InOrOutEnum = enumType({
  name: "InOrOutEnum",
  members: {
    IN: "IN",
    OUT: "OUT",
  },
});
