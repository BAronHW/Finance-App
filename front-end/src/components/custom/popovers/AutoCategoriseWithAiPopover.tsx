import { Transaction } from "@/__generated__/graphql";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Table } from "@tanstack/react-table";
import { Bot } from "lucide-react";

type Props = {
  onRunAutoCategorise: () => void;
};

export const AutoCategoriseWithAiPopover = ({ onRunAutoCategorise }: Props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="bg-slate-200" variant="ghost">
          <Bot />
          Auto-Categorise Selected Rows
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            overwrite
          </label>
          <Button onClick={onRunAutoCategorise}>Run</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
