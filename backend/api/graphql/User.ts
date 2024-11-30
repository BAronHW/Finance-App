import { objectType, extendType, stringArg, nonNull, intArg } from 'nexus'
import bcrypt from 'bcrypt';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id')
    t.string('firstName')
    t.string('lastName')
    t.nonNull.string('username')
    t.nonNull.string('email')
    t.nonNull.string('password')
    t.string('phone')
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
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            username: true,
            password: true,
            uuid: true,
            phone: true,
          }
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
        firstName: nonNull(stringArg()),
        lastName: nonNull(stringArg()),
        username: nonNull(stringArg()),
        password: nonNull(stringArg()),
        email: nonNull(stringArg()),
        uuid: stringArg(),
        phone: stringArg(),
      },
      resolve: async (_root, args, ctx) => {
        const hash = await bcrypt.hash(args.password, 10);
        return ctx.db.user.create({
          data: {
            firstName: args.firstName,
            lastName: args.lastName,
            username: args.username,
            password: hash,
            email: args.email,
            uuid: args.uuid,
            phone: args.phone,
          },
        })
      },
    })
    t.nonNull.field('updateUser', {
      type: 'User',
      args: {
        id: nonNull(intArg()),
        firstName: stringArg(),
        lastName: stringArg(),
        username: nonNull(stringArg()),
        password: nonNull(stringArg()),
        email: nonNull(stringArg()),
        uuid: stringArg(),
        phone: stringArg(),
      },
      resolve: async (_root, args, ctx) => {
        const hash = await bcrypt.hash(args.password, 10);
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
    t.nonNull.field('signIn', {
      type: 'User',
      args: {
        username: nonNull(stringArg()),
        password: nonNull(stringArg()),
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
            uuid: true,
            phone: true,
          }
        });

        if (!user) {
          throw new Error('Invalid username or password');
        }

        const valid = await bcrypt.compare(args.password, user.password);
        if (!valid) {
          throw new Error('Invalid username or password');
        }

        return user;
      }
    })
  },
})