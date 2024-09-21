'use client'
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { ApolloProvider, useQuery, gql } from "@apollo/client";
import createApolloClient from '@/lib/apolloClient';

const GET_DRAFTS = gql`
  query GetDrafts {
    drafts {
      id
      title
      body
    }
  }
`;

function DraftsButton() {
  const { loading, error, data } = useQuery(GET_DRAFTS);
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    if (data) {
      console.log(data);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Button onClick={handleClick}>
      {clicked ? 'Check console for drafts' : 'Get Drafts'}
    </Button>
  );
}

export default function Home() {
  const client = createApolloClient();

  return (
    <ApolloProvider client={client}>
      <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <DraftsButton />
        <Link href="/sign-up">
          <Button>Sign Up</Button>
        </Link>
      </div>
    </ApolloProvider>
  );
}