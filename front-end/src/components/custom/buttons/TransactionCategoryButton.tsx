import { Category } from "@/__generated__/graphql";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { DEFAULT_COLOUR } from "@/lib/constants";
import { GET_CATEGORIES_BY_USER_ID_FOR_TABLE } from "@/lib/graphql/Category";
import {
  GET_TRANSACTIONS_BY_USER_ID,
  UPDATE_TRANSACTION,
} from "@/lib/graphql/Transaction";
import { useLazyQuery, useMutation } from "@apollo/client";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { FilePenLine } from "lucide-react";
import { useParams } from "next/navigation";

type Props = {
  value: string;
  transactionId: number;
  categoryId: number | null;
  buttonColour: string | null;
};

export const TransactionCategoryButton = ({
  value,
  transactionId,
  categoryId,
  buttonColour,
}: Props) => {
  const params = useParams();
  const userId = Array.isArray(params?.userId)
    ? Number(params?.userId[0])
    : Number(params?.userId);

  const [updateTransaction] = useMutation(UPDATE_TRANSACTION, {
    refetchQueries: [GET_TRANSACTIONS_BY_USER_ID],
  });
  const [
    getCategoriesByUserIdForTable,
    { data: categoriesData, loading: categoriesLoading },
  ] = useLazyQuery(GET_CATEGORIES_BY_USER_ID_FOR_TABLE, {
    variables: {
      userId,
    },
  });

  return (
    <DropdownMenu
      onOpenChange={() => {
        getCategoriesByUserIdForTable();
      }}
    >
      <DropdownMenuTrigger>
        <Button
          style={{
            backgroundColor: buttonColour ?? undefined,
          }}
          variant="outline"
        >
          {value ?? <FilePenLine />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {categoriesLoading && "Loading..."}
        {categoriesData &&
          categoriesData?.getCategoriesByUserId?.map((category: Category) => (
            <div className="flex w-full">
              <DropdownMenuCheckboxItem
                className="w-full"
                checked={category.id === categoryId}
                onCheckedChange={async (checked) => {
                  if (checked) {
                    await updateTransaction({
                      variables: {
                        id: transactionId,
                        categoryId: category.id,
                      },
                    });
                  }
                }}
              >
                {category.name}
              </DropdownMenuCheckboxItem>
              <div
                style={{ backgroundColor: category.colour ?? DEFAULT_COLOUR }}
                className="w-8 ml-auto"
              />
              <DropdownMenuSeparator />
            </div>
          ))}
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={!categoryId}
          onCheckedChange={async (checked) => {
            if (checked) {
              await updateTransaction({
                variables: {
                  id: transactionId,
                },
              });
            }
          }}
        >
          Uncategorised
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
