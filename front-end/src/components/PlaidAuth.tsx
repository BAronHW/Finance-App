import { useEffect, useState } from 'react'
import { EXCHANGE_PUB_TOKEN } from '@/lib/GraphQL/Plaid'
import { useMutation, gql } from '@apollo/client'
import { argsToArgsConfig } from 'graphql/type/definition'
import { AccessToken } from '../../../backend/api/graphql/Plaid'

interface PlaidAuthProps {
    pubToken: string
    userId: number
}

export function PlaidAuth({ pubToken, userId }: PlaidAuthProps) {
    const [exchangeToken, { data, loading, error }] =
        useMutation(EXCHANGE_PUB_TOKEN)

    console.log(pubToken, userId)

    const [accessToken, setAccessToken] = useState('')

    useEffect(() => {
        async function exchangePublicToken() {
            try {
                // terrible way of doing this tbh it should be an int and not a string
                const userIdtoStr = userId.toString()
                const response = await exchangeToken({
                    variables: {
                        userId: userIdtoStr,
                        public_token: pubToken,
                    },
                })

                console.log(
                    'Access token:',
                    response.data.exchangePublicToken.accessToken
                )

                setAccessToken(response.data.exchangePublicToken.accessToken)
            } catch (error) {
                console.error('Error exchanging token:', error)
            }
        }

        if (pubToken) {
            exchangePublicToken()
        }
    }, [pubToken, userId, exchangeToken])

    if (loading) return <div>Exchanging token...</div>
    if (error) return <div>Error: {error.message}</div>

    return <span>{accessToken}</span>
}
