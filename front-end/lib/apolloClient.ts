import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

function createApolloClient() {
  return new ApolloClient({
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:4000/graphql", // Your GraphQL server endpoint
    }),
    cache: new InMemoryCache(),
  });
}

export default createApolloClient;