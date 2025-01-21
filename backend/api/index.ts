// api/server.ts
import { ApolloServer } from '@apollo/server'
import { context } from './context'
import { schema } from './schema'
import { startStandaloneServer } from '@apollo/server/standalone'

export const server = new ApolloServer({ 
    schema, 
})

const startServer = async () => {
    const { url } = await startStandaloneServer(server, {
        context: async () => ({
            db: context.db
        })
    })
    
    console.log(`🚀  Server ready at ${url}`)
}

startServer()