import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Bot } from "lucide-react";
import { useState } from "react";

type Props = {
  onRunAutoCategorise: (overwrite: boolean) => void;
};

export const AutoCategoriseWithAiPopover = ({ onRunAutoCategorise }: Props) => {
  const [overwrite, setOverwrite] = useState<boolean>(false);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="bg-slate-200" variant="ghost">
          <Bot />
          Auto-Categorise Selected Rows
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex items-center gap-6 justify-center">
          <div className="flex gap-3">
            <Checkbox
              id="terms"
              onCheckedChange={(checked: boolean) => {
                setOverwrite(checked);
              }}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Enable Overwrite
            </label>
          </div>
          <Button onClick={() => onRunAutoCategorise(overwrite)}>Run</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
