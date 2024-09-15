import { objectType } from 'nexus'
import path from 'path'

export const User = objectType({
    name: 'User',
    definition(t) {
      t.nonNull.int('id')
      t.nonNull.string('email')
      t.string('name')
      t.nonNull.list.nonNull.field('accounts', {
        type: 'Account',
        resolve: (parent, _, context) => {
          return context.prisma.user.findUnique({ where: { id: parent.id } }).accounts()
        },
      })
    },
  })