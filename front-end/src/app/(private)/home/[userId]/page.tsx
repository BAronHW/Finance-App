'use client'

import Header from '@/components/customComponents/userComponents/Header'
import { useParams } from 'next/navigation'
import { TransactionsTable } from '@/components/customComponents/userComponents/transactionsTable'
import { useAuth } from '@/lib/contexts/authContext'
import { useMutation, useQuery } from '@apollo/client'
import { GET_TRANSACTIONS_BY_USER_ID } from '@/lib/graphql/Transaction'
import { columns } from '@/components/customComponents/userComponents/transactionsTableColumns'
import { useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth'
import { CREATE_LINKTOKEN } from '@/lib/graphql/Plaid'
import { PlaidLinkOnSuccessMetadata, usePlaidLink } from 'react-plaid-link'
import { PlaidAuth } from '@/components/PlaidAuth'

export default function Home() {
    const [token, setToken] = useState('')
    const [publicToken, setPublicToken] = useState('')
    const params = useParams()
    const auth = getAuth()
    const currentUser = auth.currentUser

    const [createLinkToken, { data, loading, error }] =
        useMutation(CREATE_LINKTOKEN)

    useEffect(() => {
        async function fetchLinkToken() {
            try {
                console.log('fetching link token')
                const response = await createLinkToken()

                if (response.data?.createLinkToken?.link_token) {
                    console.log(response.data.createLinkToken?.link_token)
                    setToken(response.data.createLinkToken.link_token)
                }
            } catch (err) {
                console.error('Error fetching link token:', err)
            }
        }

        if (currentUser && !token) {
            fetchLinkToken()
        }
    }, [currentUser])

    const { open, ready } = usePlaidLink({
        token,
        onSuccess: (
            public_token: string,
            metadata: PlaidLinkOnSuccessMetadata
        ) => {
            console.log('success', public_token, metadata)
            setPublicToken(public_token)
        },
    })

    const userId = Array.isArray(params?.userId)
        ? Number(params?.userId[0])
        : Number(params?.userId)

    const { data: transactionuserdata } = useQuery(
        GET_TRANSACTIONS_BY_USER_ID,
        {
            variables: {
                userId: userId,
            },
        }
    )

    const transactionData = transactionuserdata?.getTransactionsByUserId ?? []

    return (
        <div className="flex flex-col min-h-screen">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Header
                    name={currentUser?.displayName ?? ''}
                    appMoto="Manage your student funds"
                    accBal={10}
                />
            </div>
            <main className="flex-grow flex items-center justify-center flex-col gap-10 m-7">
                <div className="mt-6 space-y-4 text-center">
                    <TransactionsTable
                        columns={columns}
                        data={transactionData.filter(
                            (transaction) => transaction !== null
                        )}
                    />
                </div>
                <button
                    onClick={() => open()}
                    disabled={!ready}
                    className="button primary"
                >
                    Connect a bank account
                </button>
                <PlaidAuth pubToken={publicToken} userId={userId}></PlaidAuth>
            </main>
        </div>
    )
}
