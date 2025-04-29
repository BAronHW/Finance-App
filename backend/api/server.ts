// // api/server.ts
// import { ApolloServer } from '@apollo/server'
// import { context } from './context'
// import { schema } from './schema'
// import { startStandaloneServer } from '@apollo/server/standalone';


// export const server = new ApolloServer({ 
//     schema, 
// })

// const { url } = await startStandaloneServer(server, {
//     context: async ({ req }) => ({ token: req.headers.token }),
//     listen: { port: 4000 },
//   });
//   console.log(`🚀  Server ready at ${url}`);
