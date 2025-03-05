'use client'

import Header from "@/components/customComponents/userComponents/Header";
import { useParams } from "next/navigation";
import TransactionsTableColumns from "@/components/customComponents/userComponents/TransactionsTableColumns";
import TransactionsTable from "@/components/customComponents/userComponents/TransactionsTable";
import { useMutation, useQuery } from "@apollo/client";
import { GET_TRANSACTIONS_BY_USER_ID, UPSERT_TRANSACTIONS_FROM_PLAID } from "@/lib/graphql/Transaction";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { CREATE_LINKTOKEN, EXCHANGE_PUB_TOKEN } from "@/lib/graphql/Plaid";
import { PlaidLinkOnSuccessMetadata, usePlaidLink } from "react-plaid-link";
import { GET_USER_BY_ID } from "@/lib/graphql/Users";
import { GET_ACCOUNTS_BY_USER_ID, UPSERT_ACCOUNTS_FROM_PLAID } from "@/lib/graphql/Account";
import { Account } from "@/__generated__/graphql";

export default function Home() {
    const params = useParams()
    const auth = getAuth()
    const currentUser = auth.currentUser
    const userId = Array.isArray(params?.userId)
        ? Number(params?.userId[0])
        : Number(params?.userId)

    const [accessToken, setAccessToken] = useState('')
    const [linkToken, setLinkToken] = useState('')

    useQuery(GET_USER_BY_ID, {
        variables: {
            userId: userId,
        },
        onCompleted: (data) => {
            console.log('GET_USER_BY_ID completed')
            console.log({ data })
            if (data?.fetchAccessTokenFromUser.accessToken) {
                setAccessToken(data.fetchAccessTokenFromUser.accessToken)
                console.log('user has access token already!')
            }
        },
    })

    const { data: accountData, loading: accountsLoading } = useQuery(
        GET_ACCOUNTS_BY_USER_ID,
        {
            variables: {
                userId: userId,
            },
            onCompleted: (data) => console.log({ data }),
        }
    )

    const [createLinkToken] = useMutation(CREATE_LINKTOKEN)
    const [exchangeToken] = useMutation(EXCHANGE_PUB_TOKEN)
    const [upsertTransactionsFromPlaid] = useMutation(
        UPSERT_TRANSACTIONS_FROM_PLAID
    )

    useEffect(() => {
        const fetchTransactionsFromPlaid = async (accounts: Account[]) => {
            await Promise.all(
                accounts.map((account) =>
                    upsertTransactionsFromPlaid({
                        variables: {
                            userId: userId,
                            accountId: account.id,
                            accessToken: accessToken,
                            startDate: '2000-01-01',
                            endDate: '2025-03-01',
                        },
                        refetchQueries: [GET_TRANSACTIONS_BY_USER_ID],
                    })
                )
            )
        }
        if (accessToken && userId && accountData?.getAccountsByUserId) {
            fetchTransactionsFromPlaid(accountData.getAccountsByUserId ?? [])
            console.log('transactions upserted!')
        }
    }, [accessToken, userId, accountData])

    useEffect(() => {
        const fetchLinkToken = async () => {
            const { data: linkTokenData } = await createLinkToken()
            if (linkTokenData?.createLinkToken?.link_token) {
                setLinkToken(linkTokenData.createLinkToken.link_token)
            }
        }

        if (!linkToken) {
            fetchLinkToken()
        }
    })

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
    })

    const { data: transactionsByUserData } = useQuery(
        GET_TRANSACTIONS_BY_USER_ID,
        {
            variables: {
                userId: userId,
            },
        }
    )

  const transactionData = transactionsByUserData?.getTransactionsByUserId ?? [];
  // transactionData.forEach(element => {
  //   if (element.id === 716 ) {
  //     console.log({element})
  //   }
  // });

    return (
        <div className="flex flex-col min-h-screen">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Header
                    name={currentUser?.displayName ?? ''}
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
                <div className="mt-6 space-y-4 text-center w-full">
                    <TransactionsTable
                        columns={TransactionsTableColumns}
                        data={transactionData}
                        accounts={accountData?.getAccountsByUserId ?? []}
                        accountsLoading={accountsLoading}
                    />
                </div>
            </main>
        </div>
    )
}
