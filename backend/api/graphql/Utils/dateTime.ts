import { scalarType } from 'nexus'

export const DateTime = scalarType({
  name: 'DateTime',
  asNexusMethod: 'dateTime',
  description: 'Date and time custom scalar type',
  parseValue(value: any) {
    return new Date(value)
  },
  serialize(value: any) {
    return value instanceof Date 
      ? value.toISOString() 
      : new Date(value).toISOString()
  },
  parseLiteral(ast: any) {
    if (ast.kind === 'StringValue') {
      return new Date(ast.value)
    }
    return null
  },
})