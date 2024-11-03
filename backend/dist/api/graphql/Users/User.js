"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMutation = exports.UserQuery = exports.User = void 0;
const nexus_1 = require("nexus");
exports.User = (0, nexus_1.objectType)({
    name: 'User',
    definition(t) {
        t.nonNull.int('id');
        t.nonNull.string('first_name');
        t.nonNull.string('last_name');
        t.string('uuid');
        // t.nonNull.list.field("accounts",{
        //   type:'Account',
        // })
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
                first_name: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                last_name: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                uuid: (0, nexus_1.stringArg)(),
            },
            resolve(_root, args, ctx) {
                return ctx.db.user.create({
                    data: {
                        first_name: args.first_name,
                        last_name: args.last_name,
                        uuid: args.uuid,
                    },
                });
            },
        });
        t.nonNull.field('updateUser', {
            type: 'User',
            args: {
                id: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
                first_name: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                last_name: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                uuid: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
            },
            resolve(_root, args, ctx) {
                return ctx.db.user.update({
                    where: { id: args.id },
                    data: {
                        first_name: args.first_name,
                        last_name: args.last_name,
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
    },
});
//# sourceMappingURL=User.js.map