import { Kind } from "graphql"
import { scalarType } from "nexus"

export const Any = scalarType({
  name: 'Any',
  description: 'For anything to not lock yourself in strict types',
  parseValue(value: any){
    return value
  },
  serialize(value: any){
    return value
  }
})

export const dateType = scalarType({
  name: 'Date',
  description: 'For representing data in ISO format',
  parseValue(value){
    return new Date(value)
  },
  serialize(value) {
    return value.getTime()
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value)
    }
    return null
  },
})