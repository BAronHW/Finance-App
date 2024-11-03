"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const nexus_1 = require("nexus");
exports.Account = (0, nexus_1.objectType)({
    name: 'Account',
    definition(t) {
        t.nonNull.int('id');
        t.nonNull.string('name');
        t.nonNull.float('balance');
        t.nonNull.string('type');
        t.nonNull.string('createdAt');
        t.nonNull.string('updatedAt');
        t.nonNull.field('user', {
            type: 'User',
            resolve(parent, _, ctx) {
                return ctx.db.account
                    .findUnique({
                    where: { id: parent.id }
                })
                    .user();
            }
        });
    },
});
//# sourceMappingURL=Account.js.map