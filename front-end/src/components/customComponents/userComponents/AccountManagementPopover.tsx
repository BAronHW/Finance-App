import { Account } from "@/__generated__/graphql";
import { Button } from "@/components/ui/button";
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
  console.log("accounts!!!")
  console.log({accounts})
  return (
    <>
      <div>
        {accountsLoading
          ? "Loading..."
          : accounts.map((account) => 
                <div className="flex flex-row gap-4 my-4">
                  <h1 className="flex items-center border rounded-xl px-2">{account.name}</h1>
                  <Button size="sm" variant="destructive">Delete</Button>
                </div>
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
