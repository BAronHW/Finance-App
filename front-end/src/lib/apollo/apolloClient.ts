import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

function createApolloClient() {
  const client = new ApolloClient({
    link: new HttpLink({
      uri: "http://localhost:4000/graphql",
    }),
    cache: new InMemoryCache(),
  });
  return client
}

export default createApolloClient;