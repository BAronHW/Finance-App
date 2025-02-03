"use client";

import Header from "@/components/customComponents/userComponents/Header";
import { useParams } from "next/navigation";
import { TransactionsTable } from "@/components/customComponents/userComponents/TransactionsTable";
import { useMutation, useQuery } from "@apollo/client";
import { GET_TRANSACTIONS_BY_USER_ID } from "@/lib/graphql/Transaction";
import { columns } from "@/components/customComponents/userComponents/TransactionsTableColumns";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { CREATE_LINKTOKEN, EXCHANGE_PUB_TOKEN } from "@/lib/graphql/Plaid";
import { PlaidLinkOnSuccessMetadata, usePlaidLink } from "react-plaid-link";
import { PlaidAuth } from "@/components/PlaidAuth";
import { FETCH_ACCESS_TOKEN_FROM_USER } from "@/lib/graphql/Users";
import { useAccessToken } from "@/lib/hooks/useAccessToken";
import { GET_ACCOUNTS_BY_USER_ID, UPSERT_ACCOUNTS_FROM_PLAID } from "@/lib/graphql/Account";

export default function Home() {
  const params = useParams();
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const userId = Array.isArray(params?.userId)
    ? Number(params?.userId[0])
    : Number(params?.userId);

  const [accessToken, setAccessToken] = useState("");
  // const [publicToken, setPublicToken] = useState("");
  const [linkToken, setLinkToken] = useState("");

  const { data: accessTokenDataFromUser } = useQuery(FETCH_ACCESS_TOKEN_FROM_USER, {
    variables: {
      userId: userId,
    },
    onCompleted: () => {
      if (accessTokenDataFromUser?.accessToken) {
        setAccessToken(accessTokenDataFromUser.accessToken);
        console.log("user has access token already!");
      }
    },
  });
  
  const { data: accountData, loading: accountsLoading } = useQuery(GET_ACCOUNTS_BY_USER_ID, {
    variables: {
      userId: userId
    },
    onCompleted: (data) => console.log({data})
  });

  const [createLinkToken] = useMutation(CREATE_LINKTOKEN);
  const [exchangeToken] = useMutation(EXCHANGE_PUB_TOKEN);

  useEffect(() => {
    const fetchLinkToken = async () => {
      const { data: linkTokenData } = await createLinkToken();
      if (linkTokenData?.createLinkToken?.link_token) {
        setLinkToken(linkTokenData.createLinkToken.link_token);
        console.log({linkToken})
      }
    };

    if (!linkToken) {
      fetchLinkToken();
    }
  });

  const [upsertAccountsFromPlaid] = useMutation(UPSERT_ACCOUNTS_FROM_PLAID);

  const { open: openPlaidLink, ready: plaidLinkReady } = usePlaidLink({
    token: linkToken,
    onSuccess: async (
      public_token: string,
      metadata: PlaidLinkOnSuccessMetadata
    ) => {
      const {
        data: accessTokenData,
      } = await exchangeToken({
        variables: {
          userId: userId,
          public_token,
        },
      });
      console.log({accessTokenData})
      if (accessTokenData?.exchangePublicToken) {
        setAccessToken(accessTokenData.exchangePublicToken);
        console.log({accessToken: accessTokenData.exchangePublicToken})
        const { data: upsertAccountsData } = await upsertAccountsFromPlaid({
          variables: {
            userId: userId,
            accessToken: accessTokenData.exchangePublicToken,
          },
          refetchQueries: [GET_ACCOUNTS_BY_USER_ID],
        })

        console.log({ upsertAccountsData })
      }
    },
  });


  const { data: transactionuserdata } = useQuery(GET_TRANSACTIONS_BY_USER_ID, {
    variables: {
      userId: userId,
    },
  });

  const transactionData = transactionuserdata?.getTransactionsByUserId ?? [];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header
          name={currentUser?.displayName ?? ""}
          appMoto="Manage your student funds"
          accBal={10}
          accounts={accountData?.getAccountsByUserId ?? []}
          accountsLoading={accountsLoading}
          userId={userId}
          openPlaidLink={openPlaidLink}
          plaidLinkReady={plaidLinkReady}
        />
      </div>
      <main className="flex-grow flex items-center justify-center flex-col gap-10 m-7">
        <div className="mt-6 space-y-4 text-center">
          <TransactionsTable
            columns={columns}
            data={transactionData.filter((transaction) => transaction !== null)}
          />
        </div>
      </main>
    </div>
  );
}
