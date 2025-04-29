"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionMutation = exports.TransactionQuery = exports.Transaction = void 0;
const nexus_1 = require("nexus");
exports.Transaction = (0, nexus_1.objectType)({
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
    }
});
exports.TransactionQuery = (0, nexus_1.extendType)({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("transactions", {
            type: "Transaction",
            async resolve(_root, _args, ctx) {
                const transactions = await ctx.db.transaction.findMany();
                return transactions;
            },
        });
        t.nonNull.field("transaction", {
            type: "Transaction",
            args: {
                id: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
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
exports.TransactionMutation = (0, nexus_1.extendType)({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("_seedTransactions", {
            type: "Boolean",
            args: {
                userId: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
            },
            async resolve(_root, args, ctx) {
                try {
                    const user = await ctx.db.user.findUnique({
                        where: {
                            id: args.userId,
                        }
                    });
                    if (!user) {
                        throw new Error("User not found.");
                    }
                    if (user.transac !== 0) {
                    }
                }
                catch (error) {
                    console.error("Error while seeding transactions: ", error);
                    return false;
                }
            }
        });
    }
});
const InOrOutEnum = (0, nexus_1.enumType)({
    name: "InOrOutEnum",
    members: {
        IN: "IN",
        OUT: "OUT",
    }
});
//# sourceMappingURL=Transaction.js.map