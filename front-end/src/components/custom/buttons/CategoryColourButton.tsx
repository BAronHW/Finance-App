import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

type Props = {
  label?: string | ReactNode;
  colour: string;
  className?: string;
  disabled?: boolean;
  onClickHandler?: () => void;
};

export const CategoryColourButton = ({
  label,
  colour,
  className,
  disabled,
  onClickHandler,
}: Props) => {
  return (
    <Button
      variant="outline"
      style={{ backgroundColor: colour }}
      className={className}
      disabled={disabled}
    >
      {label ?? "Pick Colour"}
    </Button>
  );
};
