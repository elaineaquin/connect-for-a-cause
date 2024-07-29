import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SquarePen } from "lucide-react";
import Link from "next/link";

const NewGroup = () => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger>
          <Button variant={"ghost"}>
            <Link href={"/messages/group/create"}>
              <SquarePen size={20} />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Create a space</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default NewGroup;
