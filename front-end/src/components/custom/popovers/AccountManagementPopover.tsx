import { Account } from "@/__generated__/graphql";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DELETE_ACCOUNT, GET_ACCOUNTS_BY_USER_ID } from "@/lib/graphql/Account";
import { useMutation } from "@apollo/client";
import { Plus } from "lucide-react";

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
    <Popover>
      <PopoverTrigger>
        <Button variant="default" size="lg">
          Manage your bank accounts with Plaid
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="w-full">
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
                        console.log({ deletedAccount });
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
      </PopoverContent>
    </Popover>
  );
};

export default AccountManagementPopover;
