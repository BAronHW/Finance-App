import { useEffect, useState } from "react";
import { EXCHANGE_PUB_TOKEN } from "@/lib/graphql/Plaid";
import { useMutation, gql } from "@apollo/client";
import { argsToArgsConfig } from "graphql/type/definition";
import { AccessToken } from "../../../backend/api/graphql/Plaid";
import { UPSERT_TRANSACTIONS } from "@/lib/graphql/Transaction";

interface PlaidAuthProps {
  pubToken: string;
  userId: number;
}

export function PlaidAuth({ pubToken, userId }: PlaidAuthProps) {
  const [exchangeToken, { data, loading, error }] =
    useMutation(EXCHANGE_PUB_TOKEN);

  const [
    upsertTransactions,
    {
      data: transactionData,
      loading: transactionsLoading,
      error: transactionsError,
    },
  ] = useMutation(UPSERT_TRANSACTIONS, {
    onCompleted: () => console.log({ transactionData })
  });

  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    async function exchangePublicToken() {
      try {
        // terrible way of doing this tbh it should be an int and not a string
        const userIdtoStr = userId.toString();
        const response = await exchangeToken({
          variables: {
            userId: userIdtoStr,
            public_token: pubToken,
          },
        });

        console.log(
          "Access token:",
          response.data.exchangePublicToken.accessToken
        );

        setAccessToken(response.data.exchangePublicToken.accessToken);
      } catch (error) {
        console.error("Error exchanging token:", error);
      }
    }

    if (pubToken) {
      exchangePublicToken();
    }
  }, [pubToken, userId, exchangeToken]);

  console.log({ accessToken })
  useEffect(() => {
    const fetchTransactions = async () => {
        const startDate = "2000-01-01";
        const endDate = "2025-02-01";
        await upsertTransactions({
        variables: {
            userId: userId,
            start_date: startDate,
            end_date: endDate,
            access_token: accessToken,
        },
        });
    }
    if (accessToken.length > 0) {
        fetchTransactions()
    }
  }, [accessToken]);
  
  if (transactionsLoading || loading) {
    return <div>loading...</div>
  }

  if (transactionsError) {
    console.log({ transactionsError })
  }

  if ( error ) {
    console.log({ error })
  }

  return (
    <div>
      Transactions fetched!
    </div>
  )
}
