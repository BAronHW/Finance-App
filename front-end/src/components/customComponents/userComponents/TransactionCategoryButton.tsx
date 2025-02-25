import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DEFAULT_COLOUR } from "@/lib/constants";
import {
  GET_CATEGORIES_BY_USER_ID_FOR_CATEGORY_COLUMN,
  GET_CATEGORY_BY_ID,
  UPDATE_CATEGORY,
} from "@/lib/graphql/Category";
import {
  GET_TRANSACTIONS_BY_USER_ID,
  UPDATE_TRANSACTION,
} from "@/lib/graphql/Transaction";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { FilePenLine } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

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
  const { data: categoryData, loading: categoryLoading } = useQuery(
    GET_CATEGORY_BY_ID,
    {
      variables: {
        id: categoryId,
      },
      skip: !categoryId,
    }
  );

  const [updateTransaction] = useMutation(UPDATE_TRANSACTION, {
    refetchQueries: [GET_TRANSACTIONS_BY_USER_ID],
  });
  const [
    getCategoriesByUserIdForCategoryColumn,
    { data: categoriesData, loading: categoriesLoading },
  ] = useLazyQuery(GET_CATEGORIES_BY_USER_ID_FOR_CATEGORY_COLUMN, {
    variables: {
      userId,
    },
    onCompleted: (data) => console.log("fired!"),
  });
  useEffect(() => {
    console.log("Updated categoriesData:", categoriesData);
  }, [categoriesData]);

  return (
    <DropdownMenu
      onOpenChange={() => {
        getCategoriesByUserIdForCategoryColumn();
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
          categoriesData?.getCategoriesByUserId?.map((category) => (
            <div className="flex w-full">
              <DropdownMenuCheckboxItem
                className="grow-8"
                checked={category.id === categoryId}
                onCheckedChange={async (checked) => {
                  if (checked) {
                    const { data: updatedTransactionData } =
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
                style={{ backgroundColor: category.colour }}
                className="w-8 grow-1 ml-auto"
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
