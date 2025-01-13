'use client'

import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client'; // Changed from useQuery
import { PlaidLinkOnSuccessMetadata, usePlaidLink } from 'react-plaid-link';
import { CREATE_LINKTOKEN } from "@/src/lib/GraphQL/Plaid";
import TestComp from '@/src/components/testComp';
import { BentoDemo } from '@/src/components/BentoDemo';
import { useParams } from 'next/navigation';
import { getAuth } from 'firebase/auth';
import Header from '@/src/components/Header';

export default function Home() {
  const [token, setToken] = useState("");
  const [publicToken, setPublicToken] = useState("");
  const params = useParams();
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const [createLinkToken, { data, loading, error }] = useMutation(CREATE_LINKTOKEN);

  useEffect(() => {
    async function fetchLinkToken() {
      try {
        console.log("fetching link token");
        const response = await createLinkToken();
        
        if (response.data?.createLinkToken?.link_token) {
          console.log(response.data.createLinkToken?.link_token)
          setToken(response.data.createLinkToken.link_token);
        }
      } catch (err) {
        console.error("Error fetching link token:", err);
      }
    }

    if (currentUser && !token) {
      fetchLinkToken();
    }
  }, [currentUser]); // Changed dependency to currentUser

  const { open, ready } = usePlaidLink({
    token,
    onSuccess: (public_token: string, metadata: PlaidLinkOnSuccessMetadata) => {
      console.log("success", public_token, metadata);
      setPublicToken(public_token);
    },
  });

  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header name={currentUser?.displayName ?? ""} appMoto='Manage your student funds' accBal={10} />
      </div>      <main className="flex-grow flex items-center justify-center flex-col gap-10 m-7">
        <BentoDemo />
        <div className="mt-6 space-y-4 text-center">
          <p className="text-lg">Welcome to your dashboard!</p>
          <TestComp />
          {/* Add button to open Plaid */}
          <button 
            onClick={() => open()} 
            disabled={!ready}
            className="button primary"
          >
            Connect a bank account
          </button>
        </div>
      </main>
    </div>
  );
}