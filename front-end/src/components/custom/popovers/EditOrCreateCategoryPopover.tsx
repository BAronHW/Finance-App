import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CategoryForm from "../forms/CategoryForm";
import { Category } from "@/__generated__/graphql";
import { ReactNode } from "react";

type Props = {
  onHandleSubmit: (variables: {
    name: string;
    description: string | null;
    colour?: string;
  }) => void;
  category?: Category;
  buttonDisplay: ReactNode;
};

export const EditOrCreateCategoryPopover = ({
  onHandleSubmit,
  category,
  buttonDisplay,
}: Props) => {
  return (
    <Popover>
      <PopoverTrigger className="w-max m-auto">
        <Button variant="secondary">{buttonDisplay}</Button>
      </PopoverTrigger>
      <PopoverContent noPortal className="w-[360px]">
        <CategoryForm
          defaultValues={{
            name: category?.name ?? "",
            description: category?.description ?? "",
          }}
          onSubmit={onHandleSubmit}
        />
      </PopoverContent>
    </Popover>
  );
};
