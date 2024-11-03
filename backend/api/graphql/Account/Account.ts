import { objectType, extendType, stringArg, nonNull, intArg, floatArg } from 'nexus'

export const Account = objectType({
    name: 'Account',
    definition(t) {
      t.nonNull.int('id')
      t.nonNull.string('name')
      t.nonNull.float('balance')
      t.nonNull.string('type')
      t.nonNull.string('createdAt')
      t.nonNull.string('updatedAt')
      t.nonNull.field('user', {
        type: 'User',
        async resolve(parent, _, ctx) {
          const user = await ctx.db.user
            .findUnique({
              where: { id: parent.id }
            })

          if (!user) {
            throw new Error(`Could not find user for account ${parent.id}`)
          }

          return {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            uuid: user.uuid
          }
        }
      })
    },
  })

  export const AccountQuery = extendType({
    type: 'Query',
    definition(t) {
      t.field('account', {
        type: 'Account',
        args: {
          id: nonNull(intArg()),
        },
        async resolve(_root, args, ctx) {
          const account = await ctx.db.account.findUnique({
            where: { id: args.id },
          })
          
          if (!account) return null

          return {
            ...account,
            createdAt: account.createdAt.toISOString(),
            updatedAt: account.updatedAt.toISOString()
          }
        },
      })
    },
  })

  export const AccountByUserId = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.list.nonNull.field('getAccountsByUserId', {
            type: 'Account',
            args: {
                userId: nonNull(intArg()),
            },
            async resolve(_root, args, ctx) {
                const accounts = await ctx.db.account.findMany({
                    where: { 
                        userId: args.userId
                    }
                })

                return accounts.map(account => ({
                    ...account,
                    createdAt: account.createdAt.toISOString(),
                    updatedAt: account.updatedAt.toISOString()
                }))
            }
        })
    }
})
  
  export const AccountMutation = extendType({
    type: 'Mutation',
    definition(t) {
      t.nonNull.field('createAccount', {
        type: 'Account',
        args: {
          name: nonNull(stringArg()),
          balance: nonNull(floatArg()),
          type: nonNull(stringArg()),
          userId: nonNull(intArg()),
        },
        async resolve(_root, args, ctx) {
          const account = await ctx.db.account.create({
            data: {
              name: args.name,
              balance: args.balance,
              type: args.type,
              user: {
                connect: {
                  id: args.userId
                }
              },
            },
          })
  
          return {
            ...account,
            createdAt: account.createdAt.toISOString(),
            updatedAt: account.updatedAt.toISOString()
          }
        },
      })
    },
  })