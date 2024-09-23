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
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Button onClick={handleClick}>
        {clicked ? 'Drafts fetched' : 'Get Drafts'}
      </Button>
      {clicked && data && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.drafts.map((draft: any) => (
          <div key={draft.id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{draft.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{draft.body}</p>
              <div className="flex justify-end">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full text-sm transition-colors duration-300 ease-in-out">
                  Read More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
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