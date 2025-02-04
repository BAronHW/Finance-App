import { Account } from "@/__generated__/graphql";
import { Button } from "@/components/ui/button";
import { DELETE_ACCOUNT, GET_ACCOUNTS_BY_USER_ID } from "@/lib/graphql/Account";
import { CREATE_LINKTOKEN, EXCHANGE_PUB_TOKEN } from "@/lib/graphql/Plaid";
import { FETCH_ACCESS_TOKEN_FROM_USER } from "@/lib/graphql/Users";
import { useAccessToken } from "@/lib/hooks/useAccessToken";
import { useMutation, useQuery } from "@apollo/client";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { PlaidLinkOnSuccessMetadata, usePlaidLink } from "react-plaid-link";

type Props = {
  accounts: Account[];
  openPlaidLink: Function;
  plaidLinkReady: boolean;
  accountsLoading: boolean;
};

const AccountManagementPopover = ({
  accounts,
  accountsLoading,
  openPlaidLink,
  plaidLinkReady,
}: Props) => {
  console.log("accounts!!!");
  console.log({ accounts });
  const [deleteAccount, { loading: deletingAccount }] = useMutation(
    DELETE_ACCOUNT,
    {
      refetchQueries: [GET_ACCOUNTS_BY_USER_ID],
    }
  );

  return (
    <>
      <div>
        {accountsLoading
          ? "Loading..."
          : accounts.map((account) =>
              deletingAccount ? (
                "Deleting Account..."
              ) : (
                <div className="flex flex-row gap-4 my-4">
                  <h1 className="flex items-center justify-center grow border rounded-xl px-2">
                    {account.name}
                  </h1>
                  <Button
                    size="sm"
                    className="ml-auto"
                    variant="destructive"
                    onClick={async () => {
                      const { data: deletedAccount } = await deleteAccount({
                        variables: {
                          id: Number(account.id),
                        },
                      });
                      console.log({deleteAccount})
                    }}
                  >
                    Delete
                  </Button>
                </div>
              )
            )}
      </div>
      <Button
        variant="outline"
        onClick={() => {
          if (plaidLinkReady) {
            openPlaidLink();
          }
        }}
      >
        <Plus /> Connect a new bank account
      </Button>
    </>
  );
};

export default AccountManagementPopover;
