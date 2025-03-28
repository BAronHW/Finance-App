'use client'

import Header from '@/components/custom/header/Header'
import { useParams } from 'next/navigation'
import TransactionsTableColumns from '@/components/custom/tables/TransactionsTableColumns'
import TransactionsTable from '@/components/custom/tables/TransactionsTable'
import { useMutation, useQuery } from '@apollo/client'
import {
    GET_TRANSACTIONS_BY_USER_ID,
    UPSERT_TRANSACTIONS_FROM_PLAID,
} from '@/lib/graphql/Transaction'
import { useEffect, useState } from 'react'
import { CREATE_LINKTOKEN, EXCHANGE_PUB_TOKEN } from '@/lib/graphql/Plaid'
import { usePlaidLink } from 'react-plaid-link'
import { GET_USER_BY_ID } from '@/lib/graphql/Users'
import {
    GET_ACCOUNTS_BY_USER_ID,
    UPSERT_ACCOUNTS_FROM_PLAID,
} from '@/lib/graphql/Account'
import { Account } from '@/__generated__/graphql'
import { useAuth } from '@/lib/contexts/authContext'
import { useRouter } from 'next/navigation'
export default function Home() {
    const auth = useAuth()
    const router = useRouter()
    const userIdInAuthContext = auth.userId
    const params = useParams()
    const userId = Array.isArray(params?.userId)
        ? Number(params?.userId[0])
        : Number(params?.userId)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        if (mounted) {
            if (userIdInAuthContext === null) {
                router.push('/')
                return
            }

            if (userIdInAuthContext !== userId) {
                router.push(`/home/${userIdInAuthContext}`)
                return
            }
        }
    }, [userIdInAuthContext, userId, router, mounted])

    useEffect(() => {
        setMounted(true)
    }, [])

    const [accessToken, setAccessToken] = useState('')
    const [linkToken, setLinkToken] = useState('')
    const [displayName, setDisplayName] = useState('')

    useQuery(GET_USER_BY_ID, {
        variables: {
            userId: userId,
        },
        onCompleted: (data) => {
            console.log('GET_USER_BY_ID completed')
            console.log({ data })
            const user = data?.getUserById
            setDisplayName(
                user.firstName && user.lastName
                    ? user.firstName + ' ' + user.lastName
                    : user.username
            ) // TODO: Eventually have a setting that allows the user to switch display name
            if (user.accessToken) {
                setAccessToken(user.accessToken)
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
                console.log({ linkToken })
            }
        }

        if (!linkToken) {
            fetchLinkToken()
        }
    })

    const [upsertAccountsFromPlaid] = useMutation(UPSERT_ACCOUNTS_FROM_PLAID)

    const { open: openPlaidLink, ready: plaidLinkReady } = usePlaidLink({
        token: linkToken,
        onSuccess: async (public_token: string) => {
            const { data: accessTokenData } = await exchangeToken({
                variables: {
                    userId: userId,
                    public_token,
                },
            })
            console.log({ accessTokenData })
            if (accessTokenData?.exchangePublicToken) {
                setAccessToken(accessTokenData.exchangePublicToken)
                console.log({
                    accessToken: accessTokenData.exchangePublicToken,
                })
                const { data: upsertAccountsData } =
                    await upsertAccountsFromPlaid({
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

    const transactionData =
        transactionsByUserData?.getTransactionsByUserId ?? []

    return (
        <div className="flex flex-col min-h-screen">
            <div className="w-full max-w-7xl mx-auto">
                <Header
                    name={displayName ?? ''}
                    appMoto="Manage your student funds"
                    accBal={10}
                    accounts={accountData?.getAccountsByUserId ?? []}
                    accountsLoading={accountsLoading}
                    userId={userId}
                    openPlaidLink={openPlaidLink}
                    plaidLinkReady={plaidLinkReady}
                />
                <div className="mt-6 space-y-4 text-center w-full">
                    <TransactionsTable
                        columns={TransactionsTableColumns}
                        data={transactionData}
                        accounts={accountData?.getAccountsByUserId ?? []}
                        accountsLoading={accountsLoading}
                        userId={userId}
                    />
                </div>
            </div>
        </div>
    )
}
