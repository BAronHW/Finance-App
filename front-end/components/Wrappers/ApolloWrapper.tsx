'use client'

import { ApolloProvider } from "@apollo/client";
import createApolloClient from "@/lib/apolloClient";
import { ReactNode } from "react";

export default function ApolloWrapper({ children }: { children: ReactNode }) {
  const client = createApolloClient();

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}