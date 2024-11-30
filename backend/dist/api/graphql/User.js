"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMutation = exports.UserQuery = exports.User = void 0;
const nexus_1 = require("nexus");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.User = (0, nexus_1.objectType)({
    name: 'User',
    definition(t) {
        t.nonNull.int('id');
        t.string('firstName');
        t.string('lastName');
        t.nonNull.string('username');
        t.nonNull.string('email');
        t.nonNull.string('password');
        t.string('uuid');
    },
});
exports.UserQuery = (0, nexus_1.extendType)({
    type: 'Query',
    definition(t) {
        t.nonNull.list.nonNull.field('users', {
            type: 'User',
            resolve(_root, _args, ctx) {
                return ctx.db.user.findMany();
            },
        });
        t.field('user', {
            type: 'User',
            args: {
                id: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
            },
            resolve(_root, args, ctx) {
                return ctx.db.user.findUnique({
                    where: { id: args.id },
                });
            },
        });
    },
});
exports.UserMutation = (0, nexus_1.extendType)({
    type: 'Mutation',
    definition(t) {
        t.nonNull.field('createUser', {
            type: 'User',
            args: {
                firstName: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                lastName: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                username: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                password: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                email: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                uuid: (0, nexus_1.stringArg)(),
            },
            resolve(_root, args, ctx) {
                const hash = bcrypt_1.default.hash(args.password, 10);
                return ctx.db.user.create({
                    data: {
                        firstName: args.firstName,
                        lastName: args.lastName,
                        username: args.username,
                        password: hash,
                        email: args.email,
                        uuid: args.uuid,
                    },
                });
            },
        });
        t.nonNull.field('updateUser', {
            type: 'User',
            args: {
                id: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
                firstName: (0, nexus_1.stringArg)(),
                lastName: (0, nexus_1.stringArg)(),
                username: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                password: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                email: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                uuid: (0, nexus_1.stringArg)(),
            },
            resolve(_root, args, ctx) {
                const hash = bcrypt_1.default.hash(args.password, 10);
                return ctx.db.user.update({
                    where: { id: args.id },
                    data: {
                        firstName: args.firstName,
                        lastName: args.lastName,
                        username: args.username,
                        password: hash,
                        email: args.email,
                        uuid: args.uuid,
                    },
                });
            },
        });
        t.nonNull.field('deleteUser', {
            type: 'User',
            args: {
                id: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
            },
            resolve(_root, args, ctx) {
                return ctx.db.user.delete({
                    where: { id: args.id },
                });
            },
        });
        t.nonNull.field('signIn', {
            type: 'User',
            args: {
                username: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                password: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
            },
            async resolve(_root, args, ctx) {
                const user = await ctx.db.user.findUnique({
                    where: { username: args.username },
                });
                if (!user) {
                    throw new Error('Invalid username or password');
                }
                const valid = await bcrypt_1.default.compare(args.password, user.password);
                if (!valid) {
                    throw new Error('Invalid username or password');
                }
                return user;
            }
        });
    },
});
//# sourceMappingURL=User.js.map