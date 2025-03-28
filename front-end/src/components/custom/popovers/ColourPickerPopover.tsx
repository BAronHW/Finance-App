import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ReactNode, useRef, useState } from "react";

import { CategoryColourButton } from "../../custom/buttons/CategoryColourButton";
import { ColourPicker } from "../colourpickers/ColourPicker";

type Props = {
  oldColour: string;
  label?: string | ReactNode;
  contentClassName?: string;
  buttonClassName?: string;
  onSaveColour: (colour: string) => void;
};

export const ColourPickerPopover = ({
  label,
  oldColour,
  contentClassName,
  buttonClassName,
  onSaveColour,
}: Props) => {
  const colourRef = useRef(oldColour);
  const [buttonColour, setButtonColour] = useState(oldColour);
  return (
    <Popover modal>
      <PopoverTrigger>
        <CategoryColourButton 
          colour={buttonColour}
          label={label}
          className={buttonClassName}
        />
      </PopoverTrigger>
      <PopoverContent noPortal className={contentClassName ?? "flex flex-col items-center"}>
        <ColourPicker oldColour={oldColour} colourRef={colourRef} className="my-4"/>
        <Button
          variant="default"
          onClick={() => {
            onSaveColour(colourRef.current);
            setButtonColour(colourRef.current)
          }}
        >
          Save Colour
        </Button>
      </PopoverContent>
    </Popover>
  );
};
