import { makeSchema } from 'nexus'
import { join } from 'path'
import * as types from './graphql'
import { DateTime } from './graphql/Utils/dateTime';
export const schema = makeSchema({
  types: {
    types,
    DateTime,
  },
  outputs: {
    typegen: join(__dirname, '../nexus-typegen.ts'),
    schema: join(__dirname, '../schema.graphql'),
  },
  contextType: {
    module: join(__dirname, "./context.ts"),
    export: "Context"
  }

})