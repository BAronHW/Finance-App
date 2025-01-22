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