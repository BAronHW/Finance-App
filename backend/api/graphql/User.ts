import { objectType, extendType, stringArg, nonNull, intArg } from 'nexus'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('first_name')
    t.nonNull.string('last_name')
    t.string('uuid')
  },
})

export const UserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('users', {
      type: 'User',
      resolve(_root, _args, ctx) {
        return ctx.db.user.findMany()
      },
    })
    t.field('user', {
      type: 'User',
      args: {
        id: nonNull(intArg()),
      },
      resolve(_root, args, ctx) {
        return ctx.db.user.findUnique({
          where: { id: args.id },
        })
      },
    })
  },
})

export const UserMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createUser', {
      type: 'User',
      args: {
        first_name: nonNull(stringArg()),
        last_name: nonNull(stringArg()),
        uuid: stringArg(),
      },
      resolve(_root, args, ctx) {
        return ctx.db.user.create({
          data: {
            first_name: args.first_name,
            last_name: args.last_name,
            uuid: args.uuid,
          },
        })
      },
    })
    t.nonNull.field('updateUser', {
      type: 'User',
      args: {
        id: nonNull(intArg()),
        first_name: stringArg(),
        last_name: stringArg(),
        uuid: stringArg(),
      },
      resolve(_root, args, ctx) {
        return ctx.db.user.update({
          where: { id: args.id },
          data: {
            first_name: args.first_name,
            last_name: args.last_name,
            uuid: args.uuid,
          },
        })
      },
    })
    t.nonNull.field('deleteUser', {
      type: 'User',
      args: {
        id: nonNull(intArg()),
      },
      resolve(_root, args, ctx) {
        return ctx.db.user.delete({
          where: { id: args.id },
        })
      },
    })
  },
})