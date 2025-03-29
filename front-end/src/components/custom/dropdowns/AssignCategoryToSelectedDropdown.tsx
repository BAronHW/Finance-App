import { Category } from "@/__generated__/graphql";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import {
  GET_TRANSACTIONS_BY_USER_ID,
  UPDATE_SELECTED_TRANSACTION_CATEGORIES,
} from "@/lib/graphql/Transaction";
import { useMutation } from "@apollo/client";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import TransactionCategoryDropdownContent from "./TransactionCategoryDropdownContent";

type Props = {
  categories: Category[];
  categoriesLoading: boolean;
  transactionIds: number[];
  disabled: boolean;
};

export const AssignCategoryToSelectedDropdown = ({
  categories,
  categoriesLoading,
  transactionIds,
  disabled,
}: Props) => {
  const [UpdateSelectedTransactionCategories] = useMutation(
    UPDATE_SELECTED_TRANSACTION_CATEGORIES,
    {
      refetchQueries: [GET_TRANSACTIONS_BY_USER_ID],
    }
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={disabled}>
        <Button variant="secondary" disabled={disabled}>
          Assign Category to All Selected
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {categoriesLoading && "Loading..."}
        {categories && (
          <TransactionCategoryDropdownContent
            categories={categories}
            currentCategoryId={null}
            onUpdate={async (id) => {
              await UpdateSelectedTransactionCategories({
                variables: {
                  ids: transactionIds,
                  categoryId: id,
                },
              });
            }}
            onUpdateUncategorised={async () => {
              await UpdateSelectedTransactionCategories({
                variables: {
                  ids: transactionIds,
                },
              });
            }}
          />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
