"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMutation = exports.UserQuery = exports.User = void 0;
const nexus_1 = require("nexus");
const Transaction_1 = require("./Transaction");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.User = (0, nexus_1.objectType)({
    name: "User",
    definition(t) {
        t.nonNull.int("id");
        t.string("firstName");
        t.string("lastName");
        t.nonNull.string("username");
        t.nonNull.string("email");
        t.string("password"); // Google users don't have a password
        t.string("phone");
        t.nonNull.string("uid");
        t.nonNull.list.field("transactions", { type: Transaction_1.Transaction });
    },
});
exports.UserQuery = (0, nexus_1.extendType)({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("users", {
            type: "User",
            async resolve(_root, _args, ctx) {
                const users = await ctx.db.user.findMany();
                return users;
            },
        });
        t.nonNull.field("user", {
            type: "User",
            args: {
                uid: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
            },
            async resolve(_root, args, ctx) {
                const user = await ctx.db.user.findUnique({
                    where: { uid: args.uid },
                });
                if (!user) {
                    throw new Error(`No user with uid ${args.uid} found.`);
                }
                return user;
            },
        });
    },
});
exports.UserMutation = (0, nexus_1.extendType)({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("createUser", {
            type: "User",
            args: {
                firstName: (0, nexus_1.stringArg)(),
                lastName: (0, nexus_1.stringArg)(),
                username: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                password: (0, nexus_1.stringArg)(),
                email: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                uid: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                phone: (0, nexus_1.stringArg)(),
            },
            resolve: async (_root, args, ctx) => {
                const hash = args.password
                    ? await bcrypt_1.default.hash(args.password, 10)
                    : null;
                return ctx.db.user.create({
                    data: {
                        firstName: args.firstName,
                        lastName: args.lastName,
                        username: args.username,
                        password: hash,
                        email: args.email,
                        uid: args.uid,
                        phone: args.phone,
                    },
                });
            },
        });
        t.nonNull.field("updateUserDetails", {
            type: "User",
            args: {
                id: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
                firstName: (0, nexus_1.stringArg)(),
                lastName: (0, nexus_1.stringArg)(),
                username: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                password: (0, nexus_1.stringArg)(),
                email: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                uid: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                phone: (0, nexus_1.stringArg)(),
            },
            resolve: async (_root, args, ctx) => {
                const hash = args.password
                    ? await bcrypt_1.default.hash(args.password, 10)
                    : null;
                return ctx.db.user.update({
                    where: { id: args.id },
                    data: {
                        firstName: args.firstName,
                        lastName: args.lastName,
                        username: args.username,
                        password: hash !== null && hash !== void 0 ? hash : undefined,
                        email: args.email,
                        uid: args.uid,
                    },
                });
            },
        });
        t.nonNull.field("deleteUser", {
            type: "User",
            args: {
                id: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
            },
            resolve(_root, args, ctx) {
                return ctx.db.user.delete({
                    where: { id: args.id },
                });
            },
        });
        t.nonNull.field("emailSignIn", {
            type: "User",
            args: {
                username: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                password: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
            },
            async resolve(_root, args, ctx) {
                const user = await ctx.db.user.findUnique({
                    where: { username: args.username },
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        username: true,
                        password: true,
                        uid: true,
                        phone: true,
                    },
                });
                if (!user) {
                    throw new Error("Invalid username");
                }
                if (!user.password) {
                    throw new Error("User signed in with Google and does not have stored password.");
                }
                const valid = await bcrypt_1.default.compare(args.password, user.password);
                if (!valid) {
                    throw new Error("Invalid username or password");
                }
                return user;
            },
        });
    },
});
//# sourceMappingURL=User.js.map