import { Button } from "@/components/ui/button";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { UserProfile } from "@/server/definitions";
import { useClient } from "@/store/use-client";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { PopoverContent } from "@radix-ui/react-popover";
import { CommandGroup } from "cmdk";
import { CheckIcon } from "lucide-react";
import React, { useState } from "react";

interface ICommandProps {
  commands: UserProfile[];
  onSelect: (value: string) => void;
}

export default function SearchInput({ commands, onSelect }: ICommandProps) {
  const { client } = useClient();
  const [open, setOpen] = useState(false);
  const [openCommand, setOpenCommand] = useState(false);
  const [value, setValue] = useState("");

  const handleValueChange = (value: string) => {
    setOpenCommand(!!value);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? commands.find((command) => command.name === value)?.name
            : "Select User..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-max ">
        <Command>
          <CommandInput
            className="h-9"
            placeholder="Search User..."
            onValueChange={handleValueChange}
          />
          <CommandGroup>
            <CommandList>
              {openCommand &&
                commands
                  .filter((user) => user.id !== client?.id)
                  .map((command) => (
                    <CommandItem
                      key={command.id}
                      value={command.name}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        onSelect(currentValue === value ? "" : command.email);
                        setOpen(false);
                      }}
                    >
                      {command.name}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          value === command.name ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
