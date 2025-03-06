import { Category } from "@/__generated__/graphql";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  GET_CATEGORIES_BY_USER_ID,
  UPDATE_CATEGORY,
} from "@/lib/graphql/Category";
import { useMutation } from "@apollo/client";
import { DEFAULT_COLOUR } from "@/lib/constants";
import { EditOrCreateCategoryPopover } from "../popovers/EditOrCreateCategoryPopover";
import { ColourPickerPopover } from "../popovers/ColourPickerPopover";
import { Palette, Pencil, Plus, Trash2 } from "lucide-react";

type Props = {
  categoriesLoading: boolean;
  categories: Category[];
  userId: number;
};

export const CategoriesDialog = ({
  categoriesLoading,
  categories,
  userId,
}: Props) => {
  const [createCategory] = useMutation(CREATE_CATEGORY, {
    refetchQueries: [GET_CATEGORIES_BY_USER_ID],
  });
  const [deleteCategory] = useMutation(DELETE_CATEGORY, {
    refetchQueries: [GET_CATEGORIES_BY_USER_ID],
  });
  const [updateCategory] = useMutation(UPDATE_CATEGORY, {
    refetchQueries: [GET_CATEGORIES_BY_USER_ID],
  });
  return (
    <Dialog>
      <DialogTrigger>
        <Button size="lg">Custom Spending Categories</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Define Categories to Organise Your Finances</DialogTitle>
          <DialogDescription>
            FinApp allows you to organise all your transactions into various
            custom defined categories, in order to provide you with personal
            financial insights in the way you want.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 text-center">
          {!categoriesLoading && categories.length
            ? categories.map((category) => (
                <div key={category.id} className="flex items-center">
                  <h4 className="text-xl font-semibold m-auto">
                    {category.name}
                  </h4>
                  <div className="flex items-center gap-4">
                    <ColourPickerPopover
                      oldColour={category.colour ?? DEFAULT_COLOUR}
                      label={<Palette />}
                      onSaveColour={async (colour: string) =>
                        await updateCategory({
                          variables: {
                            id: category.id,
                            colour,
                          },
                        })
                      }
                    />
                    <EditOrCreateCategoryPopover
                      onHandleSubmit={async (values: {
                        name: string;
                        description: string | null;
                      }) => {
                        await updateCategory({
                          variables: {
                            ...values,
                            id: category.id,
                          },
                        });
                      }}
                      category={category}
                      buttonDisplay={<Pencil />}
                    />
                    <Button
                      variant="destructive"
                      onClick={() =>
                        deleteCategory({
                          variables: { id: category.id },
                        })
                      }
                      className="justify-end"
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </div>
              ))
            : categoriesLoading
            ? "Loading..."
            : "No categories"}
          <EditOrCreateCategoryPopover
            onHandleSubmit={async (values: {
              name: string;
              description: string | null;
            }) => {
              await createCategory({
                variables: {
                  ...values,
                  userId,
                },
              });
            }}
            buttonDisplay={
              <>
                <Plus /> New Category
              </>
            }
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
