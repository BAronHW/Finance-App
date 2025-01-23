// api/server.ts
import { ApolloServer } from '@apollo/server'
import { context } from './context'
import { schema } from './schema'
import { startStandaloneServer } from '@apollo/server/standalone'
import { getAuth } from 'firebase/auth'
import { auth } from './utils/Firebase'

export const server = new ApolloServer({ 
    schema, 
})

const startServer = async () => {
    const { url } = await startStandaloneServer(server, {
        context: async function ({ req }) {
            const token = req.headers.authorization || ''
            // then check the validity of this token with firebase
            return{
                db: context.db,
            }
        }
    })
    
    console.log(`🚀  Server ready at ${url}`)
}

startServer()