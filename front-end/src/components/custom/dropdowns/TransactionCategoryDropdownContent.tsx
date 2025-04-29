import { Category } from "@/__generated__/graphql";
import {
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
} from "../../ui/dropdown-menu";
import { DEFAULT_COLOUR } from "@/lib/constants";

type Props = {
  categories: Category[];
  onUpdate: (id: number | number[]) => Promise<void>;
  onUpdateUncategorised: () => Promise<void>;
  currentCategoryId: number | null;
};

const TransactionCategoryDropdownContent = ({
  categories,
  onUpdate,
  onUpdateUncategorised,
  currentCategoryId,
}: Props) => {
  return (
    <>
      {categories.map((category) => (
        <div className="flex w-full">
          <DropdownMenuCheckboxItem
            className="w-full"
            checked={category.id === currentCategoryId}
            onCheckedChange={(checked) => {
              if (checked) {
                onUpdate(category.id);
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
        checked={!currentCategoryId}
        onCheckedChange={(checked) => {
          if (checked) {
            onUpdateUncategorised();
          }
        }}
      >
        Uncategorised
      </DropdownMenuCheckboxItem>
    </>
  );
};

export default TransactionCategoryDropdownContent;
