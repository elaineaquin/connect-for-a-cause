"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import SearchInput from "./SearchInput";
import { useUser } from "@/store/use-user";
import { SquarePen } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NewMessageProps {
  onCreateRoom: (email: string) => void;
}

const NewMessage = ({ onCreateRoom }: NewMessageProps) => {
  const [open, setOpen] = useState(false);
  const { users } = useUser();
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    onCreateRoom(value);
    setOpen(false);
  };

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <TooltipTrigger>
              <Button variant={"ghost"}>
                <SquarePen size={20} />
              </Button>
            </TooltipTrigger>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>New Message</DialogTitle>
              <DialogDescription>Add User</DialogDescription>
            </DialogHeader>
            <SearchInput commands={users} onSelect={setValue} />
            <DialogFooter>
              <Button type="submit" onClick={handleSubmit}>
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <TooltipContent side="bottom">
          <p>Create new message</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default NewMessage;
